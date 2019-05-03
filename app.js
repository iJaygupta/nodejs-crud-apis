const express = require("express");
const app = express();
const bodyParser = require('body-parser');
let operation = require('./controller');

const checkAuth = require('./middleware')

app.use(bodyParser.json());

app.get('/get-route', checkAuth , (req, res) => {
    operation.getUser(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.post('/post-route',checkAuth, (req, res) => {
    operation.addUser(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.put('/put-route',checkAuth, (req, res) => {
    operation.updateUser(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.delete('/delete-route',checkAuth, (req, res) => {
    operation.deleteUser(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.post('/get-filter-route',checkAuth, (req, res) => {
    operation.getFilteredUser(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})





