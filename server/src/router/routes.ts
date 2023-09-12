import express from 'express'
import mainRouter from './main.router'
import productRouter from './product.router'
import userGlobalActionRouter from './userGlobalAction.router'

const router = express.Router()

router.use(mainRouter)
router.use(productRouter)
router.use(userGlobalActionRouter)
router.use((req, res) => {
  res.status(404).json({ error: 'Page not Found!' })
})

export default router