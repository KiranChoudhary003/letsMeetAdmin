import styled from "styled-components";

const Wrapper = styled.div`
  .container {
    max-width: 600px;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    position: relative;
    z-index: 1;
  }

  .heading {
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 30px;
    }
  }

  .accordion h2 {
    background: rgb(177, 179, 215);
    color: white;
    padding: 12px;
    margin: 10px 0;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    border-radius: 8px;
    transition: background 0.3s, transform 0.2s;
  }

  .accordion h2:hover {
    background: rgb(96, 100, 186);
;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup {
    background: white;
    padding: 25px;
    border-radius: 10px;
    width: 90%;
    max-width: 800px;
    text-align: center;
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: black;
    transition: color 0.3s ease;
  }

  .close-btn:hover {
    color: red;
  }

  .scroll-container {
    max-height: 250px;
    overflow-y: auto;
    overflow-x: auto;
    width: 100%;
    max-width: 800px; 
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 10px;
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
    width : 800px;
    margin-right : 20px;
    box-sizing : border-box;
  }

  table td {
    background: #fff;
  }

  .primary-btn,
  .danger-btn {
    padding: 8px 14px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s, transform 0.2s;
  }

  .primary-btn {
    background: #28a745; 
    color: white;
  }

  .primary-btn:hover {
    background: #218838;
    transform: scale(1.05);
  }

  .danger-btn {
    background: #dc3545; 
    color: white;
  }

  .danger-btn:hover {
    background: #c82333;
    transform: scale(1.05);
  }

  .report-btn {
    padding: 8px 14px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    margin: 5px;
    transition: background 0.3s, transform 0.2s;
  }

  .in-progress {
    background: #28a745; 
    color: white;
  }

  .in-progress:hover {
    background: #218838;
    transform: scale(1.05);
  }

  .completed {
    background:  #dc3545; 
    color: white;
  }

  .completed:hover {
    background: #c82333 ;
    transform: scale(1.05);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    .popup {
      width: 95%;
    }
  }
`;

export default Wrapper;
