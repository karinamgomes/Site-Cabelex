import {createContext,useContext,useCallback,useState} from 'react';
import ToastContainer from '../components/ToastContainer';
import {v4} from 'uuid';

export interface ToastMessage{
    id:string;
    type?:'success' | 'error' | 'info';
    title:string;
    description?:string;    
}

interface ToastContextDataInterface{
    addToast(message:Omit<ToastMessage,'id'>):void;
    removeToast(id:string):void;
}

const ToastContext = createContext<ToastContextDataInterface>({} as ToastContextDataInterface);

const ToastProvider:React.FC =({children})=>{

    const [messages,setMessages] = useState<ToastMessage[]>([]);
    const addToast = useCallback(({type,title,description}: Omit<ToastMessage,'id'>)=>{
        const id = v4();

        const toast ={
            id,
            type,
            title,
            description,
        };
        setMessages((oldMessages)=>[...oldMessages,toast]);

    },[],);

    const removeToast = useCallback(async(id:string)=>{
        setMessages((oldMessages)=> oldMessages.filter(messages=> messages.id !== id));
    },[]);
    
    return(
        <ToastContext.Provider value={{addToast,removeToast}}>        
            {children}
            <ToastContainer messages={messages}/>
        </ToastContext.Provider>
    );
}

function UseToast():ToastContextDataInterface{
     const context = useContext(ToastContext);
     if(!context){
        throw new Error ("useToast must be used within a ToastProvider");
     }

     return context;
}

export {ToastProvider,UseToast};