import express from 'express' ;
import mongoose from 'mongoose' ;

import cookieParser from 'cookie-parser' ;
import userRoutes from './routes/user.route.js'
import cors from "cors"




mongoose.connect('mongodb://127.0.0.1:27017/authentication', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDb is connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
const app = express() ; 
app.use(cors()); // Allow requests from all origins (for testing)

  
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/user', userRoutes);
  
 


app.listen(3001 , () => {
    console.log("server is running on port 3001");
})