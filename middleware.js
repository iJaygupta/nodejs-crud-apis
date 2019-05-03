module.exports = (req, res, next) => {
    if (req.headers.authorization == "Basic YWRtaW46cjNAY3RpMG4=") {
        console.log("middleware example");
        next();
    } else {
        return res.status(401).json({ 'msg': 'You are not authorized', 'result': "0" });
    }

}