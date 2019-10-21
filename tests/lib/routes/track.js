import request from 'request-promise';

const BASE_URL = process.env.BASE_URL;


/**
 * TrackRoute Class
 */
export default class TrackRoute {


  /**
   * Parse data from xlsx file
   * @return {Promise<any>}
   */
  static import() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        uri: BASE_URL + 'tracks/import',
        json: true,
      })
        .then((body) => resolve(body))
        .catch((error) => reject(error))
    });
  }

  /**
   * Parse data from xlsx file
   * Insert into database
   * @return {Promise<any>}
   */
  static create(data = {}) {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        uri: BASE_URL + 'tracks/create',
        body: data,
        json: true,
      })
        .then((body) => {
          resolve(body);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  /**
   * Parse and Import data
   * from xlsx file
   * @param data Object
   * @return {Promise<any>}
   */
  static search(data = {}) {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        uri: BASE_URL + 'tracks/search',
        body: data,
        json: true,
      })
        .then((body) => resolve(body))
        .catch((error) => reject(error))
    });
  }

  /**
   * Delete multiple data
   * from database
   * @param data Object
   * @return {Promise<any>}
   */
  static delete(data = {}) {
    return new Promise((resolve, reject) => {
      request({
        method: 'POST',
        uri: BASE_URL + 'tracks/delete',
        body: data,
        json: true,
      })
        .then((body) => resolve(body))
        .catch((error) => reject(error))
    });
  }

}

