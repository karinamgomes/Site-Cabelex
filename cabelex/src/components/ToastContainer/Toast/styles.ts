import styled,{css} from 'styled-components';

interface ToastInterface{
    type?: 'success' | 'error' | 'info';
    Hasdescription?:string;
}
const ToastVariations = {
    info: css`
    background:#ebf8ff;
    color:#3172b7;
    `,
    success: css`
    background:#e6fffa;
    color:#2e656a;
    `,
    error: css`
    background:#fddede;
    color:#c53030;
    `
}


export const Container = styled.div<ToastInterface>`
    width:300px;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius:10px;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
    display:flex;

    ${props=> ToastVariations[props.type || 'info']};

    & + div{
        margin-top:16px;
    }
  > svg{
      width:18px;
      margin:4px 12px 0 0; 
  }

  div{
      flex:1;

      p{
          margin-top:4px;
          font-size:14px;
          opacity:0.8;
          line-height:20px;
      }
  }

  >button{
      position: absolute;
      right:8px;
      top:20px;
      opacity:0.6px;
      border:0px;
      background:transparent;
      color:inherits;
      svg{
          width:20px;
      }
  }
`;
