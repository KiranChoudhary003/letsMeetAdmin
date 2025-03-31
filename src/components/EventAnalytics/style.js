import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  .chart-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 768px) {
    .chart-container {
      flex-direction: row;
    }
  }
  
  .backArrow{
    width : 30px;
    height : 30px;
  }
`;

export default Wrapper;