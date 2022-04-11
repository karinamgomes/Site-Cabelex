import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement>{

}

const CustomButton: React.FC <ButtonInterface>= ({...rest}) => {
  return <Container {...rest}/>;
}

export default CustomButton;