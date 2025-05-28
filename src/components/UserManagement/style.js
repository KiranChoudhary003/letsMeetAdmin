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

  .header {
    display: flex;
    width : 100%;
    box-sizing : border-box;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  /* 🔎 Search Bar with Icon */
  .search-container {
    position: relative;
    width: 300px;
  }

  .search-box {
    width: 100%;
    padding: 10px 35px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: gray;
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
    position : absolute;
    right : 120px;
  }

  /* 🔴 Active Bulk Delete Button */
  .bulk-delete-btn.active {
    background: #dc3545;
    cursor: pointer;
  }     

  .table-container{
    max-height : 450px;
    overflow-y : auto;
  }

  .bulk-delete-btn.active:hover {
    background: #c82333;
    cursor: pointer;
  }    

  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
  }

  thead{
    position : sticky;
    top : 0;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background: #333;
    color: white;
  }

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
    background : white;
    color: black;
    font-size : 20px;
    border: none;
    border-radius: 5px; /* Rounded corners */
    padding: 8px 5px 0;
    transition: background 0.3s ease-in-out;
    margin-right: 5px; /* Spacing between buttons */
  }


.delete-btn {
  background: white;
  font-size : 20px;
  color: rgb(244, 67, 54);
  border: none;
  padding: 8px 5px 0;
  margin-right: 5px;
}

// .delete-btn:hover {
//   background: white;
//   color: rgb(244, 67, 54);
// }

.reset-btn {
  font-size : 20px;
  background : white;
  color: darkblue;
  border: none;
  padding: 8px 5px 0;
  margin-right: 5px;
}

// .reset-btn:hover {
//   background: #1e7e34;
// }

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

/* 🏷️ Toggle Button Styling */
.toggle-btn {
  cursor: pointer;
  background: #f8f9fa; /* Light gray background */
  border: 1px solid #bbb; /* Softer border */
  padding: 6px 10px; /* Better spacing */
  border-radius: 6px; /* Smoother curves */
  transition: background 0.3s, border 0.3s; /* Smooth hover effect */
}

/* 🏷️ Hover & Focus Effects */
.toggle-btn:hover {
  background: #e0e0e0; /* Darker gray on hover */
  border-color: #888;
}

.toggle-btn:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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
  width: 300px;
  height: 150px;
}
  
`;

export default Wrapper;