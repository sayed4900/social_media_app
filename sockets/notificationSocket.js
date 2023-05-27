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


// module.exports.notifiLikePost = (io, post, user, friends) =>{
//     io.on("connection",socket=>{
//         const message = {
//             type: 'like',
//             postId: post._id,
//             userId: user._id,
//         };
        
//         friends.forEach((friend) => {
//             io.to(friend._id).emit('notification', message);
//         });
//     })
// }

// module.exports.notifiLikePost = (io, post, userId, friends) => {
   
//     io.on("connection",socket=>{
//         socket.on("joinNotificationsRoom", id => {
//             socket.join(id);
//             console.log(`joined ${id}`)
//         });
//         console.log(`likePost: ${socket.id}`);
//         friends.forEach(friend => {
//             io.to(friend._id).emit("newLike", { post, userId, friends });
//         });
//     })
// };

module.exports.notifiLikePost = (io, post, userId, friends) => {
 
    friends.forEach((friend) => {
        io.to(friend._id).emit("newLike", { post, userId, friends });
    });
}