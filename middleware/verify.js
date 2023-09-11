const privateKey = process.env.privateKey;
const jwt = require('jsonwebtoken');
function verify(req, res, cb) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, privateKey, { algorithm: 'HS384' }, function (err, decoded) {
            if (err) {
                res.status(400).json("Invalid Token");
            } else {
                req.body.user = decoded.user;
                cb();
            }
        });
    } else {
        res.status(401).json("Enter a token");
    }
}

module.exports = verify;