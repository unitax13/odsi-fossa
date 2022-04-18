const express = require('express')
const router = express.Router()
const { getMemos,setMemo,updateMemo,deleteMemo } = require("../controllers/memoController")

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getMemos).post(protect,setMemo)
router.route('/:id').delete(protect,deleteMemo).put(protect,updateMemo)

module.exports = router
