const mongoose = require("mongoose");
const dbConfig = require("./dbconfig");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobile: { type: String },
    email: { type: String },
    role: { type: String },
    isActive: { type: Boolean, default : false },
    createdAt: { type: Date, default: new Date() },
    subscribed: { type: Boolean, default: false }
});

module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("user", userSchema);
};



