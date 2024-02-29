'use strict'

import User from '../user/user.model.js'
import Opinion from './opinion.model.js'
import Comment from '../comments/comment.model.js'

export const newOpinion = async(req, res)=>{
    try{
        let data = req.body
        data.user = req.user._id
        let opinion = new Opinion(data)
        await opinion.save()
        return res.send({message: 'Publication upload succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error publishing'})
    }
}

export const updateOpinion = async(req, res)=>{
    try{
        let data = req.body
        data.user = req.user._id
        let { id } = req.params
        let foundedOpinion = await Opinion.findOne({_id: id})
        if(!foundedOpinion) return res.status(404).send({message: 'Opinion not found, not updated'})
        if(foundedOpinion.user = req.user._id){
            let opinionUpdated = await Opinion.findOneAndUpdate(
                {_id: id},
                data,
                {new: true}
            )
            return res.send({message: 'Publication updated', opinionUpdated})
        }
        if(!opinionUpdated) return res.status(401).send({message: 'You are not the owner of the publication'})
        return res.send({message: 'Opinion updated'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating opinion'})
    }
}

export const deleteOpinion = async(req, res)=>{
    try{
        let { id } = req.params
        let foundedOpinion = await Opinion.findOne({_id: id})
        if(!foundedOpinion) return res.status(404).send({message: 'The opinion do not exists, not deleted'})
        if(foundedOpinion.user = req.user._id){
            await Comment.deleteMany({opinion: id})
            let deletedOpinion = await Opinion.findOneAndDelete({_id: id})
            return res.send({message: `Opinion ${deletedOpinion.title} succesfully`})
        }
        return res.status(401).send({message: 'You can not delete a post that is not yours'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting opinion'})
    }
}