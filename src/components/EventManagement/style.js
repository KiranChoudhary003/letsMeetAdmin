// style.js

import styled from 'styled-components';

const Wrapper = styled.div`
  .events {
    margin : 10px 0 10px 20px;
    h1{
      font-size : 30px;
    }
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    
    .mass-delete {
    background-color:rgb(255, 17, 0);
    color: #fff;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 4px;
    align-items :center;
    font-size : 15px;
  }
}


  .column {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .checkbox input {
    margin: 0;
  }

  .enabled {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }

  .disabled {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }

  .actions button {
    margin-right: 5px;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }

  .edit-btn {
    background-color: #4caf50;
    color: white;
    border: none;
  }

  .delete-btn {
    background-color: #f44336;
    color: white;
    border: none;
  }

  .table-container {
    width : 100%;
    max-height: 450px; 
    overflow-y: auto;
    margin-top : 10px;
    box-sizing : border-box;
    padding : 0 10px;
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