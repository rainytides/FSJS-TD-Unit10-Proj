// Middleware to handle async errors
module.exports = function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
        await cb(req, res, next);
        } catch (error) {
        res.status(500).send(error);
        };
    };
    };

