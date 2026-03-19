const mongoose = require('mongoose')

const plannerConfigSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      enum: ['pesticides', 'fertilizers', 'crop-solutions'],
      index: true,
    },
    config: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('PlannerConfig', plannerConfigSchema)
