const express = require('express')
const {
  getPlannerConfig,
  upsertPlannerConfig,
} = require('../controllers/plannerController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/:page', getPlannerConfig)
router.put('/:page', protect, upsertPlannerConfig)

module.exports = router
