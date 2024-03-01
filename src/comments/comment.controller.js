'use strict'

import Comment from './comment.model.js'

export const newComment = async(req, res)=>{
    try{
        let data = req.body
        data.user = req.user._id
        let comment = new Comment(data)
        await comment.save()
        return res.send({message: 'Commented succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error commenting the publication'})
    }
}

export const updateComment = async(req, res)=>{
    try{
        let data = req.body
        let { id } = req.params
        data.user = req.user._id
        if(data.opinion) return res.status(401).send({message: 'Cannot update the opinion of the comment'})
        let foundedComment = await Comment.findOne({_id: id})
        if(!foundedComment) return res.status(404).send({message: 'Comment not founded, not updated'})
        if(foundedComment.user = req.user._id){
            let updatedComment = await Comment.findOneAndUpdate(
                {_id: id},
                data,
                {new: true}
            )
            return res.send({message: `Comment updated ${updatedComment.content}`})
        }
        return res.status(401).send({message: 'Cannot update a comment that is not yours'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating comment'})
    }
}

export const deleteComment = async(req, res)=>{
    try{
        let { id } = req.params
        let foundedComment = await Comment.findOne({_id: id})
        if(!foundedComment) return res.status(404).send({message: 'Comment do not exists, not deleted'})
        if(foundedComment.user = req.user._id){
            let deletedComment = await Comment.findOneAndDelete({_id: id})
            return res.send({message: `Comment ${deletedComment.content} deleted`})
        }
        return res.status(401).send({message: 'Cannot deleted a comment that is not yours'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting comment'})
    }
}