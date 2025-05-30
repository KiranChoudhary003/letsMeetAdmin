import styled from "styled-components";

const Wrapper = styled.div`
  .heading {
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow: visible; 
  }

  .menu {
      width: 210px; 
      flex-shrink: 0;
      background: rgb(177, 179, 215);
  }

  .menu h1 {
      font-size: 25px;
      padding: 20px; 
      width : 210px;
  }

  .main-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1; 
  }

  .header {
      width: 100%;
      margin: 0;
      padding: 0;
  }
`;

export default Wrapper;