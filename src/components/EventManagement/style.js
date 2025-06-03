import styled from "styled-components";

const Wrapper = styled.div`
  cursor: default;
  /*  events name */
  .events {
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
      width: 107px; /* match the approximate width of the delete button */
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

  
  /* search box css */
  /* Search Container */
  .search-container {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-end;
    position: relative;
  }

  /* Search Input */
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

  /* Input Focus Effect */
  .search-input:focus {
    border-color: #007bff;
    background: white;
    box-shadow: 0 3px 8px rgba(0, 123, 255, 0.3);
  }

  /* Search Icon */
  .search-icon {
    position: relative;
    right: 30px;
    color: #777;
    cursor: pointer;
    font-size: 18px;
    transition: color 0.3s ease-in-out;
  }

  /* Search Icon Hover Effect */
  .search-icon:hover {
    color: #007bff;
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

  table th,
  table td {
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

  /* table column css */
  .column.name,
  .column.description,
  .column.venue,
  .column.date {
    min-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 70px;
  }

  .column.venue {
    max-width: 120px;
  }

  // change the column width of description;
  .column.description {
    max-width: 120px;
    min-height: 70px;
  }

  // change the column width of event name;
  .column.name {
    max-width: 120px;
  }

  .column.venue {
    max-width: 100px;
  }

  .column.date {
    max-width: 50px;
    white-space: nowrap;
  }

  tbody .column.name,
  tbody .column.description {
    text-align: left;
  }

  /* on hover the link css */
  .checkbox input {
    margin: 0;
    cursor: pointer;
  }

  .column.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
    align-self: center;
  }

  .column.actions.buttons {
    display: flex;
    justify-content: space-around;
    min-height: 45px;
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

  .tooltip {
    position: fixed;
    background-color: rgb(177, 179, 215); /* Updated tooltip color */
    color: black; /* Ensures readability */
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 100;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transition: opacity 0.2s ease-in-out;
  }

  .url-container:hover .tooltip {
    display: block;
  }

  /* 🔹 Wrapper for the toggle button and message */
  .toggle-wrapper {
    position: relative; /* Needed to position the tooltip message */
    display: inline-block; /* Ensures it stays inline with other elements */
  }

  /* 🔹 Message box (tooltip) that appears above the toggle switch */
  .toggle-message {
    position: absolute;
    top: -30px; /* Positions message above the toggle button */
    left: 50%; /* Centers the message horizontally */
    transform: translateX(-50%); /* Ensures it aligns with the button */
    background-color: black; /* Background color for contrast */
    color: white; /* Text color */
    padding: 5px 10px; /* Adds space around the text */
    border-radius: 5px; /* Smooth rounded corners */
    font-size: 12px; /* Smaller font size for clarity */
    white-space: nowrap; /* Prevents text from wrapping */
    opacity: 1; /* Fully visible */
    transition: opacity 0.3s ease-in-out; /* Smooth fade effect */
    z-index: 100;
  }

  /* 🔹 Main Toggle Switch Button */
  .toggle-switch {
    width: 25px; /* Adjust width for button */
    height: 20px; /* Set height */
    border-radius: 15px; /* Rounded pill shape */
    background-color: rgb(244, 67, 54); /* Default: Disabled (Red) */
    display: flex; /* Flexbox for alignment */
    align-items: center; /* Center vertically */
    justify-content: space-between; /* Space text & handle properly */
    position: relative; /* Needed for absolute positioning of handle */
    cursor: pointer; /* Cursor changes to pointer when hovered */
    padding: 0 10px; /* Space inside the switch */
    font-size: 10px; /* Text size */
    font-weight: bold; /* Make text bold */
    color: white; /* White text color */
    transition: background-color 0.3s ease-in-out; /* Smooth color change */
  }

  /* 🔹 Enabled (Green) Toggle State */
  .enabled {
    background-color: rgb(76, 175, 80); /* Changes color when enabled */
  }

  /* 🔹 Circular Toggle Handle */
  .switch-handle {
    width: 15px; /* Circle width */
    height: 15px; /* Circle height */
    border-radius: 50%; /* Makes it a perfect circle */
    background-color: white; /* White color for contrast */
    position: absolute;
    transition: transform 0.3s ease-in-out;
  }

  /* 🔹 Handle movement when enabled */
  .enabled .switch-handle {
    transform: translateX(15px); /* Moves handle to the right */
  }

  /* 🔹 Handle movement when disabled */
  .disabled .switch-handle {
    transform: translateX(-5px); /* Moves handle to the left */
  }

  /* css for the edit table */
  /* Backdrop with Blur Effect */
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
    overflow: hidden; /* Prevent scroll on large screens */
  }

  /* Modal Content with Modern Look */
  .modal-content {
    background: white;
    padding: 10px 40px 10px 30px;
    border-radius: 12px;
    width: 100%;
    max-width: 550px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
    text-align: left;
    animation: slideDown 0.3s forwards;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent scroll on large screens */
    box-sizing: border-box;
  }

  /* Modal Header */
  .modal-content h2 {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  /* Input Fields */
  .modal-content label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    color: #555;
  }

  .dateEvent {
    display: flex;
    flex-direction: row;
  }
  .eventLocation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .modal-content select {
    width: 210px;
    height: 30px;
    margin-top: 5px;
    border-radius: 3px;
  }

  .modal-content input,
  .modal-content textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border 0.3s ease-in-out;
  }

  .modal-content textarea {
    resize: none;
    overflow-y: auto;
  }

  .modal-content input:focus,
  .modal-content textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  /* Buttons with Modern Look */
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

  .disabled-button {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
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

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .dateEvent {
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* Ensures even spacing */
    gap: 10px; /* Adds spacing between inputs */
  }

  /* eye button css */
  /* Modal Backdrop */
  .event-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); /* Dark overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
  }

  /* Modal Content */
  .event-modal-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 500px;
    max-width: 90%;
    max-height: 80vh; /* Limit modal height */
  }

  .eye-details {
    max-height: 65vh; /* Limit modal height */
    /* Enable scrolling when content is too tall */
    overflow-y: auto;
  }

  .eye-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  /* Close Button */
  .event-modal-close {
    position: static;
    top: 12px;
    right: 12px;
    font-size: 30px;
    background: none;
    border: none;
    cursor: pointer;
    color: rgb(244, 67, 54);
    transition: color 0.3s ease-in-out;
  }

  .event-modal-close:hover {
    color: #000;
  }

  /* Modal Title */
  .event-modal-title {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
  }

  /* Modal Body */
  .event-modal-body p {
    font-size: 16px;
    color: #444;
    margin-bottom: 8px;
  }

  /* Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .image-Container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .event-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 15px;
    margin-right: 30px;
  }

  .event-initials {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ccc;
    color: #333;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6px;
  }

  /* Responsive Design */
  @media (max-width: 1100px), (max-height: 500px) {
    .search-input {
      width: 100%; /* Full width on smaller screens */
    }
    .table-container {
      margin-left: 0;
      margin-right: 0;
    }

    .column.name,
    .column.description,
    .column.venue,
    .column.date,
    .column.actions {
      min-width: unset;
      max-width: 80;
    }
    .column.actions {
      min-height: 45px;
    }
    .column.actions.buttons {
      min-height: 65px;
    }
    .column.date{
      white-space: break-spaces;
    }


    .table-container {
      max-height: 495px;
      overflow-y: auto;
      box-sizing: border-box;
      table-layout: fixed;
      position: relative;
      margin-left: 10px;
      margin-right: 10px;
    }

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
      overflow-y: auto; /* Allow scrolling on small screen heights */
    }

    .modal-content {
      overflow-y: auto;
      max-height: 90vh;
    }
  }
`;
export default Wrapper;
