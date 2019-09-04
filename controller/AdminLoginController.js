const projectService = require("../services/project.service");
module.exports = {
    login:(req,res)=>{
        return projectService.login(req.body).then((data,token) => {
            console.log('data==on line 5========>',data,token)
			res.status(200).json({
				code: 200,
				message: "login succesfull",
                data: data,
                token:token
			})
		}).catch((err) =>{ 
			console.log("on line 36 >>>>>>>>>>>>", err);
			res.status(err.status ? err.status : 500).json({
				message: err.message ? err.message : 'internal server error' 
			});
		})
    },
    addAdmin:(req,res)=>{
        console.log('req.body===========>',req.body)
        return projectService.addAdmin(req.body).then((data)=>{
            res.status(200).json({
				code: 200,
				message: "Add Admin succesfull",
				data: data
			})
		}).catch((err) =>{ 
			console.log("on line 36 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
        })
    }
}