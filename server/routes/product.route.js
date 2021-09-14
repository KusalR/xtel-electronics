const router= require("express").Router();
const product = require('../models/product');

//product route
//Post,Get,Delete,Update,filter

router.route('/').get(function(req, res) {
    product.find(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    product.findById(id, function(err, product) {
        res.json(product);
    });
})
router.route('/update/:id').post(function(req, res) {
    product.findById(req.params.id, function(err, products) {
        if (!products)
            res.status(404).send("data is not found");
        else

        products.name = req.body.name;
        products.url = req.body.url;
        products.productCategory = req.body.productCategory;
        products.description = req.body.description;
        products.quantity = req.body.quantity;
        products.user_id = req.body.user_id;

        products.save().then(products => {
            res.json('user updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/add').post(function(req, res) {
    let products = new product(req.body);
    products.save()
        .then(product => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});


router.route('/delete/:id').get(function (req, res) {
    product.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


router.get("/catProduct/product_by_id", (req, res) => {
    let type = req.query.type;
    let categoryIds = req.query.id;

    console.log(categoryIds)
    if (type === "array") {
        let ids = req.query.id.split(',');
        categoryIds = [];
        categoryIds = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    product.find({ 'productCategory': { $in: categoryIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});

module.exports = router;
