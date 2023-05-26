// module.exports =  (io)=>{
//     io.on("connection",socket=>{
//         io.emit("newPostNotification",{post,userId,friends});
//     })
// }

module.exports.notifiNewPost= (io,post,userId,friends)=>{
    io.on("connection",socket=>{
        io.emit("newPostNotification",{post,userId,friends});
    })
}

module.exports.notifiLikePost = (io, post, userId, friends) => {
    friends.forEach(friendId => {
        io.to(friendId).emit("newLike", { post, userId, friends });
    });
};