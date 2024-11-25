const mongoose = require("mongoose");

const initializeDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            `Successfully connected to the database: ${connection.connection.host} (${connection.connection.name})`
        );
    } catch (error) {
        console.error("Error establishing database connection:", error.message);
        process.exit(1); // Exit process with a failure code
    }
};

module.exports = initializeDatabase;
