/*

Middleware cho Phòng Khảo Thí

*/

const verifyToken = require('./verifyToken');

const Department1Middleware = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user.role_symbol);
        if (req.user.role_symbol === '1' || req.user.role_symbol === '4' || req.user.role_symbol === '3' || req.user.id === req.params.id) {
            next();
        } else {
            res.status(200).json({ code: 403, message: 'You are not allow to access this page' });
        }
    });
};

module.exports = Department1Middleware;
