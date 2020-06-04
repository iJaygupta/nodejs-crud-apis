const express = require("express");
const expressJoi = require('express-joi')
const app = express();
const bodyParser = require('body-parser');
let operation = require('./controller');
const Joi = expressJoi.Joi;

const checkAuth = require('./middleware')

app.use(bodyParser.json());

app.get('/api/v1/user', checkAuth , (req, res) => {
    operation.getUser(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.post('/api/v1/user', checkAuth, expressJoi.joiValidate({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    mobile: Joi.number(),
    email: Joi.string(),
}) ,(req, res) => {
    operation.addUser(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.put('/api/v1/user/:userId',checkAuth, (req, res) => {
    operation.updateUser(req).then((data) => {
        res.status(data.status).send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.delete('/api/v1/user/:userId',checkAuth, (req, res) => {
    operation.deleteUser(req).then((data) => {
        res.status(data.status).send(data);
    }).catch((error) => {
        res.status(error.status).send(error);
        
    })
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})





