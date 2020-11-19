const jwt = require('jsonwebtoken');

function loginToken(payload) {
    const token = jwt.sign(payload, process.env.RAHASIA);
    return token;
}

function verifyToken(access_token){
    const decoded = jwt.verify(access_token, process.env.RAHASIA);
    return decoded;
}

module.exports = {
    loginToken, 
    verifyToken
}