import { useState,useContext,createContext } from "react";
import React from "react";
import axios from 'axios';


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
    if(client.readyState === 1){
        client.send(
            JSON.stringify(data)
        );
    }
};
const ChatContext = createContext({
    val:'', 
    stat:'',
    accColumns:[],
    task:'',
    accLink:'',
    setVal:()=>{},
    setStat:()=>{},
    setTask:()=>{},
    sendValue:()=>{},
    accountDownload:()=>{},
    handleAccountDownload:()=>{},
    signIn:()=>{},
    suppliers:[],
});

const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});

const ChatProvider = (props) => {
    const [val, setVal] = useState("");
    const [suppliers, setSuppliers] = useState([]);
    const [accLink, setAccLink] = useState("");
    const [ accRows, setAccRows] = useState([]);
    const [ accColumns, setAccColumns] = useState([]);

    const [task, setTask] = useState("");
    const [stat, setStat] = useState(null);


    
    const sendValue =(payload) => {
        
        console.log("context")
        // console.log(client.readyState)
        sendData(['sendVal',payload]);
    }
    const accountDownload =() => {
        console.log("accountDownload")
        const payload = "";
        sendData(['accountDownload',payload]);
    }
    const signIn=(payload) => {
        // console.log(payload)
        sendData(['signIn',payload]);
    };
    const handleAccountDownload = async(payload) =>{
        const{data:{buffer}} = await instance.post('/accountdownload')
        
    }
    // Define the function to send data to the server
  

    
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
            case "getAccountDownload": {
                console.log(payload)
                // setAccRows(payload.rows)
                // setAccColumns(payload.columns)
                setAccLink(payload.link)
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
                task,
                setTask,
                stat,
                setStat,
                sendValue,
                setVal,
                signIn,
                accountDownload,
                handleAccountDownload,
                accRows,
                accColumns,
                accLink,
                //implement more functions here
                suppliers,
            }}
            {...props}
        />
    );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat , client };
// export default ChatContext
