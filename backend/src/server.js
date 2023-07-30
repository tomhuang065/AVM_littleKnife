import http from 'http'
import express from 'express'
// import mongoose from 'mongoose'
import WebSocket, {WebSocketServer} from 'ws'
// import mongo from './mongo.js'
import mysql from './mysql.js'
import wsConnect from './wsConnect.js'
import path from "path";
import Sequelize from "sequelize"


// const { Sequelize } = require('sequelize');

// mongo.connect();
// mysql.connect();
// const WebSocket = require('ws');
 
// const wss = new WebSocket.Server({
//   port: 5000
// });

const app = express()
if (process.env.NODE_ENV == "production"){
    const __dirname=path.resolve();
    console.log(__dirname);
    app.use(express.static(path.join(__dirname,"../frontend","build")));
    app.get("/*",function(req,res){
        res.sendFile(path.join(__dirname,"../frontend","build","index.html"));
    });
}
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
// const db = mongoose.connection
const PORT = process.env.PORT || 5000;
const sequelize = new Sequelize('avm_little_knife', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

  sequelize.authenticate().then(()=> {
    console.log("MySQL connected");
    // console.log('ws readystate', wss.readyState);
    wss.on('connection', (ws) => {
        console.log('ws readystate', ws.readyState);
        wsConnect.onMessage(ws,wss);
    }); 
    }).catch((error) =>{
      console.log(error);
      console.log("Error in connection")
  });

// db.once('open', () => {
//     console.log("MongoDB connected!");
    
//     wss.on('connection', (ws) => {
//         console.log('ws readystate', ws.readyState);
//         wsConnect.onMessage(ws,wss);
//     });
// });
server.listen(PORT, () => {console.log('listening at port 5000')});