const User = require('../models/user')
const Marks=  require('../models/marks');

exports.getMarks= async(req, res, next) => {


        try {
            const absent= await Marks.find({...req.query});

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

exports.postMarks= async(req, res, next) => {

    try{
        const marks = await Marks.create({...req.body});            
        // update user marks
        const updatedMarks = await  User.updateOne({_id: req.body.student_id}, {$push: {marks: marks._id}});
        console.log(updatedMarks); 
        if(!updatedMarks.acknowledged){
            return res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: "success",
            data: absent
        });

    }catch(error){
            return res.status(200).json({
                    status: "success",
                    message: "Marks created successfully",
            });
        }
    } 


exports.deleteMarks = async(req, res, next) => {
        try{
            const marks = await Marks.deleteOne({_id: req.params.id});
            // update user marks
            const updatedMarks = await  User.updateOne({_id: req.body.student_id}, {$pull: {marks: req.params.id}});
            console.log(updatedMarks); 
            if(!updatedMarks.acknowledged){
                return res.status(400).json({
                    status: "error",
                    message: "User not found"
                });
            }
            return res.status(200).json({
                status: "success",
                data: marks
            });

        }catch(error){
            return res.status(404).json({
                status: "error",
                message: "No user found",
                error: error
            }); 
        }
}