import styled, { css } from 'styled-components';
import loginImage from '../../assets/login.jpg'

export const Container = styled.div`
    display: flex;
    background-color: var(--globalBackground) ;
    width: 100%;
    height: 100%;
    padding:3%;
    justify-content: center;
    align-items: center;
`;
export const Content = styled.div`
    background-color: #ffffff;
    width: 97%;
    height: 97%;
`;

export const ContentRight = styled.div`
    height: 100%;
    background-image:url(${loginImage});
    background-size:cover;
`;

export const ContentLeft = styled.div`
    display: flex;
    width:45%;
    height: 70%;
    min-height: 400px;
    justify-content: center;
    align-items: center;
    padding:0;
    h2{
      color:var(--buttonColor);
      font-weight: 700;
    }

    h2 img{
        width: 250px;
        
    }

    label{
      padding: 0;
    }
`;

export const Card = styled.div`
    border: 1px solid rgb(255,255,255, 0.2);
    width: 90%;
    height: 40%;
    background-color: rgb(255,255,255,0.2);
    color: rgb(255,255,255);
    backdrop-filter:url(${loginImage});
    backdrop-filter: blur(8px);
    margin-bottom: 30px;
    position: relative;
    padding: 60px;
    border-radius: 3px;
    h1{
        font-size: 26px;
        margin-bottom: 15px;
        font-weight: bold;
    }
    h3{
        font-size: 18px;
        
    }
    h4{
        font-size: 16px;
        font-weight: 100;
        font-style:italic;
    }

`;

