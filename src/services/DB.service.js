import mongoose from 'mongoose';


export default class DBService {

  connect() {
    // Connect to mongodb
    try {
      mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true },
        // { useUnifiedTopology: true }
      );
    } catch (e) {
      console.log(e);
    }
    mongoose.Promise = global.Promise;

    const db = mongoose.connection;
    db.on('error', err => {
      console.log('MongoDB connection error: ', err);
    });
  }
}
