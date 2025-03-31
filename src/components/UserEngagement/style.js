import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  padding: 25px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  h2 {
    text-align: center;
    color: #222;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 25px;
  }

  label {
    display: block;
    font-weight: 600;
    font-size: 1rem;
    margin: 12px 0 6px;
    color: #444;
  }

  select {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    background: #fafafa;
    cursor: pointer;
    transition: border 0.3s ease;

    &:hover {
      border-color: #888;
    }

    &:focus {
      outline: none;
      border-color: #555;
      background: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }

  p {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin-top: 20px;
  }

  .chart-container {
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 20px;

    h2 {
      font-size: 1.6rem;
    }

    select {
      font-size: 0.95rem;
      padding: 8px;
    }
  }

  @media (max-width: 480px) {
    padding: 15px;

    h2 {
      font-size: 1.4rem;
    }

    select {
      font-size: 0.9rem;
      padding: 7px;
    }
  }

  .backArrow{
    width : 30px;
    height : 30px;
  }
`;

export default Wrapper;
