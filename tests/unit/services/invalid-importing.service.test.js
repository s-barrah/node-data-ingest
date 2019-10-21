import chai from 'chai';

import FileImporterService from '../../../src/services/FileParser.service';

const expect = chai.expect;

const filePath = `${__dirname}/../../mocks/invalid-test.xlsx`;

describe('Invalid File importing', () => {

  let response;
  const fileImporterService = new FileImporterService(filePath);

  before(function (done) {
    fileImporterService
      .parser()
      .then((data) => {
        response = data;
        done();
      })
      .catch((error) => {
        console.log('Error: ', error);
        done();
      });
  });

  it('should return an empty results array', (done) => {
    expect(response.results.length === 0).to.equal(true);
    done();
  });

  it('should return an array of errors', (done) => {
    expect(response.errors.length > 0).to.equal(true);
    done();
  });

  it('errors should define the line number, and the issue that requires fixing', (done) => {
    const errors = response.errors;
    expect(errors[0]).to.equal('Line 1 - Contract - Contract 11 - has no association found in database');
    expect(errors[1]).to.equal('Line 2 - Contract - Contract 21 - has no association found in database');
    done();
  });
});


