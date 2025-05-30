import styled from "styled-components";

const Wrapper = styled.section`
  padding: 24px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
   
  h2 {
    font-size : 30px;
    margin: 20px;

  }
   .header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* spacing before table */
  gap: 20px;
  flex-wrap: wrap; /* ensures responsive layout */
}

.heading {
  margin: 0;
  font-size: 30px;
  font-weight: 600;
  margin-top:-25px;
  margin-left:-20px;
   font-weight: 700; 
}


  .title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
  }
  .search-container {
  width: 100%;
  display: flex;
  justify-content: center;   /* Center the search box horizontally */
  margin: 16px 0 24px 0;     /* Top and bottom margin */
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;  
  margin-top:-100px;   
  margin-left:100px;      /* Optional: limit width */
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #888;
  pointer-events: none;       /* Allow clicking through to input */
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 36px; /* Leave space for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.search-input:focus {
  border-color:black;
  box-shadow: black;

}


  /* Scrollable Table Container */
  .table-container {
    max-height: 500px; /* Increase height for better scrolling */
    overflow-y: auto;
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: white;
    margin-top:-60px;
  }

  .attendee-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px;
    background-color: white;
  }

  /* Fixed Header Styling */
  .attendee-table thead th {
    background-color: rgb(177,179,215); 
    color: black;
    font-size: 1rem;
    font-weight: 700;
    padding: 14px;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 100;
   
  }

  .attendee-table thead th:last-child {
    border-right: none; /* Remove last column border */
  }

  /* Table Rows & Column Styling */
  .attendee-table tbody tr {
    background-color: white;
    transition: all 0.3s ease-in-out;
  }

  .attendee-table tbody tr:hover {
    background-color: #f8f9fa; /* Light hover effect */
  }

  .attendee-table th,
  .attendee-table td {
    padding: 14px;
    
    text-align: left;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  .attendee-table td:last-child {
    border-right: none;
     /* Remove right border for last column */
  }

  /* Alternating Row Colors for Better Readability */
  .attendee-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  /* Scrollbar Styling */
  .table-container::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .table-container::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 6px;
  }

  .table-container::-webkit-scrollbar-track {
    background-color: #f3f3f3;
  }

  /* Button Styling */
  .view-profile {
    background-color:rgb(57, 118, 183);
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
    font-size:10px;
    transition: all 0.3s ease-in-out;
  }

  .view-profile:hover {
    background-color: #0056b3;
  }
`;

export default Wrapper;
