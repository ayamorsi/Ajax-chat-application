const express = require('express');
const cors = require('cors');
const http =require('http');


const app = express();


app.use(cors())
app.use(express.json());
const server = http.createServer(app);

const io =require('socket.io')(server)
io.on('connection' ,(client) =>{
    console.log("new client")
    client.on(('message') , (data)=>{
        console.log(data)
        io.emit('new-message' , data)
    })
})   


app.listen(4000, () => {
    console.info('server listing on port 4000');
});
