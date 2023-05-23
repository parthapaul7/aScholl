const User = require('../models/user')
const Absent =  require('../models/absent');

exports.getAttendance = async(req, res, next) => {
        if(req.query.date){
            const date = new Date(req.query.date);
            req.query.date = date;
        }

        console.log(req.query);
        try {

            let absent= await Absent.find({...req.query})

            absent = absent.map((absent) => {
                return {
                    ...absent._doc,
                    string_date: absent.date.toISOString().split("T")[0]
                }
            })
           return res.status(200).json({
                status: "success",
                data: absent
           }); 
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "No user found",
                error: error.message
            }); 
        }
    
    }            

exports.postAttendance = async(req, res, next) => {

    // check req.body.date is valid date or not
    if(!Date.parse(req.body.date)){
        return res.status(400).json({
            status: "error",
            message: "Invalid date"
        });
    } 

    const date = new Date(req.body.date);

    try{

        const absent = await  Absent.create({...req.body, date});            

        // update the user
        const userUpdate = await User.updateOne({_id: req.body.student_id}, {$push: {absent: absent._id}});

        if(!userUpdate.acknowledged){
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
            return res.status(500).json({
                    status: "error",
                    message: "User not created ",
                    error : error.message
            });
        }
    } 

    exports.deleteAttendance = async(req, res, next) => {
        try{
            const marks = await Absent.deleteOne({_id: req.params.id});
            // update user marks

            const updateUser = await User.updateOne({_id: req.body.student_id}, {$pull: {absent: req.params.id}}); 

            if(!updateUser.acknowledged){
                return res.status(400).json({
                    status: "error",
                    message: "User not found"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Marks deleted successfully"
            });
        }catch(error){
            return res.status(404).json({
                status: "error",
                message: "Marks not found",
                error: error.message
            });
        }
    }