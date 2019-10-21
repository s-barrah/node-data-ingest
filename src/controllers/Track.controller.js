
import TrackModel from '../models/Track.model';
import FileParserService from '../services/FileParser.service';


const filePath = `${__dirname}/../../tests/mocks/valid-test.xlsx`;


export default class TrackController {

  import(req, res) {
    const fileParserService = new FileParserService(filePath);
    fileParserService
      .parser()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log('Error: ', error);
        res.send(error);
      });

  }

  /**
   * Create function
   * @param req
   * @param res
   * @param next
   */
  create(req, res, next) {
    const fileParserService = new FileParserService(filePath);
    fileParserService
      .parser()
      .then((data) => {
        const results = data.results;
        TrackModel.insertMany(results)
          .then((docs) => {
            res.send({
              message: `${docs.length} valid tracks created`,
              errors: data.errors,
            });
          })
          .catch((InsertError) => {
            console.log('Track Insert Error: ', InsertError);
            next();
          });
      })
      .catch((ImporterError) => {
        console.log('ImporterError: ', ImporterError);
        res.send(error);
      });
  }



  /**
   * Query database track function
   * @param req
   * @param res
   * @param next
   */
  search(req, res, next) {

    const query = TrackController.getQueryParams(req);

    TrackModel.find(query).lean()
      .then((results) => {
        console.log('results: ', results);
        if (results && results.length > 0) {
          res.send(results);
        }
        res.send('No match found!');
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }

  static getQueryParams(req) {
    const query = {};
    if (req.body.title) {
      query.title = req.body.title;
    }
    if (req.body.artist) {
      query.artist = req.body.artist;
    }
    if (req.body.version) {
      query.version = req.body.version;
    }
    if (req.body.isrc) {
      query.isrc = req.body.isrc;
    }
    return query;
  }

  /**
   * Update track function
   * @param req
   * @param res
   */
  update(req, res) {

  }

  /**
   * Delete track function
   * @param req
   * @param res
   * @param next
   */
  delete(req, res, next) {

    const query = TrackController.getQueryParams(req);

    TrackModel.deleteMany(query).lean()
      .then(() => {
        res.send('Delete complete');
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }

}
