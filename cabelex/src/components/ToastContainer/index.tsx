import React from 'react';
import { Container} from './styles';
import {ToastMessage}from '../../hooks/ToastContext';
import Toast from './Toast';


interface ToastContainerInterface{
  messages:ToastMessage[];
}
const ToastContainer: React.FC<ToastContainerInterface> = ({messages}) => {
  return (
    <Container>
     {messages.map((message)=>(
        <Toast key={message.id} message={message}></Toast>
     ))}   
    </Container>
  );
}

export default ToastContainer;