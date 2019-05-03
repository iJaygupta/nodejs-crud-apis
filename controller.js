let User = require("./user.js");

module.exports.addUser = function (req) {
    return new Promise((resolve, reject) => {
        User.getModel().insertMany(req.body).then((res) => {
            resolve({
                status: 200,
                message: "User Successfully Added"
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
    return new Promise((resolve, reject) => {
        User.getModel().find().then((res) => {
            resolve({
                status: 200,
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
        User.getModel().updateOne(
            { _id: req.query.id },
            { $set: req.body }
        ).then((res) => {
            resolve({
                status: 200,
                message: "User Successfully Updated"
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
        User.getModel().deleteMany({ "_id": req.query.id }).then((res) => {
            resolve({
                status: 200,
                message: "User Successfully Deleted"
            })
        }).catch((err) => {
            reject({
                status: 500,
                message: "Error while Deleting"
            })
        })
    })
}

module.exports.getFilteredUser = function (req) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        User.getModel().aggregate(
            [
                {
                    $match: {
                        createdAt: {
                            $gte: "2018-04-26T07:14:10.164Z",
                            $lte: new Date()
                        }
                    }
                }
            ]
        ).then((res) => {
            resolve({
                status: 200,
                data: res
            })
        }).catch((err) => {
            reject({
                status: 500,
                message: "Error while fetching user"
            });
        })
    })

}