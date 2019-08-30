// Database model
const technologyModel = require("../models/technology");

module.exports = {
    createTechnology: (data) => {
        return new Promise((resolve, reject) => {
            const newTechnology = new technologyModel(data);
            newTechnology.save((err, savedTechnology) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(savedTechnology);
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

    updateTechnology: (data, technologyId) => {
        return new Promise((resolve, reject) => {
            technologyModel.findOneAndUpdate({ _id: technologyId }, data, { upsert: true, new: true }).exec((err, technology) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('technology======>', technology);
                    resolve(technology)
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

    getTechnologyById:(technologyId) =>{
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