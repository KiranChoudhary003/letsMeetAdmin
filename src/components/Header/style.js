import styled from "styled-components";

const Wrapper = styled.header`
background : rgb(177, 179, 215);
width : calc(100%-210px);
.header{
    display : flex;
    justify-content : space-between;
    align-items : center;
    h1{
        font-size : 35px;
        padding : 20px;
        text-align : center;
    }   
    img{
        width : 30px;
        height : 30px;
        padding-right : 20px;
        filter : invert(1);
    }
}
`

export default Wrapper