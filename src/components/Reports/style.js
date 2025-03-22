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
    position: relative;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
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

`;

export default Wrapper;
