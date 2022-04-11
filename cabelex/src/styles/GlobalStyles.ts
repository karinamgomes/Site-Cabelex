import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`

*{
    margin:0;
    padding:0%;
    box-sizing:border-box;
    outline:0;
}
html,body, #root{
    height:100vh;
    font-family:'Nunito Sans',sans-serif;
}

body, input ,button{
    font-family: 'Inter', sans-serif;
    font-size:16px;
    -webkit-font-smoothing: antialiased;
    outline:none;
    
}
h1,h2,h3,h4,h5,h6,strong,label{
     font-weight:500;
     -webkit-font-smoothing: antialiased;   
 }
 button{
     cursor:pointer;
 }
:root{
    

    --error:#FD392F;
    --globalBackground:#FDF5F1;
    --textPlaceholderInput: #a1a3ac;
    --borderInput: #686869;
    --buttonColor: #111727;
    --buttonMenuColor: #EDD4C6;
}



`;

