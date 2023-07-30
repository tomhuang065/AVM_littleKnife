import { useState,useContext,createContext } from "react";
import React from "react";
// import logging 
import {value} from "../pages/Posystem"
// import { useUserDispatch} from "./UserContext";

// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
const WS_URL=process.env.NODE_ENV==="production"?
    window.location.origin.replace(/^http/,"ws"):
    "ws://localhost:5000";
// const WS_URL="ws://localhost:4000"; 
let client=new WebSocket(WS_URL);

// let interval;

const sendData=async (data)=>{
    // console.log("sendData")
    // console.log(client)    if(client.readyState === 1){
    // client.onclose = function(e){
    //     logger.error("websocket disconnected")
    //     logger.info(e.code+" "+e.reason+" " +e.wasClean)
    // }
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
    suppliers:[],

});


const ChatProvider = (props) => {
    const [val, setVal] = useState("");
    const [suppliers, setSuppliers] = useState([]);
    
    const sendValue =(payload) => {
        console.log("context")
        // console.log(client.readyState)
        sendData(['sendVal',payload]);
    }
    const signIn=(payload) => {
        // console.log(payload)
        sendData(['signIn',payload]);
    };
  

    
    client.onmessage = (byteString) => {
        const [task, payload] = JSON.parse(byteString.data);
        // console.log(task);
        // console.log(payload);
        // if (task !=''){
        //     clearInterval(interval);
        //     interval = setInterval(function() {
        //         client = new WebSocket(WS_URL);
        //     }, 20000);
        // }
        switch (task) {
            case "getSupplier": {
                console.log("get supp")
                console.log(payload.sup)
                setVal(payload.Val);
                setSuppliers(payload.sup)
                
                break; 
            }
            
            
            
            default: 
                break;
        }
    }

    return (
        <ChatContext.Provider
            value={{
                val,
                sendValue,
                setVal,
                signIn,
                suppliers,
            }}
            {...props}
        />
    );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat , client };
// export default ChatContext
