module.exports = function (req, res, next) {
    // req.user from authorization
    if (!req.user.isActive) return res.status(403).send({'message': 'Access Denied'});
    next();
}