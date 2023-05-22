const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
    usernameFriend:{
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});



module.exports = mongoose.model("Friend", friendSchema);
