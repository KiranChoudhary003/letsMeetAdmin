import styled from "styled-components";

const Wrapper = styled.section`
width : 100%;
min-height: 100vh;
.menu-bar{
    background :rgb(199, 200, 192);
    width : 210px;
    min-height : 100vh;
    display : flex;
    flex-direction : column;
    position : relative;
    top : 0;
}
.heading{
    h1{
        font-size : 25px;
        padding : 20px;
    }
}
.content{
    display : flex;
    flex-direction : column;
    flex-grow: 1;
    div{
        display : flex;
        align-items : center;
        padding : 10px 20px;
    }
    span{
        margin-left : 10px;
    }
}

`

export default Wrapper