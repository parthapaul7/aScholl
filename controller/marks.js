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

exports.getMarksById= async(req, res, next) => {
        try {
            const absent= await Marks.findOne({_id: req.params.id});
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


exports.updateMarks= async(req, res, next) => {
        try {
            const absent= await Marks.updateOne({_id: req.params.id}, {...req.body});
            return res.status(200).json({
                status: "success",
                data: absent
            });
        } catch (error) {
            return res.status(404).json({
                status: "error",
                error: error.message
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

exports.getUserMarks = async(req, res, next) => {
    try {
        // console.log(req.cookies);
        const user = await User.findOne({_id: req.params.id});
        console.log(user);
        // const marks = await Marks.find({student_id: req.params.id});
        if(user.role === "Student"){
           const marks = await Marks.find({student_id: user._id}); 
            
           console.log(marks);
            // seperate marks for all type of exams and use subject as the key
            let marksObj = {};
            marks.forEach((mark) => {
                console.log(marksObj[mark.exam]);

                if(!marksObj[mark.exam]){
                    let obj= {}; 
                    obj= {
                        [mark.subject]: mark.marks,
                    }; 
                    marksObj = {
                        ...marksObj,
                        [mark.exam]:obj 
                    };
                }
                else{
                    let obj= marksObj[mark.exam];
                    obj = {
                        ...obj,
                        [mark.subject]: mark.marks,
                    } 
                    marksObj = {
                        ...marksObj,
                        [mark.exam]:obj 
                    };
                }
            });

            return res.status(200).json({
                status: "success",
                data: marksObj 
            });
        }

        return res.status(200).json({
            status: "success",
            data: "User is not a sudent use marks route to get marks for all students" 
        }); 
    } catch (error) {
       return res.status(404).json({
            status: "error",
            message: "No user found",
            error: error.message
        });
    }

}