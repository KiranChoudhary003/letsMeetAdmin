import styled from "styled-components";

const Wrapper = styled.section`
.container{
    display : flex;
    div{
        margin : 20px;
        width : 200px;
        height : 150px;
        background : radial-gradient(circle, white 10%, #9999ff 90%);
        flex : 1;
        .span{
            height : 0;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }
        h1{
            font-size : 40px;
            text-align : center;
            padding-top : 10px;
        }
        h2{
            margin : 10px;
        }

    }
}

.users{
    border : 0.5px solid #cccccc;
    border-radius : 15px;
}
.articles{
    border : 0.5px solid #cccccc;
    border-radius : 15px;
}
.videos{
    border : 0.5px solid #cccccc;
    border-radius : 15px;
}
.links{
    border : 0.5px solid #cccccc;
    border-radius : 15px;
}
    .scrollable-chart {
  width: 100%;
  overflow-x: auto; 
  white-space: nowrap;
  padding-bottom: 10px;
}

.chart-wrapper {
  display: inline-block;
  min-width: 100%;
  max-width: 100%; /* Ensures it does not exceed 100% */
}
.heading1{
    margin : 20px 0 0 20px;
    h1{
        font-size : 30px;
    }
}

`

export default Wrapper