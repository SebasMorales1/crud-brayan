const mongoose = require("mongoose")
const DBconnection = async ()=>{
    try {
        mongoose.connect ("mongodb://localhost:27017/crud")
        console.log("conected a database");
    } catch (error) {
        console.log("disconected a database");
    }
}

module.exports = DBconnection