'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'USER'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Registered succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving user', err})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password, email } = req.body
        let user = await User.findOne({ 
            $or: [{
                username: username, estado: true
            },
            {
                email: email, estado: true
            }]
         })
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.username}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const eliminarPerfil = async(req, res)=>{
    try{
        let { id } = req.params
        let foundUser = await User.findOne({_id: id})
        if(!foundUser) return res.status(404).send({message: 'User dont exists in the database, not deleted'})
        let data = {estado: false}
        if(foundUser._id = req.user._id){
            let deletedUser = await User.findOneAndUpdate(
                {_id: id},
                data,
                {new: true}
            )
            return res.send({message: 'User deleted succesfully', deletedUser})
        }
        return res.status(401).send({message: 'You are not the deleted user'})
    }catch(err){
        console.error(err)
        return res.status(500).send('Error deleting user')
    }
}