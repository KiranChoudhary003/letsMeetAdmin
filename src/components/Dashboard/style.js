import styled from "styled-components";

const Wrapper = styled.section`

.dashboard {
    margin : 10px 0 10px 20px;
    h1{
    font-size : 30px;
    }
}

.container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    

    h1 {
        font-size: 3vw; 
    }

    h2 {
        margin: 10px;
        font-size : 30px;
    }
}

.totalUsers, .totalConnections, .eventRegisteredUsers {
    border: 0.5px solid #cccccc;
    border-radius: 15px;
    background: radial-gradient(circle, white 0%,rgb(177, 179, 215) 50%);
    width: 30%; 
    height : 125px;
    min-width: 200px; 
    text-align: center;
    display : flex;
    flex-direction : column;
    justify-content : space-between
}



.chart {
    width: 100%;
    max-width: 1000px; 
    padding-inline: 3%;
}

.button {
    
    text-align: right;
    margin-bottom: 15px;
    padding-right: 0.8vw;
    margin-top : 25px;
}

@media (max-width: 1024px) {
    .dashboard h1 {
        font-size: 24px;
    }

    .container {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .totalUsers, .totalConnections, .eventRegisteredUsers {
        width: 90%;
    }

    .graph {
        padding: 15px;
    }

    .chart {
        width: 100%;
    
    }

    .button {
        text-align: center;
        margin-bottom: 15px;
    }
}
`

export default Wrapper