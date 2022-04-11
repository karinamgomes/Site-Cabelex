import React, { InputHTMLAttributes, useState, useRef, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import { Error } from 'styled-icons/material';
import { Container,DivError } from './styles';


interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const CustomInput: React.FC<InputInterface> = ({ name, style, ...rest }) => {
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  
  const handleInputBlur = useCallback(() => {
    setFocused(false);
    setFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setFocused(true)
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);


  return (
    <Container style={{borderRadius:style?.borderRadius}} isError={!!error} isFilled={isFilled} isFocused={isFocused}>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}{...rest}
        defaultValue={defaultValue}
       {...rest}
      />
      {error && <DivError title={error}><Error/></DivError>}
    </Container>
  );
}

export default CustomInput;