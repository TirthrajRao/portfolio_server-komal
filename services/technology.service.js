const fileUploader = require("./fileUpload");
// Database model
const technologyModel = require("../models/technology");

module.exports = {
    createTechnology: (data, file) => {
        console.log('data==in service==============>', data);
        console.log('file==in service==============>', file)
        return new Promise((resolve, reject) => {
            const newTechnology = new technologyModel(data);
            newTechnology.save((err, savedTechnology) => {
                if (err) {
                    reject(err);
                } else {
                    const uploadPath =  "/technology/"
                    return fileUploader.uploadFile(uploadPath, file).then((uploadFiles) => {
                        if (uploadFiles.length) {
                            let logo = savedTechnology.logo;
                            for (let i = 0; i < uploadFiles.length; i++) {
                                logo = uploadFiles[0].fd.split('/uploads/').reverse()[0];
                            }
                            technologyModel.findOneAndUpdate({ _id: savedTechnology._id }, { logo: logo }, { upsert: true, new: true }).exec((error, updated) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(updated);
                                }
                            })
                        } else {
                            resolve(savedTechnology);
                        }
                    }).catch((err) => {
                        reject(err);
                    });

                }
            });
        });
    },

    getAllTechnologyDetails: () => {
        return new Promise((resolve, reject) => {
            technologyModel.find({}).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    },

    updateTechnology: (data, technologyId ,file) => {
        return new Promise((resolve, reject) => {
            technologyModel.findOneAndUpdate({ _id: technologyId }, data, { upsert: true, new: true }).exec((err, technology) => {
                if (err) {
                    reject(err)
                } else {
                    const uploadPath =  "/technology/"
                    return fileUploader.uploadFile(uploadPath, file).then((uploadFiles) => {
                        if (uploadFiles.length) {
                            let logo = technology.logo;
                            for (let i = 0; i < uploadFiles.length; i++) {
                                logo = uploadFiles[0].fd.split('/uploads/').reverse()[0];
                            }
                            technologyModel.findOneAndUpdate({ _id: technologyId }, { logo: logo }, { upsert: true, new: true }).exec((error, updated) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(updated);
                                }
                            })
                        } else {
                            resolve(technology);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                    // console.log('technology======>', technology);
                    // resolve(technology)
                }
            })
        })
    },

    deleteTechnology: (technologyId) => {
        return new Promise((resolve, reject) => {
            technologyModel.findOneAndDelete({ _id: technologyId }).exec((err, technology) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('technology======>', technology);
                    resolve(technology)
                }
            })
        })
    },

    getTechnologyById: (technologyId) => {
        return new Promise((resolve, reject) => {
            technologyModel.findOne({ _id: technologyId }).exec((err, technology) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('technology======>', technology);
                    resolve(technology)
                }
            })
        })
    }
}