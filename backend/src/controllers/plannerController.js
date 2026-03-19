const PlannerConfig = require('../models/PlannerConfig')

const allowedPages = new Set(['pesticides', 'fertilizers', 'crop-solutions'])

async function getPlannerConfig(req, res, next) {
  try {
    const { page } = req.params

    if (!allowedPages.has(page)) {
      return res.status(400).json({ message: 'Invalid planner page.' })
    }

    const doc = await PlannerConfig.findOne({ page })

    return res.status(200).json({
      data: doc
        ? {
            page: doc.page,
            config: doc.config,
            updatedAt: doc.updatedAt,
          }
        : null,
    })
  } catch (error) {
    return next(error)
  }
}

async function upsertPlannerConfig(req, res, next) {
  try {
    const { page } = req.params
    const { config } = req.body

    if (!allowedPages.has(page)) {
      return res.status(400).json({ message: 'Invalid planner page.' })
    }

    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      return res.status(400).json({ message: 'Config object is required.' })
    }

    const doc = await PlannerConfig.findOneAndUpdate(
      { page },
      {
        page,
        config,
        updatedBy: req.user?.id || null,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    )

    return res.status(200).json({
      message: 'Planner config saved.',
      data: {
        page: doc.page,
        config: doc.config,
        updatedAt: doc.updatedAt,
      },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getPlannerConfig,
  upsertPlannerConfig,
}
