const mongoose=require('mongoose');
const { Schema } = mongoose;

const FoodSchema= new Schema({
    categoryName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img: {
        type: String,
    },
    options:{
        type:Array,
        required:false
    },
    description:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('food_items',FoodSchema);