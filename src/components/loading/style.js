import styled, { keyframes } from "styled-components";

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.04);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  }
  100% {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.04);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  /* background: linear-gradient(135deg, #eef2f7, #ffffff); */
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 20px;

  .animation-wrapper {
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${pulseGlow} 2.5s ease-in-out infinite;
    transition: all 0.3s ease;
  }

  .animation-wrapper:hover {
    transform: scale(1.015);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  }

  .lottie-container {
    width: 140px;
    height: 140px;
  }

  .lottie-container > svg {
    width: 100% !important;
    height: 100% !important;
  }

  .loading-text {
    margin-top: 1.8rem;
    font-size: 1.25rem;
    color: #2c2f35;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-align: center;
    line-height: 1.6;
  }
`;

export default Wrapper;
