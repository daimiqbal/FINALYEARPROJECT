/* The above code is a React component for a review and feedback page. It fetches package details and
feedback from an API based on the packageId provided in the query parameters. It displays the
package details, allows users to leave feedback, and shows existing feedback for the package. It
also includes a chat feature where users can chat with the package provider. The code uses various
libraries such as React, axios, react-toastify, and react-modal for different functionalities. */
const { User } = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const queryString = require("query-string");
const Form = require("../models/packages");
const Chat = require("../models/chat");
import { toast } from 'react-toastify';


const makeAgency = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).exec();

    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({ type: "standard" });
      user.stripe_account_id = account.id;
      user.save();
    }

    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });

    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (err) {
    console.log("make instructor error", err);
  }
};
const getAccountStatus = async (req, res) => {
  try {
    console.log("sad");
    const user = User.findById(req.auth._id)
      .exec()
      .then((res) => {
        console.log(res);
      });
    console.log(user);
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    console.log("Account=>", account);

    //not enabling in test mode
    // return;
    // if (!account.charges_enabled) {
    //   return res.status(401).send("unauthorized");
    // } else{}
    const statusUpdated = await User.findByIdAndUpdate(
      req.auth._id,
      {
        stripe_seller: account,
        $addToSet: { role: "Agency" },
      },
      { new: true }
    )
      .select("-password")
      .exec();
    console.log(statusUpdated);
    res.json(statusUpdated);
  } catch (err) {
    console.log(err);
  }
};
const currentInstructor = async (req, res) => {
  try {
    let user = await User.findById(req.auth._id).select("-password").exec();
    if (!user.role.includes("Agency")) {
      return res.sendStatus(403);
    } else {
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

const instructorCourses = async (req, res) => {
  try {
    /* Finding all the courses that the instructor has created. */
    const courses = await Form.find({ instructor: req.auth._id })
      .sort({ createdAt: -1 })
      .exec();
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
};

const removePackage = async (req, res) => {
  try {
    const packageId = req.params.packageId;

    // Find the package by ID and remove it
    const result = await Form.findByIdAndDelete(packageId);

    if (!result) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting package" });
  }
};
const updatePackage = async (req, res) => {
  try {
    const { place, days, price, description } = req.body;
    const packageId = req.params.packageId;

    const pkg = await Form.findByIdAndUpdate(packageId, {
      place,
      days,
      price,
      description,
    });

    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json({ message: "Package updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating package" });
  }
};

const getPackage = async (req, res) => {
  try {
    const packageId = req.params.packageId;

    // Use Mongoose to find the package by packageId in your MongoDB
    const pkg = await Form.findById(packageId);

    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Respond with the package data
    res.status(200).json(pkg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching package details" });
  }
};
const allPackages = async (req, res) => {
  try {
    // Fetch all packages from the database
    const packages = await Form.find();
    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const paidEnrollment = async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const pkg = await Form.findById(packageId)
      .populate("instructor")
      .exec();
    const currentDate = new Date();
    if (currentDate > pkg.deadline) {
      toast.error('Enrollment deadline has passed.');
      return res.status(400).send("Enrollment deadline has passed.");
    }
    if (pkg.count >= pkg.totalCount) {
      toast.error('Seats are full. Enrollment is not allowed.');
      return res.status(400).send("Seats are full. Enrollment is not allowed.");
    }
    const fee = (pkg.price * 30) / 100;
    //create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pkg.place,
            },
            unit_amount: Math.round(pkg.price * 100), // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        application_fee_amount: Math.round(fee * 100), // Application fee in cents
        transfer_data: {
          destination: pkg.instructor.stripe_account_id,
        },
      },
      success_url: `http://localhost:3001/stripe/success/${pkg._id}`, // Redirect URL after successful payment
      cancel_url: `http://yourwebsite.com/cancel`, // Redirect URL if the user cancels
    });
    console.log("Session id : ", session);
    // Increment count
    await Form.findByIdAndUpdate(packageId, { $inc: { count: 1 } });

    await User.findByIdAndUpdate(req.auth._id, {
      stripeSession: session,
    }).exec();
    res.send(session.id);
  } catch (err) {
    console.log("Enrollment failed ERR", err);
    toast.error('Enrollment failed.');
    return res.status(400).send("Enrollment failed.");
  }
};
const stripeSuccess = async (req, res) => {
  try {
    // find course
    const pkg = await Form.findById(req.params.packageId).exec();
    // get user from db to get stripe session id
    const user = await User.findById(req.auth._id).exec();
    // if no stripe session return
    if (!user.stripeSession.id) return res.sendStatus(400);
    // retrieve stripe session
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );
    console.log("STRIPE SUCCESS", session);
    await User.findByIdAndUpdate(req.auth._id, {
      $addToSet: { packages: pkg._id },
      $set: { stripeSession: {} },
    }).exec();
    res.json({ success: true, pkg });
  } catch (err) {
    console.log("STRIPE SUCCESS ERR", err);
    res.json({ success: false });
  }
};

const userCourses = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();
  const packages = await Form.find({ _id: { $in: user.packages } })
    .populate("instructor", "_id name")
    .exec();
  res.json(packages);
};
const checkEnrollment = async (req, res) => {
  const { packageId } = req.params;
  // Find the user by ID
  const user = await User.findById(req.auth._id).exec();

  // Check if the packageId is in the user's packages array
  const isEnrolled = user.packages && user.packages.includes(packageId);

  // Return the boolean value
  res.json(isEnrolled);
};

const feedBack = async (req, res) => {
  const { packageId } = req.params;
  const { rating, feedback } = req.body;

  try {
    const pkg = await Form.findById(packageId);

    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Create a new review
    const review = {
      user: req.auth._id,
      rating,
      feedback,
    };

    pkg.reviews.push(review);

    // Calculate the new average rating
    const totalRatings = pkg.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    pkg.averageRating = totalRatings / pkg.reviews.length;

    await pkg.save();

    res.json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFeedback = async (req, res) => {
  const { packageId } = req.params;

  try {
    const pkg = await Form.findById(packageId);

    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Return the feedback for the package
    res.json(pkg.reviews);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//  {Get}
const getChatBetweenUserAndAgency = async (req, res) => {
  try {
    const { userId, packageId } = req.query;

    console.log("User ID:", userId);
    console.log("Package ID:", packageId);
    const chatData = await Chat.findOne({
      package: packageId,
    }).select("messages");
    
    console.log("Chat Data:", chatData);
    res.json(chatData.messages);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// {Post}
const addChatbewtweenUserAndAgency = async (req, res) => {
  try {
    console.log("Chat API");
    const { userID, packageId } = req.body;
    console.log("UserId", userID, "PackageId", packageId);
    const { content } = req.body;
    const sender = userID;
    // Use async/await to handle the asynchronous operation of querying the database
    const chatData = await Chat.findOne({ package: packageId });

    if (chatData) {
      console.log("Previous Chat", chatData.messages);
      // If chatData exists, push the new message and save the document
      chatData.messages.push({ sender, content });
      await chatData.save();
      res.json(chatData);
    } else {
      // If chatData does not exist, create a new document and save it
      const newChat = new Chat({
        user: userID,
        package: packageId,
        messages: [{ sender, content }],
      });
      console.log("New Chat", newChat);
      await newChat.save();
      res.json(newChat);
    }
  } catch (error) {
    console.error("Error adding chat:", error);
  }
};

module.exports = {
  makeAgency,
  getAccountStatus,
  currentInstructor,
  instructorCourses,
  removePackage,
  updatePackage,
  getPackage,
  allPackages,
  paidEnrollment,
  stripeSuccess,
  userCourses,
  checkEnrollment,
  feedBack,
  getFeedback,
  addChatbewtweenUserAndAgency,
  getChatBetweenUserAndAgency,
};
