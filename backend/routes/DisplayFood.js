const { Router } = require('express');
const router = Router();
const Food = require('../models/FoodItem');
const FoodCategory = require('../models/FoodCategory')

router.post('/post', (req, res) => {
    res.send("Hello");
})

// router.post('/foodData',async (req,res)=>{
//     try {
//         console.log([global.food_items, global.food_cat])
//         res.send([global.food_items, global.food_cat]);
//     } catch (error) {
//         res.send({ result: "No Products Found" })
//     }
// })

router.post('/getData', async (req, res) => {
    let products = await Food.find();
    if (products.length > 0) {
        let catFood = await FoodCategory.find();
        if (catFood.length > 0) {
            res.send([products,catFood]);
        }
        // console.log(products)
    } else {
        res.send({ result: "No Products Found" })
    }
});

router.get('/getFoodData', async (req, res) => {
    let products = await Food.find();
    if (products.length > 0) {
        res.send(products);
        // console.log(products)
    } else {
        res.send({ result: "No Products Found" })
    }
});
router.get('/getFoodCatData', async (req, res) => {
    let productsCat = await FoodCategory.find();
    if (productsCat.length > 0) {
        res.send(productsCat);

        // console.log(productsCat)
    } else {
        res.send({ result: "No Products Found" })
    }
});
router.post('/addFoodItem', async (req, res) => {

    const { categoryName, name, img, options, description } = req.body;
    try {
        Food.create({ categoryName: categoryName, name: name, img: img, options: options, description: description });
        res.status(200).send({ Status: "ok" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

router.post('/addFoodCategory', async (req, res) => {

    const { CategoryName } = req.body;
    try {
        FoodCategory.create({ CategoryName:CategoryName });
        res.status(200).send({ Status: "ok" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

module.exports = router;