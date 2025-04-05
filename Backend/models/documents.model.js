import { mongoose } from "mongoose";

const documentModel =  new mongoose.Schema({
    data:String,
    type:String
})

const Document  = mongoose.model('documnetModel', documentModel)

export {Document}