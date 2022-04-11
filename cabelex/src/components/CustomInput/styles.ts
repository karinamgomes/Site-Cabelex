import styled,{css} from 'styled-components';
import Tootip from '../Tooltip';

interface ContainerInterface{
    isFocused:boolean,
    isFilled:boolean,
    isError:boolean
}
export const Container = styled.div<ContainerInterface>`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:45px;

    border: 2px solid var(--textPlaceholderInput);
    border-radius: 10px;
    padding:0 20px;
    input{
        flex:1;
        background:transparent;
        color:var(--textPlaceholderInput);
        border:none;
        &::placeholder{
            color:var(--textPlaceholderInput);
            opacity:0.8;
        }
    }
    transition: border 0.3s;
    ${props => !props.isError && css `
        :hover{
            border: 2px solid var(--borderInput);
        }
    `}
    
    
    svg{
      width:16px;
      height:16px;
      margin-right:5px;
      color:var(--textPlaceholderInput);
      opacity:0.8;
    }
    ${props => props.isError && css `
        border-color:var(--error);
        svg{
        color:var(--error);
        opacity:0.8;
        }
    `}
    ${props => props.isFocused && css `
        border:2px solid var(--borderInput);
        svg{
        color:var(--secondary);
        opacity:0.8;
        }
    `}
    ${props => props.isFilled && css `
        svg{
        color:var(--borderInput);
        opacity:0.8;
        }
    `}
`;

export const DivError = styled(Tootip)`
    /* height:80px; */
    margin-left:16;
    svg{
        margin:0;
    }
`;