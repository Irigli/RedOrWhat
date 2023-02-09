const userControllers = require('../controllers/user.controllers')

module.exports = (app) => {
    app.post("/api/user/register", userControllers.registerUser);
    app.post("/api/user/login", userControllers.loginUser);
    app.post("/api/user/logout", userControllers.logoutUser);
}