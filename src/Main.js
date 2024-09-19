import React, { useState } from "react";
import { Button, TextField, Stepper, Step, StepLabel } from "@mui/material";


const Main = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  const steps = ["Personal Details", "Address Details", "Review & Submit"];

  //hnadle next functionality by step+1 if all fileds are validate
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  //handle back functionality by reducing step -1
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //validating each steps
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!userData.name) newErrors.name = "Name is required";
      if (!userData.email) newErrors.email = "Email is required";
      if (!userData.phone) newErrors.phone = "Phone is required";
      else if (!/\S+@\S+\.\S+/.test(userData.email))
        newErrors.email = "Email is invalid";
    } else if (step === 1) {
      if (!userData.addressLine1)
        newErrors.addressLine1 = "Address Line 1 is required";
      if (!userData.addressLine2)
        newErrors.addressLine2 = "Address Line 2 is required";
      if (!userData.city) newErrors.city = "City is required";
      if (!userData.zipCode) newErrors.zipCode = "Zip Code is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //setting form Data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  //submitting form and storing form  deatails in local storage
  const handleSubmit = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Form submitted!");
  };

  const FormSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <div >
            <TextField
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              margin="normal"
            />
          </div>
        );
      case 1:
        return (
          <div>
            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={userData.addressLine1}
              onChange={handleInputChange}
              error={!!errors.addressLine1}
              helperText={errors.addressLine1}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={userData.addressLine2}
              onChange={handleInputChange}
              error={!!errors.addressLine2}
              helperText={errors.addressLine2}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Zip Code"
              name="zipCode"
              value={userData.zipCode}
              onChange={handleInputChange}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              fullWidth
              margin="normal"
            />
          </div>
        );
      case 2:
        return (
          <div className="detailsDiv">
            <h3>Review Your Details:</h3>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Address Line 1: {userData.addressLine1}</p>
            <p>Address Line 2: {userData.addressLine2}</p>
            <p>City: {userData.city}</p>
            <p>City: {userData.zipCode}</p>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div className="multiStepForm">
      <h1>Multi-Steps Form</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div
      
      >
        {FormSteps(activeStep)}
        <div className="btnContainer">
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
