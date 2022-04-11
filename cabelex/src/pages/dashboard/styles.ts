import styled, { css } from 'styled-components';
import { Container,Navbar } from 'react-bootstrap';

interface DashboardContentPorps{
    usePadding?:boolean;
}
export const Content = styled(Container)`
    /* background-color: var(--globalBackground) ; */
    background: rgb(253,245,241);
background: linear-gradient(90deg, rgba(253,245,241,1) 0%, rgba(235,215,205,1) 100%);
    img{
        width: 140px;
    }
`;
export const NavMenu = styled(Navbar)`
    background-color:#ffffff;
    width:100%;
`;

export const CardButtonMenu = styled.div`
    width:100%;
    display:flex;
    background-color: var(--buttonMenuColor);
    border-radius: 12px;
    width: 40px;
    height: 40px;
    border: 4px solid var(--buttonColor);
    align-items: center;
    justify-content: center;
    font-weight:800;
`;

export const MenuLateral = styled.div`
    background-color: red ;
    height: 85vh;
    border-radius: 15px;
`;

export const DashboardContent = styled.div<DashboardContentPorps>`
    background-color: white ;
    height: 85vh;
    border-radius: 15px;
    a{
        text-decoration:none;
    }

    ${props=> props.usePadding && css`
        padding:20px;
    ` }
`;

export const MenuLateralItem = styled.div`
    display: flex;
    justify-content:start;
    align-items:center;
    background-color: white ;
    height: 38px;
    border-radius: 10px;
    color:#A9B4CD;
    margin-bottom:25px;
    transition: 0.4s;
    padding:8px;
    cursor: pointer;
    svg{
        margin-right:10px;
        min-width:22px;
    }
    :hover{
      color: white;
      background-color:#D4A798;  
    }
`;

export const MenuLateralExit = styled.div`
    color:#D4A798;
    transition: 0.4s;
    padding:8px;
    cursor: pointer;
    svg{
        margin-right:10px;
    }
    :hover{
      color: #c07d67;
    }  
`;


