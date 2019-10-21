import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ContractSchema = new Schema({
  name: { type: String, required: true },
});


// Export the model
export default mongoose.model('Contract', ContractSchema);
