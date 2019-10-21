import mongoose from "mongoose";

let db;

export default class DB {

  constructor() {
    this.db = null;
  }

  static connect(done) {
    // Connect to mongodb
    try {
      mongoose.connect(
        process.env.MONGODB_URI_TEST,
        { useNewUrlParser: true },
        // { useUnifiedTopology: true }
      );
    } catch (e) {
      console.log(e);
    }
    mongoose.Promise = global.Promise;
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => done() );
  }

  static connection(done) {
    // Connect to mongodb
    try {
      mongoose.connect(
        process.env.MONGODB_URI_TEST,
        { useNewUrlParser: true },
        // { useUnifiedTopology: true }
      );
    } catch (e) {
      console.log(e);
    }
    mongoose.Promise = global.Promise;
    db = mongoose.connection;
    db.on('error', err => {
      console.log('MongoDB connection error: ', err);
    });
  }

  static close(done) {
    db.close();
    done();
  }


  static disconnect(done) {
    db.disconnect();
    done();
  }
}
