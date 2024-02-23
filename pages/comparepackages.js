// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TravelPackageComparison = () => {
//   const [packages, setPackages] = useState([]);
//   const [selectedFirstPackage, setSelectedFirstPackage] = useState(null);
//   const [selectedSecondPackage, setSelectedSecondPackage] = useState(null);

//   const [firstPackage, setFirstPackage] = useState(""); 
//   const [secondPackage, setSecondPackage] = useState(""); 
//   useEffect(() => {
//     loadPackages();
//   }, []);

//   const loadPackages = async () => {
//     try {
//       const response = await axios.get("/api/allpackages");
//       setPackages(response.data);
//       console.log(packages);
//     } catch (error) {
//       console.error("Error loading packages:", error);
//     }
//   };

//   const comparePackages = () => {
//     console.log("First Package:", firstPackage);
//     console.log("Second Package:", secondPackage);
  
//     if (!firstPackage || !secondPackage) {
//       toast.error("Please select both packages to compare.");
//       return;
//     }
//     if (firstPackage === secondPackage) {
//       toast.error("Please select two different packages.")
//       return;
//     }
  
//     setSelectedFirstPackage(packages.find((pkg) => pkg._id === firstPackage));
//     setSelectedSecondPackage(packages.find((pkg) => pkg._id === secondPackage));
//   };
//   const styles = {
//     comparisonContainer: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       padding: "20px",
//       color: "white",
//       height: "100vh",
//     },
//     selectContainer: {
//       display: "flex",
//       gap: "10px",
//       marginBottom: "20px",
//     },
//     packagesComparison: {
//       display: "flex",
//       justifyContent: "space-between",
//       width: "100%",
//     },
//     packageDetails: {
//       border: "1px solid #ccc",
//       padding: "20px",
//       width: "48%", 
//     },
//     compareButton: {
//       padding: "10px 20px",
//       marginTop: "10px",
//       cursor: "pointer",
//       backgroundColor: "#007BFF",
//       color: "white",
//       border: "none",
//       borderRadius: "5px",
//     },
//   };

//   return (
//     <div style={styles.comparisonContainer}>
//       <div style={styles.selectContainer}>
//         <select
//           onChange={(e) => setFirstPackage(e.target.value)}
//           value={firstPackage}
//           className="bg-black border-light"
//         >
//           <option value="" disabled>
//             Select the first package
//           </option>
//           {packages.map((pkg) => (
//             <option key={pkg._id} value={pkg._id}>
//               {pkg.place}
//             </option>
//           ))}
//         </select>

//         <select
//           onChange={(e) => setSecondPackage(e.target.value)}
//           value={secondPackage}
//           className="bg-black border-light"
//         >
//           <option value="" disabled>
//             Select the second package
//           </option>
//           {packages.map((pkg) => (
//             <option key={pkg._id} value={pkg._id}>
//               {pkg.place}
              
//       <img
//                   src={`data:${pkg.image.contentType};base64,${Buffer.from(pkg.image.data).toString('base64')}`}
//                   style={{ width: '100%', height: 'auto', maxWidth: '300px', maxHeight: '200px' }}
//                   alt={pkg.place}
//                 />
//             </option>
//           ))}
//         </select>

//         <button style={styles.compareButton} onClick={comparePackages}>
//           Compare
//         </button>
//       </div>

//       <div style={styles.packagesComparison}>
//         <div style={styles.packageDetails}>
//           {selectedFirstPackage && (
//             <div>
//               <h2 className="text-white">
//                 Place: {selectedFirstPackage.place}
//               </h2>
//               <p className="text-white">Price: {selectedFirstPackage.price}</p>
//               <p className="text-white">Days: {selectedFirstPackage.days}</p>
//               <p className="text-white">{selectedFirstPackage.description}</p>
//             </div>
//           )}
//         </div>

//         <div style={styles.packageDetails}>
//           {selectedSecondPackage && (
//             <div>
//               <h2 className="text-white">
//                 Place: {selectedSecondPackage.place}
//               </h2>
//               <p className="text-white">Price: {selectedSecondPackage.price}</p>
//               <p className="text-white">Days: {selectedSecondPackage.days}</p>
//               <p className="text-white">{selectedSecondPackage.description}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TravelPackageComparison;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TravelPackageComparison = () => {
  const [packages, setPackages] = useState([]);
  const [selectedFirstPackage, setSelectedFirstPackage] = useState(null);
  const [selectedSecondPackage, setSelectedSecondPackage] = useState(null);

  const [firstPackage, setFirstPackage] = useState("default");
  const [secondPackage, setSecondPackage] = useState("default");

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const response = await axios.get("/api/allpackages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error loading packages:", error);
    }
  };

  const comparePackages = () => {
    if (!firstPackage || !secondPackage) {
      toast.error("Please select both packages to compare.");
      return;
    }
    if (firstPackage === secondPackage) {
      toast.error("Please select two different packages.");
      return;
    }

    setSelectedFirstPackage(packages.find((pkg) => pkg._id === firstPackage));
    setSelectedSecondPackage(packages.find((pkg) => pkg._id === secondPackage));
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    color: "#333", // Adjust text color
    fontFamily: "Arial, sans-serif", // Set preferred font
  };

  const selectContainerStyles = {
    display: "flex",
    gap: "20px", // Increased gap for better spacing
    marginBottom: "20px",
  };

  const compareButtonStyles = {
    padding: "12px 24px", // Increased padding for better touch targets
    marginTop: "10px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    size: "auto",
    width: "auto", // Set the width to auto or any specific value
    height: "auto",
    fontSize: "16px", // Adjusted font size
  };

  const packagesComparisonStyles = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  };

  const packageDetailsStyles = {
    border: "1px solid #ccc",
    padding: "20px",
    width: "45%", // Adjusted width for better layout
    marginBottom: "20px", // Added margin for better spacing between packages
    color: "#faebd7", // Set the text color
  };

  const imageContainerStyles = {
    marginBottom: "10px",
  };

  return (
    <div style={containerStyles}>
      <h1 style={{ marginBottom: "20px", color: "#faebd7" }}>
        Travel Package Comparison
      </h1>
      <ToastContainer />
      <div style={selectContainerStyles}>
        <Select
          options={packages.map((pkg) => ({
            value: pkg._id,
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{pkg.place}</span>
                <img
                  src={`data:${pkg.image.contentType};base64,${Buffer.from(
                    pkg.image.data
                  ).toString("base64")}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "10px",
                    borderRadius: "50%",
                  }}
                  alt={pkg.place}
                />
              </div>
            ),
          }))}
          value={packages.find((pkg) => pkg._id === firstPackage)}
          onChange={(selectedOption) => setFirstPackage(selectedOption.value)}
          placeholder="Select the first package"
          styles={customStyles}
        />

        <Select
          options={packages.map((pkg) => ({
            value: pkg._id,
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{pkg.place}</span>
                <img
                  src={`data:${pkg.image.contentType};base64,${Buffer.from(
                    pkg.image.data
                  ).toString("base64")}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "10px",
                    borderRadius: "50%",
                  }}
                  alt={pkg.place}
                />
              </div>
            ),
          }))}
          value={packages.find((pkg) => pkg._id === secondPackage)}
          onChange={(selectedOption) => setSecondPackage(selectedOption.value)}
          placeholder="Select the second package"
          styles={customStyles}
        />

        <button style={compareButtonStyles} onClick={comparePackages}>
          Compare
        </button>
      </div>

      <div style={packagesComparisonStyles}>
        <div style={packageDetailsStyles}>
          {selectedFirstPackage ? (
            <>
              <div style={imageContainerStyles}>
                <img
                  src={`data:${selectedFirstPackage.image.contentType};base64,${Buffer.from(
                    selectedFirstPackage.image.data
                  ).toString("base64")}`}
                  style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                  alt={selectedFirstPackage.place}
                />
              </div>
              <h2>Place: {selectedFirstPackage.place}</h2>
              <p>Price: {selectedFirstPackage.price}</p>
              <p>Days: {selectedFirstPackage.days}</p>
              <p>{selectedFirstPackage.description}</p>
            </>
          ) : (
            <p>Select the first package to compare</p>
          )}
        </div>

        <div style={packageDetailsStyles}>
          {selectedSecondPackage ? (
            <>
              <div style={imageContainerStyles}>
                <img
                  src={`data:${selectedSecondPackage.image.contentType};base64,${Buffer.from(
                    selectedSecondPackage.image.data
                  ).toString("base64")}`}
                  style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                  alt={selectedSecondPackage.place}
                />
              </div>
              <h2>Place: {selectedSecondPackage.place}</h2>
              <p>Price: {selectedSecondPackage.price}</p>
              <p>Days: {selectedSecondPackage.days}</p>
              <p>{selectedSecondPackage.description}</p>
            </>
          ) : (
            <p>Select the second package to compare</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPackageComparison;
