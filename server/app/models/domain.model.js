import mongoose, { Schema } from 'mongoose'
import timestamp from 'mongoose-timestamp'

const domainSchema = new Schema({
  path: String
})

domainSchema.plugin(timestamp)

export default mongoose.model('domain.model', domainSchema)

