import mongoose from "mongoose";
/* mongoose.set('strictQuery', false); */

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/PMO');
}

export default connect
