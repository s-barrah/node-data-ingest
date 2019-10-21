import chai from 'chai';

import TrackRoute from '../lib/routes/track';

const expect = chai.expect;

describe('GET / Import - returns parsed data from file', () => {

  let response, statusCode;
  // Before running the tests, send a request to the endpoint.
  before(function(done) {

    TrackRoute.import()
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

  it('should return only 2 valid results', (done) => {
    expect(response.results.length === 2).to.equal(true);
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


});
