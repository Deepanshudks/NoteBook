const mongoose = require('mongoose');
const mongooURI = process.env.Mongo_URI;
// const mongooURI = "mongodb://localhost:27017/iNotebook";
// const mongooURI = `mongodb+srv://Deepanshudks:${process.env.MONGO_PASS}@cluster0.w0dfhud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectToMongo = async()=>{
    try {
    const conn = await  mongoose.connect(process.env.Mongo_URI)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connectToMongo;