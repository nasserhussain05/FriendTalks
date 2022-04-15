const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');//exec

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}



// const Post=require('../models/post');
// const Comment=require('../models/comment');

// module.exports.create=async function(req,res){
//     try {
//        let post= await Post.create({
//             content:req.body.content,
//             user:req.user._id
//         });
//         if(req.xhr){
//             return res.status(200).json({
//                 data:{
//                     post:post
//                 },
//                 message:'POST CREATED!'
//             });
//         }
//         req.flash('success','Post published!');
//         return res.redirect('back');   
//     } catch (error) {
//         req.flash('error',err);
//         return res.redirect('back'); 
//     }
// }

// module.exports.destroy =async function(req, res){
//     try {
//         let post=await Post.findById(req.params.id);
//     // .id means converting the object id into string
//     if (post.user == req.user.id){
//         post.remove();

//         await Comment.deleteMany({post: req.params.id});
//         if(req.xhr){
//             return res.status(200).json({
//                 data:{
//                     post_id:eq.params.id
//                 },
//                 message:"post deleted successfully"
//             })
//         }

//         req.flash('success','Post and comments are deleted successfully');
//         return res.redirect('back');
//     }else{
//         req.flash('error','You cannot delete that post');
//         return res.redirect('back');
//     }

//     } catch (err) {
//         req.flash('error',err);
//         return res.redirect('back'); 
//     }
// }