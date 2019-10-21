import chai from 'chai';
import faker from 'faker';

import TrackModel from '../../../src/models/Track.model';
import Db from '../../lib/db';
import ContractModel from "../../../src/models/Contract.model";

const expect = chai.expect;

describe('models/Track.model', () => {

  // Before running the tests, send a request to the endpoint.
  before(function(done){
    // Connect to mongodb
    Db.connect(done);
  });

  describe('Valid Track create', () => {
/*

    const firstRandom = faker.random.number();
    const randomNumber = Math.floor((Math.random() * 10) + 1);
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const mock = {
      title: `Track ${randomNumber}`,
      version: `Version ${randomNumber}`,
      artist: name,
      isrc: `ISRC${randomNumber}`,
      p_line: `P Line ${randomNumber}`,
      aliases: [
        `aliases${randomNumber}`,
        `aliases${randomNumber}`
      ],
      contractId: '',
    };

    const contract = new ContractModel({
      name: faker.lorem.word
    });

    it('should save contract to database', (done) => {
      contract.save()
        .then(() => {
          console.log('contract._id: ', contract._id);
          mock.contractId = contract._id;
          return new TrackModel(mock).save();
        })
        .then(() => TrackModel.find(mock))
        .then((tracks) => {
          expect(tracks.length > 0).to.equal(true);
        });
      done();
    });
*/

  });


  describe('Invalid Track create', () => {
    /*
        const randomNumber = Math.floor((Math.random() * 10) + 1);
        const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const mock = {
          title: `Track ${randomNumber}`,
          version: `Version ${randomNumber}`,
          artist: name,
          isrc: `ISRC${randomNumber}`,
          p_line: `P Line ${randomNumber}`,
          aliases: [
            `aliases${randomNumber}`,
            `aliases${randomNumber}`
          ],
          contractId: null,
        };


        it('should not save contract to database', (done) => {
          new TrackModel(mock).save()
            .then(() => TrackModel.find(mock))
            .then((tracks) => {
              expect(tracks.length > 0).to.equal(false);
            })
            .catch((err) => {
              expect(err.length > 0).to.equal(true);
            });
          done();
        });
      });*/
    /*
      //After all tests close connection
      after((done) => {
        Db.close(done);
      });*/
  });

});
