import styled from "styled-components";

const Wrapper = styled.section`
  .container {
    display: flex;
    height: 100vh;
    font-family: 'Georgia', serif;
  }

  .login {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* changed from center to left-align */
  gap: 30px;
  padding-left: 100px; /* for consistent left offset */
  margin : 0 0 0 150px;

  h1 {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left : 75px;
  }

  input[type="text"] {
    width: 250px;
    padding: 10px 15px;
    border-radius: 25px;
    border: 1.5px solid black;
    font-size: 16px;
    outline: none;
  }

  .password-wrapper {
    position: relative;
    width: 225px;

    input {
      width: 100%;
      padding: 10px 15px;
      padding-right: 40px;
      border-radius: 25px;
      border: 1.5px solid black;
      font-size: 16px;
      outline: none;
    }

    span {
      position: absolute;
      right: -40px;
      top: 55%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #333;
    }
  }

  input[type="button"] {
    margin-top: 10px;
    background-color: rgb(177, 179, 215);
    color: white;
    padding: 10px 25px;
    border-radius: 15px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-left : 90px;
  }
}

  .image {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-top-left-radius: 200px;
    border-bottom-left-radius: 200px;

    .rectangle {
      position: absolute;
      top : 0;
      right : 0;
      width:  80%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: 200px;
      border-bottom-left-radius: 200px;
    }

    .logo {
      position: absolute;
      top : 30%;
      right : 15%;
      width: 210px;
      height: 210px;
      border-radius: 50%;
      background: white;
      padding: 15px;
    }
  }
`;

export default Wrapper;
