const jwt = require('jsonwebtoken');

function loginToken(payload) {
    const token = jwt.sign(payload, "BAMBANG");
    return token;
}

function verifyToken(access_token){
    const decoded = jwt.verify(access_token, "BAMBANG");
    return decoded;
}

module.exports = {
    loginToken, 
    verifyToken
}