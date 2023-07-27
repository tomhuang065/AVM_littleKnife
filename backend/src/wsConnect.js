



const sendData = (data, ws) => {
    // console.log("wsc ready",ws.readyState )
    // ws.send(JSON.stringify(data)); 
}
const sendValue =async (payload,ws) => {
    // console.log(payload)
    // console.log("111111111111")
    // sendData(['test',payload]);
    sendData(['sendBackkkkkk',{status:true,User:true}],ws);
}

export default {
    onMessage: (ws,wss) => (
        ws.onmessage =async function(byteString) {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            console.log(task);
            console.log(payload);
            switch (task) {
                case 'sendVal': {
                    sendValue(payload,ws);
                    break;
                }
            }
        }
    )
}
