const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        // here we will catch the user so that other user can't see others notes
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        // we have taken refernce here
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  module.exports=mongoose.model("notes",NotesSchema)