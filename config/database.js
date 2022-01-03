const config = require('dotenv');
const mongoose = require('mongoose');

// import { config } from 'dotenv';
// import mongoose from "mongoose";
config.config();

const Connect = () => {
    const uri = process.env.DATABASE;
    return mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser:true});
}

module.exports = Connect;