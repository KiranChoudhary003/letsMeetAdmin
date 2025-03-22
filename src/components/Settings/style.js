import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    max-width: 500px;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }

  .heading {
    margin-bottom: 20px;
    h1{
        font-size : 30px;
    }
  }

  .accordion {
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .accordion h2 {
    background: rgb(177, 179, 215);
    color: white;
    padding: 12px;
    margin: 0;
    cursor: pointer;
    font-size: 18px;
    transition: 0.3s;
    text-align: center;
  }

  .accordion h2:hover {
    background: rgb(96, 100, 186); 
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    z-index: 100;
  }

  .modal-content {
    background: white;
    padding: 20px;
    width: 60%;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 10px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .modal-content {
      width: 90%;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }

  .header p {
    cursor: pointer;
    font-size: 18px;
    color: #ff4d4d;
    transition: 0.3s;
  }

  .header p:hover {
    color: rgb(123, 5, 16);
  }

  .scroll-container {
    max-height: 250px;
    overflow-y: auto;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    position : relative;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    position : relative;
  }

  table thead{
    position: sticky;
    top: 0;
    background: rgb(177, 179, 215);
    z-index: 10;
  }

  table th, table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  table th {
    background: rgb(177, 179, 215);
    color: white;
  }

  table td {
    background: #fff;
  }

  .modal-content button {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-weight: bold;
}

.modal-content button:nth-child(1) {
  background: #28a745;  
  color: white;
}

.modal-content button:nth-child(1):hover {
  background: #218838; 
}

.modal-content button:nth-child(2) {
  background: #dc3545;  
  color: white;
  margin-left: 10px; 
}

.modal-content button:nth-child(2):hover {
  background:rgb(123, 5, 16); 
}

  .distance-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 101;
  }

  /* Distance Check-In Content */
  .distance-body {
    background: white;
    padding: 20px;
    width: 30%;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 102; 
  }

  @media (max-width: 768px) {
    .distance-body {
      width: 90%;
    }
  }

  .distance-body h2 {
    margin-bottom: 15px;
    font-size: 22px;
    color: #333;
  }

  .distance-body span {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
  }

  .distance-body input {
    width: 80%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }

  .distance-body button {
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 14px;
    margin: 5px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    transition: 0.3s;
  }

  .distance-body button:hover {
    background: #218838;
  }

  .distance-body button:nth-child(3) {
    background: #dc3545;
  }

  .distance-body button:nth-child(3):hover {
    background: #c82333;
  }
`;

export default Wrapper;
