import styled from "styled-components";

const Wrapper = styled.section`
  cursor: default;

  /* --- USERS container: heading + search + buttons --- */
  .users {
    margin: 10px 10px 9px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap; /* nowrap until 728px */
    gap: 15px;
  }

  .users > h1 {
    font-size: 30px;
    flex-shrink: 0;
    margin: 0;
    min-width: 150px;
  }

  /* --- SEARCH BAR --- */
  .search-container {
    flex-grow: 1;
    min-width: 200px;
    max-width: 600px;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .search-input {
    width: 100%;
    max-width: 450px;
    min-width: 150px;
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
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
    cursor: pointer;
    font-size: 18px;
    transition: color 0.3s ease-in-out;
  }

  .search-icon:hover {
    color: #007bff;
  }

  /* --- BUTTONS --- */
  .button-placeholder {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-shrink: 0;
    min-width: 150px;
    max-width: 100%;
    flex-wrap: nowrap;
  }

  .bulk-reset-btn,
  .bulk-delete-btn,
  .add-btn {
    padding: 8px 15px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    flex: 1 1 auto;
    min-width: 70px;
  }

  .bulk-reset-btn {
    background: #28a745;
    color: #fff;
    border: none;
  }

  .bulk-delete-btn {
    background-color: rgb(244, 67, 54);
    color: #fff;
    border: none;
  }

  .add-btn {
    background-color: rgb(177, 179, 215);
    color: black;
    font-weight: bold;
    border: none;
  }

  /* --- RESPONSIVE at 728px --- */
  @media (max-width: 728px) {
    .users {
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }

    .users > h1 {
      flex-basis: 100%;
      text-align: center;
      margin-bottom: 10px;
    }

    .search-container {
      flex-basis: 100%;
      max-width: 100%;
      justify-content: center;
      order: 2;
      margin-bottom: 10px;
    }

    .button-placeholder {
      flex-basis: 100%;
      justify-content: center;
      order: 3;
      flex-wrap: wrap;
      gap: 8px;
    }

    .bulk-reset-btn,
    .bulk-delete-btn,
    .add-btn {
      flex: 1 1 45%;
      min-width: unset;
      max-width: 250px;
    }
  }

  /* --- TABLE container --- */
  .table-container {
    max-height: 490px;
    overflow-y: auto;
    box-sizing: border-box;
    table-layout: fixed;
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
    width: 100%; /* full width until wrap */
    transition: width 0.3s ease;
  }

  @media (max-width: 728px) {
    .table-container {
      width: auto; /* shrink when buttons wrap */
    }
  }

  /* --- YOUR ORIGINAL TABLE STYLES EXACTLY AS YOU GAVE --- */
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

  .column.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
    align-self: center;
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
    background: white;
    color: black;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    padding: 8px 5px 0;
    transition: background 0.3s ease-in-out;
    margin-right: 5px;
  }

  .delete-btn {
    background: white;
    font-size: 20px;
    color: rgb(244, 67, 54);
    border: none;
    padding: 8px 5px 0;
    margin-right: 5px;
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

  .actions {
    display: flex;
    gap: 10px;
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

  /* --- Modal styles --- */
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

  .modal-content.add,
  .modal-content.edit {
    width: 450px;
    min-height: 300px;
  }

  .modal-content.reset-password {
    width: 380px;
    min-height: 220px;
  }

  /* --- Switch styles --- */
  .switch {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ff4d4d;
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
    background-color: #4caf50;
  }

  input:checked + .slider:before {
    transform: translateX(22px);
  }

  .newsavebtn {
    button {
      position: static;
      top: 12px;
      margin-left: -250px;
      font-size: 16px;
      background-color: rgb(76, 175, 80);
      color: white;
      border: none;
      border-radius: 6px;
      height: 45px;
      padding: 8px 16px;
      cursor: pointer;
      width: 150px;
      transition: background-color 0.3s ease-in-out, transform 0.2s;
    }

    .newsavebtn:hover {
      background-color: rgb(56, 142, 60);
      transform: scale(1.05);
    }

    .newsavebtn:active {
      transform: scale(0.95);
    }
  }

  .newclosebtn {
    button {
      position: absolute;
      margin-top: -60px;
      margin-right: 30px;
      margin-left: 30px;
      font-size: 16px;
      background-color: #ff4d4d;
      color: white;
      border: none;
      border-radius: 6px;
      height: 45px;
      padding: 8px 16px;
      cursor: pointer;
      width: 150px;
      transition: background-color 0.3s ease-in-out, transform 0.2s;
    }
  }
`;

export default Wrapper;
