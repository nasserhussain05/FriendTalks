module.exports.setFlash=function(req,res,next){
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();//very useful since it passes on to next middleware or response i.e going to browser 
}