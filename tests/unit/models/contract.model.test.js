import chai from 'chai';
import faker from 'faker';

import ContractModel from '../../../src/models/Contract.model';
import Db from '../../lib/db';

const expect = chai.expect;

describe('models/Contract.model', () => {

  // Before running the tests, send a request to the endpoint.
  before(function(done){
    // Connect to mongodb
    Db.connect(done);
  });

  describe('Valid Contract create', () => {

   /* const randomText = faker.lorem.word;
    const mock = { name: randomText };

    const contract = new ContractModel(mock);
    let created = false, statusCode;
    contract.save();

    it('should save contract to database', (done) => {
      ContractModel.find(mock)
        // .then(() => ContractModel.find(mock))
        .then((contracts) => {
          expect(contracts.length > 0).to.equal(true);
        });
      done();
    });*/
/*
    it('removes a contract using its instance', (done) => {
      contract.remove()
        .then(() => ContractModel.findOne(mock))
        .then((results) => {
          expect(results).to.equal(null);
          done();
        });
    });*/
  });

  describe('Invalid Contract create', () => {
    const contract = ContractModel({ notName: 'Not Test Contract' });
    let created = false, statusCode;
    contract
      .save()
      .then(() => {
        statusCode = 200;
        created = true;
      })
      .catch((err) => {
        statusCode = 500;
      });

    it('should not save incorrect format to database', function (done) {
      expect(statusCode).to.equal(500);
      expect(created).to.equal(false);
      done();
    });
  });
/*
  //After all tests close connection
  after((done) => {
    Db.close(done);
  });*/

});
