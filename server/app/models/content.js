import mongoose, {Schema} from 'mongoose';
import timestamp from 'mongoose-timestamp';

const contentSchema = new Schema({
    domain: {type: String, required: true},
    url: {type: String, required: true},
    ucid: {type: String, required: true, unique: true},
    statusCheck: [{
        status: Number,
        check: Date
    }]
});

contentSchema.plugin(timestamp);

export default mongoose.model('Content', contentSchema);
