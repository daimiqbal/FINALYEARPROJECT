import React, { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'black',
        color: 'white',
        height:'100vh',
        
    },
    selectButton: {
        padding: '10px 20px', // Added padding for a better appearance
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px', // Added some top margin for spacing
      },
    reviewHeader: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#4CAF50',
        
    },
    detailsContainer: {
        width: '60%',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
        backgroundColor: '#383e46',
        
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    detail: {
        fontSize: '1.1rem',
        margin: '10px 0',
    },
    feedbackForm: {
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    feedbackInput: {
        width: '40%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        color: "black",

    },
    feedbackSelect:{
        width: '20%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        color: "black",
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        
    },
};

const NewReviewPage = () => {
    const router = useRouter();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(5); // Default rating
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

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleSubmit = () => {
        const feedbackData = {
          rating,
          feedback,
        };
      
        axios
          .post(`/api/packages/${packageId}/feedback`, feedbackData)
          .then((response) => {
            // Display a success message and clear the feedback input
            toast.success('Feedback submitted successfully');
            setFeedback(''); // Clear the feedback input
          })
          .catch((error) => {
            console.error('Error submitting feedback:', error);
          });
      };
      
      

      return (
        <div style={styles.container}>
          <h1 style={styles.reviewHeader}>Review and Feedback</h1>
          <div style={styles.detailsContainer}>
            <h2 style={styles.title}>{formData.place}</h2>
            <p style={styles.detail}><strong>Price:</strong> {formData.price}</p>
            <p style={styles.detail}><strong>Duration:</strong> {formData.days}</p>
            <p style={styles.detail}>{formData.description}</p>
            
          </div>
          
            <div style={styles.feedbackForm}>
                <h3>Leave your feedback:</h3>
                <textarea
                    style={styles.feedbackInput}
                    placeholder="Write your feedback here..."
                    value={feedback}
                    onChange={handleFeedbackChange}
                ></textarea>

                <select
                    style={styles.feedbackSelect}
                    value={rating}
                    onChange={handleRatingChange}
                >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={3}>3 - Good</option>
                    <option value={2}>2 - Fair</option>
                    <option value={1}>1 - Poor</option>
                </select>
                <button style={styles.submitButton} onClick={handleSubmit}>
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default NewReviewPage;