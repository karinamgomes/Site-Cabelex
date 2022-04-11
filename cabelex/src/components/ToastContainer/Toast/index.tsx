import React,{useEffect} from 'react';
import {FiAlertCircle,FiXCircle,FiInfo,FiCheckCircle} from 'react-icons/fi';
import { Container } from './styles';
import {UseToast,ToastMessage} from '../../../hooks/ToastContext'

interface MessageInterface{
    message:ToastMessage;
}

const icons = {
    info:<FiInfo size={24}/>,
    error:<FiAlertCircle size={24}/>,
    success:<FiCheckCircle size={24}/>,
}

const Toast: React.FC <MessageInterface>= ({message}) => {
    const {removeToast} = UseToast();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            removeToast(message.id);
        },5000);

        return () =>{
            clearTimeout(timer);
        }
    },[message.id,removeToast]);

  return (
      <Container type={message.type} Hasdescription={message.description}>
            {icons[message.type || 'info']}
            <div>
                <strong>{message.title} </strong>
                <p>{message.description}</p>
            </div>
            <button onClick={()=>removeToast(message.id)} type="button">
                <FiXCircle/>
            </button>
      </Container>
  
    );
}

export default Toast;