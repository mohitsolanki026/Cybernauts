const mongoose = require("mongoose");
require("dotenv").config(); 

module.exports = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        const connect = await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }


    // mongoose.connect(mongoUri, { useUnifiedTopology: true }).then(() => {
    //     console.log('success');
    // }).catch(e => {
    //     console.error(e);
    //     process.exit(1);
    // });
};
// "mongodb+srv://mohit2340:HywcBxTJ79Pz9v3s@cluster1.baq2vvx.mongodb.net/?retryWrites=true&w=majority";
      // "mongodb+srv://mohit2340:HywcBxTJ79Pz9v3s@cluster0.pnpylei.mongodb.net/?retryWrites=true&w=munX3QocgvTaW45hjajority";
     
