const fs = require("fs");

function logsMiddleware(req, res, next) {
    fs.appendFileSync("logs.txt", req.url + "\n");
    next();
}

module.exports = logsMiddleware;
