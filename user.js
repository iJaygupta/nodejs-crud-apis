const mongoose = require("mongoose");
const dbConfig = require("./dbconfig");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    fullName: { type: String, required: true },
    role: { type: String },
    email: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    company: { type: String },
    subscribed: { type: Boolean, required: true, default: false }
});

module.exports.getModel = function () {
    let connection = dbConfig.connect();
    return connection.model("user", userSchema);
};



