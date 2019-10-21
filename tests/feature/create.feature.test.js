import chai from 'chai';

import TrackRoute from '../lib/routes/track';
import Db from "../lib/db";

import TrackModel from '../../src/models/Track.model';

const expect = chai.expect;

describe('POST / Create - insert parsed data into database', () => {

  let response, statusCode;
  // Before running the tests, send a request to the endpoint.
  before(function(done) {
    // Connect to mongodb
    Db.connection();

    TrackRoute.create()
      .then((body) => {
        statusCode = 200;
        response = body;
        done();
      })
      .catch((error) => {
        statusCode = 500;
        response = error;
        done();
      });
  });

  it('should expect a 200 status code', (done) => {
    expect(statusCode).to.eql(200);
    done();
  });

  it('should return a message', (done) => {
    expect(response.message).to.equal('2 valid tracks created');
    done();
  });

  it('should return an array of errors', (done) => {
    expect(response.errors.length > 0).to.equal(true);
    done();
  });

  it('errors should define the line number, and the issue that requires fixing', (done) => {
    const errors = response.errors;
    expect(errors[0]).to.equal('Line 2 - Contract - Contract 2 - has no association found in database');
    expect(errors[1]).to.equal('Line 4 - Track title cannot be blank!');
    expect(errors[2]).to.equal('Line 4 - Track ISRC cannot be blank!');
    done();
  });


  it('should check that data exists in database', (done) => {

    Promise.all([
      TrackRoute.search( { title: 'Track 1'} ),
      TrackRoute.search( { title: 'Track 3'} )
    ])
      .then((promiseAllResults) => {

        expect(promiseAllResults[0][0].title).to.equal('Track 1');
        expect(promiseAllResults[1][0].title).to.equal('Track 3');
        done();
      })
      .catch((error) => {
        console.log(error);
        done();
      });
  });

  after((done) => {
    Promise.all([
      TrackRoute.delete( { title: 'Track 1'} ),
      TrackRoute.delete( { title: 'Track 3'} )
    ])
      .then(() => done())
      .catch((error) => {
        console.log(error);
        done();
      });
  })

});
