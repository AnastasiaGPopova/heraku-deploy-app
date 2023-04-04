const express = require('express');
const cors = require('cors');
const http = require('http')
const mongoose = require('mongoose');
// const config = require('./configPorts')
const path = require('path')
const Server = require('socket.io').Server
const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');



const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin:'*'
  }
})

// const _dirname = path.dirname('')
// const buildPath = path.join(_dirname, "/client/build")

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(authentication());
// app.use(express.static(buildPath));

app.use(routes)






mongoose.set('strictQuery', false);
const connect = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://newAniUser:AniTest@cluster0.vn3iex9.mongodb.net/recordme?retryWrites=true&w=majority",{}
    );
    console.log(`Connected to MongoDB`)
  } catch (error) {
    throw error;
  }
};


const port = process.env.PORT || 3030
//-----Adding middleware-------
//Always! it returns a middleware which parse the url encoded body, this will be used for every request

server.listen(port , () => {
  connect()
  console.log(`The server is running  ${port}...`);
});
