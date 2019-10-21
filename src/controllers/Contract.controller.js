import ContractModel from '../models/Contract.model';

export default class ContractController {

  constructor() {
    this.message = 'Greetings from the Contract Test controller!';
  }

  /**
   * Test function
   * @param req
   * @param res
   */
  test(req, res) {
    res.send('Greetings from the Contract Test controller!');
  }

  /**
   * Create function
   * @param req
   * @param res
   * @param next
   */
  create(req, res, next) {
    const contract = new ContractModel(
      {
        name: req.body.name
      }
    );
    contract.save((err) => {
      if(err) {
        return next(err);
      }
      res.send('Contract Created successfully')
    })
  }

  /**
   * Update function
   * @param req
   * @param res
   */
  update(req, res) {

  }

  /**
   * Delete function
   * @param req
   * @param res
   */
  delete(req, res) {

  }

}
