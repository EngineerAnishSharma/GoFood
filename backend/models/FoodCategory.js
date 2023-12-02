const mongoose=require('mongoose');
const { Schema } = mongoose;

const FoodCatSchema =new Schema({
    CategoryName:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('foodcategories',FoodCatSchema)