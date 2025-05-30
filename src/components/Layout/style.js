import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  .home {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full viewport height */
    overflow: hidden;
  }

  .heading {
    display: flex;
    flex: 1; /* Take available vertical space */
    flex-direction: row;
    width: 100%;
    overflow: hidden;
    min-height: 0; /* Allow .main-content to shrink */
  }

  .menu {
    width: 210px;
    flex-shrink: 0;
    background: rgb(177, 179, 215);
    height: 100%; /* Fill vertical space */
    overflow-y: auto;
  }

  .menu h1 {
    font-size: 25px;
    padding: 20px;
    width: 210px;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden; /* Contain scroll inside .outlet */
  }

  .header {
    flex-shrink: 0;
    width: 100%;
  }

  .outlet {
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    min-height: 0; /* Prevent overflow bug */
  }

  .footer {
    flex-shrink: 0;
    padding: 10px;
    background: rgb(177, 179, 215);
    text-align: center;
  }

  /* Responsive layout */
  @media (max-width: 768px) {
    .heading {
      flex-direction: column;
    }

    .menu {
      width: 100%;
      display: none; /* Optional: replace with toggle menu for mobile */
    }

    .menu h1 {
      width: 100%;
      text-align: center;
    }

    .main-content {
      width: 100%;
    }

    .outlet {
      padding: 10px;
    }
  }
`;

export default Wrapper;
