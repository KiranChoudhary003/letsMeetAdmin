import styled from "styled-components";

const Wrapper = styled.section`
  padding: 12px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background-color: white;
   
  h2 {
    font-size : 30px;
    margin: 20px;
  }

  .title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
  }
    .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    color: #888;
  }

  .search-input {
    padding: 10px 12px 10px 36px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease-in-out;
  }

  .search-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  /* Scrollable Table Container */
  .table-container {
    max-height: 450px; /* Increase height for better scrolling */
    overflow-y: auto;
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: white;
  }

  .attendee-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px;
    background-color: white;
  }

  /* Fixed Header Styling */
  .attendee-table thead th {
    background-color: #222; /* Dark black header */
    color: white;
    font-size: 1rem;
    font-weight: 600;
    padding: 14px;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 2px solid #444;
    border-right: 1px solid #444;
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
    border-right: none; /* Remove right border for last column */
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
    background-color: #aaa;
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
    transition: all 0.3s ease-in-out;
  }

  .view-profile:hover {
    background-color: #0056b3;
  }
`;

export default Wrapper;
