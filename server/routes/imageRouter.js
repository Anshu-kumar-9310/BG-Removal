import express from 'express'
import upload from '../middlewares/multer.js'
import { removeBgImage } from '../controllers/imageController.js'
import authUser from '../middlewares/auth.js'


const imageRouter = express.Router()

imageRouter.post('/remove-bg',upload.single('image'),authUser,removeBgImage)

export default imageRouter

// explanation
// upload.single('image'): 
// This middleware from Multer processes a single image file from the image field in the request.
// upload.single('image'): Processes a single image uploaded as image.
// authUser: Verifies if the user is authenticated.
// removeBgImage: Main controller function that removes the background.
