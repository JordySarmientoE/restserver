const { response, request } = require('express');

const login = (req = request, res = response) => {
    const body = req.body;
    res.json({
        msg: 'Login OK',
        body
    })
};

module.exports = {
    login
}