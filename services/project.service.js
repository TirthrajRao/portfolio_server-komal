const projectModel = require("../models/project");
const categoryModel = require("../models/category");
const hashtagModel = require("../models/hashtag");
const fileUploader = require("./fileUpload");
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

module.exports = {
    createProject: (data, file) => {
        console.log('data================>', data)
        return new Promise((resolve, reject) => {
            const newProject = new projectModel(data);
            newProject.save((err, savedProject) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('data.hashtag=============>', data.hashtag)
                    _.forEach(data.hashtag, function (tag) {
                        console.log('tag===============>', tag);
                        hashtagModel.findOneAndUpdate({ hashtag: tag }, { upsert: true, new: true })
                            .exec((err, foundTag) => {
                                if (err) {
                                    reject(err);
                                    console.log('err------------------>', err);
                                } else if (!foundTag) {
                                    console.log('foundTag===============>', foundTag);
                                    let obj = {
                                        hashtag: tag,
                                    }
                                    let hashnew = new hashtagModel(obj);
                                    hashnew.save();
                                }
                            })
                    })
                    const uploadPath = savedProject.title + "/media/"
                    return fileUploader.uploadFile(uploadPath, file).then((uploadFiles) => {
                        if (uploadFiles.length) {
                            let images = savedProject.images;
                            for (let i = 0; i < uploadFiles.length; i++) {
                                images = uploadFiles[0].fd.split('/uploads/').reverse()[0];
                            }
                            projectModel.findOneAndUpdate({ _id: savedProject._id }, { images: images }, { upsert: true, new: true }).exec((error, updated) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(updated);
                                }
                            })
                        } else {
                            resolve(savedProject);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    },

    getProjectsByCategory: () => {
        return new Promise((resolve, reject) => {
            categoryModel.aggregate([
                {
                    $lookup: {
                        from: 'projects',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'projects'
                    }
                },
                {
                    $project: {
                        name: 1,
                        projects: 1
                    }
                }
            ]).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            });
        })
    },

    getAllProjectDetails: () => {
        return new Promise((resolve, reject) => {
            projectModel.find({}).populate(['category', 'technology']).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    },

    getSingleProjectDetails: (projectId) => {
        return new Promise((resolve, reject) => {
            projectModel.findOne({
                _id: projectId
            }).populate(['category', 'technology']).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    },

    filterProjectsBySearch: (body) => {
        return new Promise((resolve, reject) => {
            console.log("body", body);
            let query = {
                $and: []
            };
            if (body.searchKey) query['$and'].push({ $or: [{ 'title': { $regex: new RegExp(body.searchKey, 'i') } }, { 'desc': { $regex: new RegExp(body.searchKey, 'i') } }] });
            if (body.technology) query['$and'].push({ 'technology._id': { '$eq': ObjectId(body.technology) } });
            if (body.category) query['$and'].push({ 'category': { '$eq': ObjectId(body.category) } });
            if(body.hashtag) query['$and'].push({'hashtag':{'$in':body.hashtag}});
            console.log("query", JSON.stringify(query, null, 2))
            projectModel.aggregate([
                {
                    $lookup: {
                        from: 'technologies',
                        localField: 'technology',
                        foreignField: '_id',
                        as: 'technology'
                    }
                },
                // {
                //     $unwind: {
                //         path: '$technology',
                //         preserveNullAndEmptyArrays: true
                //     }
                // },
                {
                    $match: query
                }
            ]).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    },

    updateProject: (data, file, projectId) => {
        console.log('req in service===========>', data, file);
        return new Promise((resolve, reject) => {
            projectModel.findOneAndUpdate({ _id: projectId }, data, { upsert: true, new: true }, function (err, updateProject) {
                if (err) {
                    reject(err);
                } else {
                    console.log('updateProject==============>', updateProject)
                    const uploadPath = updateProject.title + "/media/"
                    return fileUploader.uploadFile(uploadPath, file).then((uploadFiles) => {
                        console.log('uploadfiles=============>', uploadFiles.length, uploadFiles)
                        if (uploadFiles.length) {
                            let images = updateProject.images;
                            for (let i = 0; i < uploadFiles.length; i++) {
                                images.push(uploadFiles[i].fd.split('/uploads/').reverse()[0]);
                                console.log('image in loop================>', images)
                            }
                            console.log('images=============>', images)
                            projectModel.findOneAndUpdate({ _id: projectId }, { images: images }, { upsert: true, new: true }).exec((error, updated) => {
                                console.log("updated================>", updated)
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(updated);
                                }
                            })
                        } else {
                            resolve(updateProject);
                        }
                    }).catch((err) => {
                        reject(err);
                    });

                }
            })

        })

    },
    deleteProject: (projetcId) => {
        return new Promise((resolve, reject) => {
            projectModel.findOneAndDelete({ _id: projetcId }, function (err, project) {
                if (err) {
                    reject(err);
                } else {
                    console.log('project==========>', project);
                    resolve(project);
                }
            })
        })
    },
    createHashtag: (data) => {
        console.log("data in hashtag===============", data)
        return new Promise((resolve, reject) => {
            const newHashtag = new hashtagModel(data);
            hashtagModel.findOneAndUpdate({ hashTag: data.hashTag }, { upsert: true, new: true })
                .exec((err, foundTag) => {
                    if (err) {
                        reject({ status: 500, message: 'Internal Serevr Error' });
                        console.log('err------------------>', err);
                    } else if (!foundTag) {
                        newHashtag.save((err, tag) => {
                            if (err) {
                                reject(err);
                                console.log('err------------------>', err);
                            } else {
                                console.log('hastag=================>', tag);
                                resolve(tag);
                            }
                        })
                    } else {
                        console.log("=============foundTag=================>", foundTag);
                        resolve(foundTag);
                    }
                })

        })
    },
    getAllHashTag: () => {
        return new Promise((resolve, reject) => {
            hashtagModel.aggregate([
                { $match: {} },
                {
                    $project:
                    {
                        _id : 0 ,
                        hashtag: 1
                    }
                }
            ]).exec((err, tag) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(tag);
                    resolve(tag)
                }
            })
        })
    }
}