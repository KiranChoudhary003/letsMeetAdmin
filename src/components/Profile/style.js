import styled from "styled-components"

const Wrapper = styled.section`
    .profile{
        width : 100%;
        display : flex;
        div{
            flex : 1;
        }
    }

    .heading{
        h1{
            font-size : 30px;
            margin : 10px;
        } 
    }

    .user-img{
        img{
            height : 300px;
            width : 300px;
            border : 5px solid #cccccc;
            border-radius : 50%;
            padding : 10px;
            position : absolute;
            top : 180px;
            left : 270px;
        }
    }

    .user-details{
        margin : 50px;
        h1{
            font-size : 25px;
            margin : 0 0 10px 0;
        }
        
        h2{
            font-size : 20px;
            font-weight : normal;
            margin-bottom : 30px;
            border : 1px solid #cccccc;
            padding : 5px 10px;
            border-radius : 5px;
        }

        button{
            display : flex;
            align-items : center;
            font-size : 15px;
            background : rgb(177, 179, 215);
            border : none;
            padding : 5px 10px;
            border-radius : 40px;
        }
    }

    .logout{
        padding-top : 20px;
    }
`

export default Wrapper