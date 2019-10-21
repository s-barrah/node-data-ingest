import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TrackSchema = new Schema({
  title: { type: String, required: true },
  version: { type: String },
  artist: { type: String },
  isrc: { type: String, required: true },
  p_line: { type: String },
  aliases: { type: Array },
  contractId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contract'
    }
  ],
});


// Export the model
export default mongoose.model('Track', TrackSchema);
