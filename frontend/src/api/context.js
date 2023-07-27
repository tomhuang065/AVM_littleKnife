import { useState,useContext,createContext } from "react";
import React from "react";
import {value} from "../pages/Posystem"
// import { useUserDispatch} from "./UserContext";

// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
const WS_URL="ws://localhost:4000"; 
let client=new WebSocket(WS_URL);

// let interval;

const sendData=async (data)=>{
    console.log("sendData")
    if(client.readyState === 1){
        client.send(
            JSON.stringify(data)
        );
    }
};
const ChatContext = createContext({
    val:'', 
    setVal:()=>{},
    sendValue:()=>{},
    signIn:()=>{},
});


const ChatProvider = (props) => {
    const [val, setVal] = useState("")
    console.log(props)
    const sendValue =(payload) => {
        console.log(payload)
        sendData(['sendVal',payload]);
    }
    const signIn=(payload) => {
        console.log(payload)
        sendData(['signIn',payload]);
    };
  

    
    // client.onmessage = (byteString) => {
    //     const [task, payload] = JSON.parse(byteString.data);
    //     // console.log(task);
    //     // console.log(payload);
    //     if (task !=''){
    //         clearInterval(interval);
    //         interval = setInterval(function() {
    //             client = new WebSocket(WS_URL);
    //         }, 20000);
    //     }
    //     switch (task) {
    //         case "signInStatus": {
    //             if(payload.status===true){
    //                 localStorage.setItem('id_token', 1)
    //                 setError(null);
    //                 setIsLoading(false);
    //                 userDispatch({ type: 'LOGIN_SUCCESS' })
    //                 setPerson(payload.User);
    //             }else{
    //                 setError(true);
    //                 setIsLoading(false);
    //             }
    //             break; 
    //         }
            
            
            
    //         default: break;
    //     }
    // }

    return (
        <ChatContext.Provider
            value={{
                val,
                sendValue,
                setVal,
                signIn,
            }}
            {...props}
        />
    );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat , client };
// export default ChatContext
