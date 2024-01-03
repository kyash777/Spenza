import mongoose from "mongoose";

const eventSchema=mongoose.Schema({
    event:String,
    triggerTime:{
        type:Date,
        default:Date.now
    }
})

const Event=mongoose.model("Event",eventSchema)

export default Event