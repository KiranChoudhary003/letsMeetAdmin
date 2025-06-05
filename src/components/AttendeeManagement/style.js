import styled from "styled-components";

const Wrapper = styled.section`

 .header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.heading {
  font-size: 30px;
  font-weight: 600;
  font-weight: 700;
  margin: 10px 10px 9px 10px;
}


  .title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
  }
 
    .button-placeholder {
      display: flex;
      gap: 10px; /* space between buttons */
      align-items: center;
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
  /* Scrollable Table Container */
  .table-container {
    max-height: 490px;
    overflow-y: auto;
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: white;
    margin-left: 10px;
    margin-right: 10px;
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
     text-align:center;
   
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
    
    text-align: center;
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

  /* Table Container with Scroll */
.event-table-container {
  overflow-x: auto;
  margin-top: 20px;
  width: 100%;
}



/* Table Styling */
.event-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Prevents squishing on small screens */
}

.event-table th,
.event-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.event-table th {
  background-color: rgba(0, 0, 0, 0.58);
  color: white;
}

/* Scrollbar Styling */
.event-table-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.event-table-container::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 6px;
}

.event-table-container::-webkit-scrollbar-track {
  background-color: #f3f3f3;
}

/* Optional: For Firefox */
.event-table-container {
  scrollbar-width: thin;
  scrollbar-color: black #f3f3f3;

}
  /* Button Styling */
  .view-profile {
    background-color:rgb(177, 179, 215);
    color: black;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    border: none;
    font-size:12px;
    font-weight:550;
    transition: all 0.3s ease-in-out;
    
  }

  .view-profile:hover {
    background-color: rgb(96, 100, 186);
  }
`;

export default Wrapper;