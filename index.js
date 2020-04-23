const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());


const subs = []


//browser understand the content type and parse it 
app.get('/messages', (req, res) => {
    subs.push(res);
    res.writeHead(200, {
        'Content-Type': 'text/event-stream'
    })
});


app.post('/messages' ,( req , res )=>{
    const { body } = req;
    //to write on the stream and will not close the stream 
    subs.forEach((s)  => s.write(`data: ${JSON.stringify(body)}\n\n`));
    res.status(204).end();

})


app.listen(4000, () => {
    console.info('server listing on port 4000');
});