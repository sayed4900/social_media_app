module.exports = {
    getIndex: (req, res) => {
        if(req.user){
            
            res.redirect(`/profile/${req.user._id}`);
        }else{

            res.render("index.ejs",{title:"main"});
        }
    },
};
