import React, { useState } from "react";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

function UserForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    socialMediaHandle: "",
  });
  const [files, setFiles] = useState([]); // Separate state for files
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    // Create FormData object and append the text fields
    const form = new FormData();
    form.append("name", formData.name);
    form.append("socialMediaHandle", formData.socialMediaHandle);

    // Append files to FormData object
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        form.append("images", files[i]); // Append each file
      }
    }

    try {
      setLoading(true);
      const response = await fetch("https://social-media-application-task-backend.onrender.com/api/v1/createUser", {
        method: "POST",
        body: form, // Send the FormData object
      });

      const data = await response.json();

      if (data.success) {
        console.log("User created successfully:", data);
        setResponseMessage("User created successfully!");
      } else {
        console.log("Error creating user:", data.message);
        setResponseMessage(data.message || "Error creating user.");
      }

      toast.success("User created successfully");
      // Reset the form after submission
      setFormData({
        name: "",
        socialMediaHandle: "",
      });
      setFiles([]); // Reset the files state

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred while creating the user.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files); // Store selected files
  };

  return (
    <div className="w-1/2 mx-auto mt-12 p-8 bg-gray-100 rounded-lg shadow-md">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center justify-center z-10">
          <Spinner />
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Submission Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-semibold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-semibold mb-2">Social Media Handle:</label>
          <input
            type="text"
            name="socialMediaHandle"
            value={formData.socialMediaHandle}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-semibold mb-2">Upload Images:</label>
          <input
            id="fileInput" // Add an id to the input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
      {responseMessage && <p className="mt-4 text-gray-700">{responseMessage}</p>}
    </div>
  );
}

export default UserForm;
