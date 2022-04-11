import react from 'react';

// import styled from 'styled-icons/material';

import {Container} from './styles';


interface TooltipInterface{
    title:string;
    className?:string;
}

export const Tooltip: React.FC<TooltipInterface> =({children,title,className}) =>(

    <Container className={className}>
        {children}
        <span>{title}</span>
    </Container>
);

export default Tooltip;