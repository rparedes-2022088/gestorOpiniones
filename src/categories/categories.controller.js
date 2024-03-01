'use strict'

import Categorie from './categories.model.js'
import Opinion from '../opinions/opinion.model.js'

export const newCategorie = async(req, res)=>{
    try{
        let data = req.body
        let foundCategorie = await Categorie.findOne({name: data.name})
        if(foundCategorie) return res.send({message: 'Categorie already exists'})
        let categorie = new Categorie(data)
        await categorie.save()
        return res.send({message: 'Categorie created succesfully', categorie})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error creating categorie'})
    }
}

export const updateCategorie = async(req, res)=>{
    try{
        let data = req.body
        let { id } = req.params
        let foundCategorie = await Categorie.findOne({_id: id})
        if(!foundCategorie) return res.status(404).send({message: 'Categorie not found, not updated'})
        let updatedCategorie = await Categorie.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        return res.send({message: `Categorie ${updatedCategorie.name} updated`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating categorie'})
    }
}

export const deleteCategorie = async(req, res)=>{
    try{
        let { id } = req.params
        let foundCategorie = await Categorie.findOneAndDelete({_id: id})
        if(!foundCategorie) return res.status(404).send({message: 'Categorie not found, not deleted'})

        let defaultCategorie = await Categorie.findOne({name: 'Default categorie'})
        let opinionsDeletedCategorie = await Opinion.updateMany({categorie: foundCategorie._id},{$set: {categorie:defaultCategorie._id}})
        if(!opinionsDeletedCategorie) return res.send({message: 'No hay publicaciones en esta categoria'})
        return res.send({message: `Categorie deleted ${foundCategorie.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting categorie'})
    }
}

export const defaultCategorie = async()=>{
    try{
        const data = {
            name: 'Default categorie',
            description: 'Default categorie'
        }
        let defualtCreated = await Categorie.findOne({name: data.name})
        if(!defualtCreated){
            let categorie = new Categorie(data)
            await categorie.save()
        }
        console.log('Categorie default created previously')
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error creating categorie default'})
    }
}