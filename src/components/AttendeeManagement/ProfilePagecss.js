import styled from "styled-components";

const Wrapper = styled.section`

  .heading{
    margin: 10px 10px 9px 10px;
  }

  .profile-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    margin-top:-100px;
    background-color: #f4f6f9;
    margin-top : 5px;
  }
    

  .profile-content {
    display: flex;
    width: 80%;
    height: auto;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    padding: 30px;
    gap: 20px;
     align-items: center
  }

  /* Left side - Profile Image */
 .profile-image-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;  /* Center items horizontally */
    padding: 10px;
    position: relative;
}

  .profile-image {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #007bff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Right side - Profile Details */
  .profile-details {
    flex: 2;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    
  }

  .attendee-table {
  width: 100%;
  border: none;
  margin-top: 1rem;
  font-size: 27px;
}

.attendee-table th {
  text-align: left;
  padding: 8px 12px;
  font-weight: 600;
}

.attendee-table td {
  padding: 8px 12px;
}

/////*
  .profile-header {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center; /* Aligns text to the left */
  //position: absolute;
  margin-top: -45px;
  left: 750px;
}

  .profile-info {
    font-size: 26px; /* Bigger text */
    margin-bottom: 6px;
    color: #444;
    display: flex;
    align-items: center;
  }

  .profile-info strong {
    color: #222;
    min-width: 200px; /* Ensures alignment */
    display: inline-block;
    font-size: 30px; /* Bigger labels */
  }
.back-button {
  background-color: transparent;
  color: black;
  padding: 14px 28px;       /* Increased padding */
  font-size: 35px;          /* Larger text */
  font-weight: 2000;         /* Bold text */
  border: none;
  cursor: pointer;
  margin-left: -15px;
  margin-top: -10px;
  transition: color 0.3s ease, text-decoration 0.2s ease;
}

.back-button:hover {
  
  color: #222; /* Slightly darker on hover */
}

.wholeprofile{
overflow-y:auto;
max-height:540px;

}
    .event-list-container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 15px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}
  .linkedin-button {
  
    display: inline-block;
    padding: 20px 20px;
    font-size: 16px;
    color: white;
    background-color: #0077b5;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    width:100%;
    transition: background 0.3s;
    margin-top:40px; /* Ensure proper spacing */
}

.linkedin-button:hover {
    background-color: #005582;
}

.event-list-title {
  font-size: 22px;
  margin-bottom: 10px;
}

/* Wrapper for scroll */
.event-table-container {
    overflow-x: auto;
    margin-top: 20px;
      width: 100%;
      height:300px;
}

/* Table styling */
.event-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* Optional: prevents table from squishing too much */
}

.event-table th, .event-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
}

.event-table th {
    background-color: rgba(0, 0, 0, 0.58);
    color: white;
}


/* Dropdown container */
.dropdown {
    position: relative;
    display: inline-block;
}

.view-connection-btn {
    background-color: #0077b5;
    color: white;
    padding: 10px 14px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
}

.dropbtn:hover {
    background-color: #005582;
}

/* Dropdown content (hidden by default) */
.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: white;
    min-width: 200px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: 10px;
    border-radius: 5px;
}

/* Show dropdown when button is clicked */
.dropdown .dropdown-content {
    display: block;
}

/* Dropdown item */
.dropdown-item {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item strong {
    color: #007bff;
}


.event-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.no-events {
  font-size: 18px;
  color: gray;
  text-align: center;
}
/* Modal Background */
.modal-overlay {
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px); /* Slight blur effect */
  animation: fadeIn 0.3s ease-in-out;
}

/* Modal Box */
.modal-content {
  max-height:500px;
  overflow-y : auto;
  background: #fff;
  padding: 25px;
  width: 40%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: left;
  font-family: Arial, sans-serif;
}

/* Cross Button */
.close-modal-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #555;
  transition: color 0.3s;
}

.close-modal-btn:hover {
  color: red;
}

/* Modal Title */
.modal-content h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
}

/* User List */
.modal-content ul {
  list-style: none;
  padding: 0;
}

.modal-content li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.modal-content li:last-child {
  border-bottom: none;
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
  margin-bottom: 16px;
}


.profile-header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
}
 linkedin-button-start
  {
 
    padding: 20px 200px;
    font-size: 16px;
    color: white;
    background-color: #0077b5;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    width:100%;
    transition: background 0.3s;
    margin-top:70px; /* Ensure proper spacing */
  }



.toggle-btn {
 background-color: rgb(177,179,215);
  color: #000;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.toggle-btn .dropdown-icon {
  margin-left: 12px;
  transition: transform 0.3s ease;
}

/* Rotate icon when active */
.toggle-btn .dropdown-icon.rotated {
  transform: rotate(180deg);
}

  
`;

export default Wrapper;
