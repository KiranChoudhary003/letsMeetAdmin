import styled from "styled-components"

/* components/LoaderOverlay.css */
const Wrapper = styled.div`
.blur-overlay {
    position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9998;
}

.login-tile {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

`

export default Wrapper;
