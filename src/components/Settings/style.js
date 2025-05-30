import styled from "styled-components"

const Wrapper = styled.section`

  .container{
    margin : 20px;
    h1{
      font-size : 30px;
    }
  }

  .connection-request, .distance{
    display : flex;
    margin : 20px 0 0;
    input{
      margin-left : 195px;
    }
    p{
      font-size : 15px;
      font-weight : normal;
      display : flex;
      align-items : center;
      margin-left : 5px;
    }
  }

  .connection-request{
    p{
      margin-left : 20px;
    }
  }

  .toggleSlider{
    margin-left: 200px;
  }
  .switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  left:15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
  .slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
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
  background-color: #4caf50; /* Green when active */
}

.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  left: 15px;
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
  background-color: #ff4d4d; /* 🔴 Red when inactive */
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
  background-color: #4caf50; /* 🟢 Green when active */
}

input:checked + .slider:before {
  transform: translateX(22px);
}

input:checked + .slider:before {
  transform: translateX(22px);
}

  .distance{
    display : flex;
  }

  .save-btn{
    button{
      padding : 10px 15px;
      background : rgb(177, 179, 215);
      color : white;
      border : none;
      border-radius : 5px;
      margin-top : 30px;
    }
  }

  .save-btn button:hover{
    background: rgb(96, 100, 186);
  }
  
`

export default Wrapper