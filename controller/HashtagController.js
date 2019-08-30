const projectService = require("../services/project.service");

module.exports = {
    createHashtag: (req, res) => {
        console.log("body in controller", req.body);
        return projectService.createHashtag(req.body).then((data) => {
            res.status(201).json({
                code: 201,
                message: "hashTag created",
                data:data
            });
        }).catch((err) => {
            console.log("on line 12 >>>>>>>>>>>>", err);
            res.status(500).json({
                code: 500,
                message: "Internal server error"
            });
        })
    },
    getAllHashTag:(req,res)=>{
        console.log("body in controller", req.body);
        return projectService.getAllHashTag(req.body).then((data) => {
            res.status(201).json({
                code: 200,
                message: "got the data",
                data:data
            });
        }).catch((err) => {
            console.log("on line 12 >>>>>>>>>>>>", err);
            res.status(500).json({
                code: 500,
                message: "Internal server error"
            });
        })
    }
};
