const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const config = require('./configPorts')
const path = require('path')

const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');



const app = express();

const _dirname = path.dirname('')
const buildPath = path.join(_dirname, "../client/build")

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(authentication());
app.use(express.static(buildPath))
app.use(routes)

app.get('*'), function (req,res){
  res.sendFile(
    path.resolve(__dirname, 'client', 'build','index.html'),
    function (err){
      if(err){
        res.status(500).send(err)
      }
    }
  )
}




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


const PORT = process.env.PORT || 5000
//-----Adding middleware-------
//Always! it returns a middleware which parse the url encoded body, this will be used for every request

app.listen(PORT , () => {
  connect()
  console.log(`The server is running ...`);
});
