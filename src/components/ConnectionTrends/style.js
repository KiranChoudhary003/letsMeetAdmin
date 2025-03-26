import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  .modal-content {
    width: 90%;
    max-width: 800px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  }

  .header {
    padding-bottom: 15px;
    border-bottom: 2px solid #eee;
    text-align: center;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .scroll-container {
    margin-top: 20px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
  }

  thead {
    background-color: rgb(177, 179, 215);
    color: white;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: 600;
  }

  tbody tr:hover {
    background-color: rgb(236, 236, 241);
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  td {
    color: #555;
  }

  @media (max-width: 768px) {
    .modal-content {
      width: 100%;
      padding: 15px;
    }

    h2 {
      font-size: 20px;
    }

    th, td {
      padding: 10px;
    }
  }
`;

export default Wrapper;
