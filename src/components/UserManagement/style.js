import styled from "styled-components";

const Wrapper = styled.section`
  .container {
    width: 90%;
    margin: auto;
    font-family: Arial, sans-serif;
  }

  h2 {
    font-size : 30px;
    margin: 20px;
  }

   ////*
  .header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: -65px;
  
  
}
     .table-container {
  max-height: 500px;  /* or any height you want */
  overflow-y: auto;
  padding: 0px;       /* scrollable padding */
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  margin-top: 20px;
}
  .switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  left:15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50; /* Green when active */
}

input:checked + .slider:before {
  transform: translateX(22px);
}


.search-container {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.search-box {
  width: 100%;
  padding: 10px 35px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: gray;
  font-size: 18px;
  pointer-events: none;
}
.bulk-reset-btn {
  background: #ccc;
  color: white;
  padding: 10px;
  border: none;
  cursor: not-allowed;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.bulk-reset-btn.active {
  background: #28a745; /* Green */
  cursor: pointer;
}

.bulk-reset-btn.active:hover {
  background: #218838; /* Darker green on hover */
}


  /* Button container on top-right */
.header-buttons {
  display: flex;
  gap: 10px;
  position: absolute;
  right: 20px;
  top: -100%;
  transform: translateY(-50%);
}

/* ✅ Add User Button */
.add-btn {
  background: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;

  border-radius: 5px;
}

/* ❌ Bulk Delete Button (Disabled by Default) */
.bulk-delete-btn {
  background: #ccc;
  color: white;
  padding: 10px;
  border: none;
  cursor: not-allowed;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 🔴 Active Bulk Delete Button */
.bulk-delete-btn.active {
  background: #dc3545;
  cursor: pointer;
}

.bulk-delete-btn.active:hover {
  background: #c82333;
}



  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
  }

  thead {
  position: sticky;
  top: 0;
  background: rgb(177,179,215); /* 🔵 Dark Blue Background */
  color: white;         /* 🟨 White Text */
  z-index: 1;
}

th {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  color: black;         /* 🟨 Ensures header text is white */
  background:rgb(177,179,215);  /* 🔵 Matching background */
}
   td {
  border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  


 /////*

  .actions {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .btn {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
   


 .edit-btn {
  color: black;
  border: none;
  border-radius: 5px; /* Rounded corners */
  padding: 8px 12px;
  transition: background 0.3s ease-in-out;
  margin-right: 5px; /* Spacing between buttons */
}


.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  transition: background 0.3s ease-in-out;
  margin-right: 5px;
}

.delete-btn:hover {
  background: #c82333;
}

.reset-btn {
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  transition: background 0.3s ease-in-out;
  margin-right: 5px;
}

.reset-btn:hover {
  background: #1e7e34;
}

/* Add spacing between buttons inside the actions column */
.actions {
  display: flex;
  gap: 10px;
}

/* 🏷️ Status Text Styling */
.status-text {
  font-weight: bold;
}

.status-text {
  font-weight: bold;
}

.status-text.active {
  color: green;
  font-weight: bold;
}

.status-text.banned {
  color: red;
  font-weight: bold;
}






 /* 🔲 Modal Overlay */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 🎨 Modal Content Styling */
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 400px;
  min-height: 250px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 📌 Close Button */
.close-btn {
  position: absolute;
  top: 3px;
  right: 15px;
  background: none;
  color: #333;
  font-size: 40px;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.close-btn:hover {
  color: #dc3545;
}

/* 🎯 Input Fields */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 16px;
}

/* ✅ Submit Button */
.submit-btn {
  background: #007bff;
  color: white;
  width: 95%;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;
}

.submit-btn:hover {
  background: #0056b3;
}

/* 🟢 Adjust Modal Size for Different Cases */
.modal-content.add,
.modal-content.edit {
  width: 450px;
  min-height: 300px;
}

.modal-content.reset-password {
  width: 380px;
  min-height: 220px;
}



`;

export default Wrapper;
