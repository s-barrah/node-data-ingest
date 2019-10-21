import chai from 'chai';

import TrackResolver from '../../../src/resolvers/Track.resolvers';

const expect = chai.expect;
const trackMock = require('../../mocks/track.json');

//
describe('Resolvers/Track.resolvers', () => {

  describe('Ensure setting and getting of variables', () => {

    const trackResolver = new TrackResolver();

    it('should set the title correctly', () => {
      trackResolver.setTitle(trackMock.Title);
      expect(trackResolver.getTitle()).to.equal(trackMock.Title);
    });

    it('should set the version correctly', () => {
      trackResolver.setVersion(trackMock.Version);
      expect(trackResolver.getVersion()).to.equal(trackMock.Version);
    });

    it('should set the artist correctly', () => {
      trackResolver.setArtist(trackMock.Artist);
      expect(trackResolver.getArtist()).to.equal(trackMock.Artist);
    });

    it('should set the ISRC correctly', () => {
      trackResolver.setISRC(trackMock.ISRC);
      expect(trackResolver.getISRC()).to.equal(trackMock.ISRC);
    });

    it('should set the P line correctly', () => {
      trackResolver.setPLine(trackMock["P Line"]);
      expect(trackResolver.getPLine()).to.equal(trackMock["P Line"]);
    });

    it('should set the Aliases correctly', () => {
      trackResolver.setAliases(trackMock.Aliases);
      const aliases = trackMock.Aliases.replace(/\s+/g, '').split(';');
      expect(JSON.stringify(trackResolver.getAliases())).to.equal(JSON.stringify(aliases));
    });
  });

  describe('Ensure entity mapping', () => {

    const trackResolver = new TrackResolver();
    trackResolver.hydrateFromEntity(trackMock);

    it('should return an object with all of the entity values', () => {
      const aliases = trackMock.Aliases.replace(/\s+/g, '').split(';');
      expect(trackResolver.getEntityMappings()).to.have.property('title').with.lengthOf(trackMock.Title.length);
      expect(trackResolver.getEntityMappings()).to.have.property('version').with.lengthOf(trackMock.Version.length);
      expect(trackResolver.getEntityMappings()).to.have.property('artist').with.lengthOf(trackMock.Artist.length);
      expect(trackResolver.getEntityMappings()).to.have.property('isrc').with.lengthOf(trackMock.ISRC.length);
      expect(trackResolver.getEntityMappings()).to.have.property('p_line').with.lengthOf(trackMock["P Line"].length);
      expect(trackResolver.getEntityMappings()).to.have.property('aliases').with.lengthOf(aliases.length);
    });

  });


  describe('Ensure entity hydration', () => {

    it('should be able to get the hydrated variables from the model', () => {

      const aliases = trackMock.Aliases.replace(/\s+/g, '').split(';');
      const trackResolver = new TrackResolver();

      trackResolver.hydrateFromEntity(trackMock);
      expect(trackResolver.getTitle()).to.equal(trackMock.Title);
      expect(trackResolver.getVersion()).to.equal(trackMock.Version);
      expect(trackResolver.getArtist()).to.equal(trackMock.Artist);
      expect(trackResolver.getISRC()).to.equal(trackMock.ISRC);
      expect(trackResolver.getPLine()).to.equal(trackMock["P Line"]);
      expect(JSON.stringify(trackResolver.getAliases())).to.equal(JSON.stringify(aliases));
    });

  });

});

