
import styled from "styled-components";

const Wrapper = styled.div`
  cursor: default;
  /*  events name */
  .attendee-role {
    margin: 10px 10px 9px 10px;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 30px;
    }

    .button-placeholder {
      display: flex;
      gap: 10px; /* space between buttons */
      align-items: center;
    }

    /* Delete button style */
    .mass-delete {
      background-color: rgb(244, 67, 54);
      color: #fff;
      border: none;
      padding: 8px 15px;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
      min-width: 70px;
      display : flex;
      align-items: center;
      gap: 5px;

    }

    .mass-delete-placeholder {
      width: 108px; /* match the approximate width of the delete button */
      height: 36px; /* match the height */
    }

    /* Add button style */
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(177, 179, 215);
      color: black;
      font-size: 16px;
      font-weight: bold;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      gap: 5px;
    }
  }

  /* Optional: Add hover effect for better user experience */
  .add-btn:hover {
    background-color: rgb(150, 152, 190); /* Slightly darker shade */
  }

  /* button class css */
  .button-class {
    display: flex;
    gap: 10px;
    width: 190px;
  }


  /* table layout css */
  .table-container {
  max-height: 490px;
  overflow-y: auto;
  box-sizing: border-box;
  table-layout: fixed;
  position: relative;
  margin-left: 10px; 
  margin-right: 10px; 
  }
  
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    position: sticky;
    top: 0;
    background: rgb(177, 179, 215); 
    color: white;
    z-index: 1;
    table-layout: fixed;
  }
  
  
  table th, table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  table th {
    background: rgb(177, 179, 215);
    color: black;
  }
  
  table td {
    background: #fff;
  }

  /* Table column */
  .column.name {
    min-width: 630px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  tbody .column.name {
    text-align: left;
  }

  /* Checkbox */
  .checkbox input {
    margin: 0;
    cursor: pointer;
    padding: 0;
  }

  /* Actions column */
  .column.actions {
    display: flex;
    justify-content: space-around;
    height: 100%;
    align-items: center;
    border-bottom: 1px solid #ccc;
    align-self: center;
  }

  .edit-btn {
    color: black;
    font-size: 20px;
  }

  .eye-btn {
    color: darkblue;
    font-size: 20px;
  }

  .delete-btn {
    color: rgb(244, 67, 54);
    font-size: 20px;
    border-bottom: none;
  }

  /* Modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
  }

  .modal-content {
    background: white;
    padding: 25px;
    border-radius: 12px;
    width: 450px;
    max-width: 90%;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    text-align: left;
    transform: translateY(-20px);
    animation: slideDown 0.3s forwards;
  }

  .modal-content h2 {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .modal-content label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    color: #555;
  }

  .modal-content input,
  .modal-content textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border 0.3s ease-in-out;
  }

  .modal-content input:focus,
  .modal-content textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .modal-buttons button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .modal-buttons button:first-child {
    background: rgb(76, 175, 80);
    color: white;
    margin-right: 10px;
  }

  .modal-buttons button:first-child:hover {
    background: rgb(76, 175, 80);
  }

  .modal-buttons button:last-child {
    background: rgb(244, 67, 54);
    color: white;
  }

  .modal-buttons button:last-child:hover {
    background: #bbb;
  }

  @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

  /* Highlighted effect */
  .highlighted:focus {
    outline: 3px solid #007bff;
    background-color: #e0f0ff;
  }

  /* Search container */
  .search-container {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  position: relative;
}

  .search-input {
  width: 280px;
  padding: 12px 45px 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  background: #f9f9f9;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

  .search-input:focus {
    border-color: #007bff;
    background: white;
    box-shadow: 0 3px 8px rgba(0, 123, 255, 0.3);
  }

  .search-icon {
    position: relative;
    right: 30px;
    color: #777;
    cursor: pointer;
    font-size: 18px;
    transition: color 0.3s ease-in-out;
  }

  .search-icon:hover {
    color: #007bff;
  }

  @media (max-width: 1385px) {
    .search-input {
      width: 100%; /* Full width on smaller screens */
    }
    .table-container {
      margin-left: 0;
      margin-right: 0;
    }

    .column.name {
  flex: 1;
  min-width: 200px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

  }
`;

export default Wrapper;