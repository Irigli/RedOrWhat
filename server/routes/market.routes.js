const MarketControllers = require('../controllers/market.controllers');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/redorwhat', MarketControllers.findAllWines);
    app.get('/api/redorwhat/:id', MarketControllers.findOneWine);
    app.post('/api/redorwhat',authenticate, MarketControllers.createWine);
    app.put('/api/redorwhat/:id',authenticate, MarketControllers.updateWine);
    app.delete('/api/redorwhat/:id',authenticate,  MarketControllers.deleteWine);
}