const RedOreWhat = require('../models/market.models');

module.exports.findAllWines = (req, res) => {
    RedOreWhat.find({})
    .then(findAllProducts => {
        console.log(findAllProducts);
        res.json(findAllProducts);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
}
module.exports.findOneWine = (req, res) => {
    RedOreWhat.findOne({_id: req.params.id})
    .then(oneProduct => {
        console.log(oneProduct);
        res.json(oneProduct);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
}
module.exports.createWine = (req, res) => {
    RedOreWhat.create(req.body)
    .then(product => {
        console.log(product);
        res.json(product);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}
module.exports.updateWine = (req, res) => {
    RedOreWhat.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
    .then(updatedProduct => {
        console.log(updatedProduct);
        res.json(updatedProduct);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
}
module.exports.deleteWine = (req, res) => {
    RedOreWhat.findOneAndDelete({_id: req.params.id})
    .then(confirmDelete => {
        console.log(confirmDelete);
        res.json(confirmDelete);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
}