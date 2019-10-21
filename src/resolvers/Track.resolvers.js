export default class TrackResolver {

  constructor() {
    this._title = null;
    this._version = null;
    this._artist = null;
    this._isrc = null;
    this._p_line = null;
    this._aliases = null;
    this._contractId = null;
    this._lineNumber = null;
  }

  getTitle() {
    return this._title;
  }

  setTitle(value) {
    this._title = value;
  }

  getVersion() {
    return this._version;
  }

  setVersion(value) {
    this._version = value;
  }

  getArtist() {
    return this._artist;
  }

  setArtist(value) {
    this._artist = value;
  }

  getISRC() {
    return this._isrc;
  }

  setISRC(value) {
    this._isrc = value;
  }

  getPLine() {
    return this._p_line;
  }

  setPLine(value) {
    this._p_line = value;
  }

  getAliases() {
    return this._aliases;
  }

  setAliases(value) {
    this._aliases = value && value.includes(';')
      ? value.replace(/\s+/g, '').split(';')
      : value;
  }

  getContractId() {
    return this._contractId;
  }

  setContractId(value) {
    this._contractId = value;
  }

  getLineNumber() {
    return this._lineNumber;
  }

  setLineNumber(value) {
    this._lineNumber = value;
  }

  /**
   * Instantiate a function with a value if defined
   * @param classFunctionName string
   * @param value             mixed
   */
  instantiateFunctionWithDefinedValue(classFunctionName, value) {
    if (typeof value !== 'undefined') {
      this[classFunctionName](value);
    } else {
      this[classFunctionName](null);
    }
  }

  hydrateFromEntity(entityDataValues, index) {
    this.instantiateFunctionWithDefinedValue('setTitle', entityDataValues.Title);
    this.instantiateFunctionWithDefinedValue('setVersion', entityDataValues.Version);
    this.instantiateFunctionWithDefinedValue('setArtist', entityDataValues.Artist);
    this.instantiateFunctionWithDefinedValue('setISRC', entityDataValues.ISRC);
    this.instantiateFunctionWithDefinedValue('setPLine', entityDataValues['P Line']);
    this.instantiateFunctionWithDefinedValue('setAliases', entityDataValues.Aliases);
    this.instantiateFunctionWithDefinedValue('setLineNumber', index + 1);
    return this;
  }


  validate() {
    const errors = [];
    if (this.getTitle() === '' || this.getTitle() === null) {
      errors.push(`Line ${this.getLineNumber()} - Track title cannot be blank!`);
    }
    if (this.getISRC() === '' || this.getISRC() === null) {
      errors.push(`Line ${this.getLineNumber()} - Track ISRC cannot be blank!`);
    }
    return errors;
  }

  getEntityMappings() {
    return {
      title: this.getTitle(),
      version: this.getVersion(),
      artist: this.getArtist(),
      isrc: this.getISRC(),
      p_line: this.getPLine(),
      aliases: this.getAliases(),
      contractId: this.getContractId(),
    }
  }
}
