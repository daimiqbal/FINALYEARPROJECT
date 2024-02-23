import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { createContext } from "react";
import AgencyRoute from "../components/routes/AgencyRoute";
import AOS from "aos";
import "aos/dist/aos.css";


const Form = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      place: "",
      days: "",
      price: "",
      description: "",
    });
  
    const { packageId } = router.query; // Get the packageId from query parameters
  
    useEffect(() => {
        AOS.init();
      }, []);
    
    useEffect(() => {

      if (packageId) {
        // Fetch package details using packageId
        axios.get(`/api/packages/${packageId}`)
          .then((response) => {
            const { place, days, price, description } = response.data;
            setFormData({ place, days, price, description });
          })
          .catch((error) => {
            console.error("Error fetching package details", error);
          });
      }
    }, [packageId]);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit updated package data using formData
      axios.put(`/api/packages/${packageId}`, formData)
        .then(() => {
          // Handle success
          toast.success("Package Updated Successfully");
          console.log("Package updated successfully");
          router.push("/instructor");
          // Redirect or perform any other action as needed
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating package", error);
        });
    };
    const handleCancel = () => {
      setFormData({
        place: "",
        days: "",
        price: "",
        description: "",
      });
    };
    

  return (
    <AgencyRoute>
        <div className="p-5">
        <h1
            className="jumbotron1 text-center text-white"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
           Update Package
          </h1>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="place">Place:</label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="days">Days:</label>
              <input
                type="text"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mt-4 space-x-2 text-center">
              <button
                type="submit"
                style={{marginRight:'10px'}}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300 btn btn-success "
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md transition duration-300 btn btn-primary"
            >
                Cancel
              </button>
            </div>
          </form>
        </div>
    </AgencyRoute>
  );
};

export const FormDataContext = createContext(null);
export default Form;
