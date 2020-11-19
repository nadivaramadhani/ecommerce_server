module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'Internel Server Error'
    // console.log(err.name)
    if(err.name === 'SequelizeValidationError'){
        status = 400;
        let errors = err.errors.map(x => {
            return x.message
        })
        msg = errors.join(', ')
    } else if (err.msg === 'Wrong Email/Password'){
        status = 401;
        msg = "Wrong Email/Password"
    } else if (err.msg === 'OUT OF STOCK'){
        status = 401;
        msg = "OUT OF STOCK"
    } else {
        status = 500;
        msg = "Internal Status Error"
    }
    res.status(status).json({ msg });
}