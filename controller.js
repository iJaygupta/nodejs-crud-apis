let User = require("./user.js");
const { ObjectID }  = require('mongodb')

module.exports.addUser = function (req) {
    return new Promise((resolve, reject) => {
        User.getModel().insertMany(req.body).then((res) => {
            resolve({
                status: 200,
                message: "User Successfully Added",
                data  : res[0]
            });
        }).catch((err) => {
            reject({
                status: 500,
                message: "Error while Adding User"
            });
        })
    })
}

module.exports.getUser = function (req) {
    let searchKeyword = req.query.searchKeyword;
    let populate= {};
    if (searchKeyword) {
        populate["firstName"] = { "$regex": new RegExp(searchKeyword) }
        // populate["firstName"] = `/${searchKeyword}/`

    }
    console.log("searchKeyword ==>>", searchKeyword)    
    return new Promise((resolve, reject) => {
        User.getModel().find(populate).then((res) => {            
            resolve({
                status: 200,
                message: "Get User List Successfully",
                data: res
            });
        }).catch((err) => {
            reject({
                status: 500,
                message: "Error while Fetching User"
            });
        })
    })
}

module.exports.updateUser = function (req) {
    return new Promise((resolve, reject) => {
        if(!ObjectID.isValid(req.params.userId)){
            return reject({
                status: 422,
                message: "Invalid Identifier"
            })
        }
        
        User.getModel().findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new : req}
        ).then((res) => {       
            if(res == null){
                return resolve({
                    status : 404,
                    message:"User Not Found"
                })
            }     
            resolve({
                status: 200,
                message: "User Successfully Updated",
                data : res
            })
        }).catch((err) => {
            console.log(err);
            reject({
                status: 500,
                message: "Error in Updating User"
            })
        })
    })
}

module.exports.deleteUser = function (req) {
    return new Promise((resolve, reject) => {
        if(!ObjectID.isValid(req.params.userId)){
            return reject({
                status: 422,
                message: "Invalid Identifier"
            })
        }
        User.getModel().findByIdAndDelete({ _id : req.params.userId })
        .then((res) => {
            if(res == null){
               return resolve({
                    status: 404,
                    message: "User Not Found",
                })
            }
            resolve({
                status: 200,
                message: "User Successfully Deleted",
                data : res
            })
        }).catch((err) => {
            reject({
                status: 500,
                message: "Error while Deleting"
            })
        })
    })
}

