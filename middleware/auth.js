exports.requireAuth = (req,res,next) =>{

    const token = req.cookies.jwt;

    // check json web token exists & it's verified
    if (token){
        jwt.verify(token,'Top-secret',(err, decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/index')
            }else{
                console.log(decodedToken);
                next();
            }
        }) ;
    }else{
        res.redirect('/index')
    }
}