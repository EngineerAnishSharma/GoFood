const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://gofood:mern123@cluster0.otuonrs.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true}); 
        console.log('Mongo connected');
        const fetched_data = mongoose.connection.db.collection('food_items');
        
        await fetched_data.find({}).toArray(function (err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    } catch (error) {
        console.log("--- ", error);
        process.exit();
    }
};

module.exports = mongoDB;
