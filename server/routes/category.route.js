const router= require("express").Router();
const category = require('../models/category');

//Category route
//Post,get,delete,update

router.route('/').get(function(req, res) {
    category.find(function(err, categories) {
        if (err) {
            console.log(err);
        } else {
            res.json(categories);
        }
    });
});

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    category.findById(id, function(err, category) {
        res.json(category);
    });
})
router.route('/update/:id').post(function(req, res) {
    category.findById(req.params.id, function(err, category) {
        if (!category)
            res.status(404).send("data is not found");
        else
            category.category = req.body.category;
            category.categoryImage = req.body.categoryImage;

        category.save().then(category => {
            res.json('category updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.route('/add').post(function(req, res) {
    let Category = new category(req.body);
    Category.save()
        .then(doctor => {
            res.status(200).json({'category': 'category added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new category failed');
        });
});


router.route('/delete/:id').get(function (req, res) {
    category.findByIdAndRemove({_id: req.params.id}, function(err, category){
        if(err) res.json(err);
        else res.json('category Successfully removed');
    });
});

module.exports = router;
