/*jshint esversion: 6 */
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({'message': 'Access Denied: No token provided'});

    try {
        const decoded  = jwt.verify(token, config.get('authJWTPrivateKey'));
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send({ error });
    }
}