const User = require('../models/user')
const Absent =  require('../models/absent');

exports.getAttendence = async(req, res, next) => {
        try {
            const absent= await Absent.find({});

           return res.status(200).json({
                status: "success",
                data: absent
           }); 
        } catch (error) {
            return res.status(404).json({
                status: "error",
                message: "No user found",
                error: error
            }); 
        }
    
    }            

exports.postAttendence = async(req, res, next) => {

    const date = new Date(req.body.date);
    try{
        const absent = Absent.create({...req.body, date});            
        
        return res.status(200).json({
            status: "success",
            data: absent
        });

    }catch(error){
            return res.status(200).json({
                    status: "success",
                    message: "User created successfully",
                    user
            });
        }
    } 