import forEachOf from 'async/forEachOf';
import XLSX from "xlsx";

import TrackResolver from '../resolvers/Track.resolvers';
import ContractModel from "../models/Contract.model";


export default class FileParser {

  constructor(file) {
    this.file = file;
  }

  /***
   * Function to get data
   * from xlsx file
   * @return {*}
   */
  getFileData() {
    const workbook = XLSX.readFile(this.file); // Read file
    const sheetNameList = workbook.SheetNames; // Get sheet names
    const xlsData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]); // Get data as json object
    xlsData.shift(); // remove heading
    return xlsData;
  }


  parser() {
    const data = this.getFileData();
    const trackResolver = new TrackResolver();
    const errors = [], results = [];

    return new Promise((resolve, reject) => {

      forEachOf(data, (item, index, callback) => {
        trackResolver.hydrateFromEntity(item, index);
        const entityData = trackResolver.getEntityMappings();

        const validateErrors = trackResolver.validate();
        ContractModel
          .find({ 'name': item['Contract'] })
          .then((contracts) => {
            let validTrack = false;
            if (contracts.length > 0) {
              validTrack = true;
              entityData.contractId = contracts[0]._id;
            } else if (item['Contract'] && item['Contract'] !== '') {
              const line = index + 1;
              errors.push(`Line ${line} - Contract - ${item['Contract']} - has no association found in database`);
            } else if (validateErrors.length > 0) {
              errors.push(...validateErrors);
              validTrack = false;
            } else {
              validTrack = true;
            }
            if (validTrack) {
              results.push(entityData);
            }
            callback();
          });
      }, (err) => {
        if (err) {
          reject(err);
        }
        resolve({
          results,
          errors,
        });
      });
    });
  }
}
