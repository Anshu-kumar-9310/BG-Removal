import axios from "axios"
import userModel from "../models/userModel.js"
import fs from 'fs'
import FormData from "form-data"



// comtroller function to remove bg from image
const removeBgImage = async (req, res) => {
  try{
    const {userId} = req.body
    // console.log(userId)
    const user = await userModel.findOne({clerkId:userId})

    if(!user){
      return res.json({success:false, message:"User Not Found."})
    }

    if(user.creditBalance === 0){
      return res.json({success:false, message:"No Credit Balance",creditBalance:user.creditBalance})
    }

    const imagePath = req.file.path;
    // Reading the image file
    const imageFile = fs.createReadStream(imagePath)

    const formdata = new FormData()
    formdata.append('image_file',imageFile)

    // console.log("fetch start")
    const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',
    formdata,{
      headers:{
        'x-api-key': process.env.CLIPDROP_API
      },
      responseType: 'arraybuffer'
    })
    // console.log("fetch ended")
    // console.log(data)
    const base64Image = Buffer.from(data,'binary').toString('base64')

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

    await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1})

    res.json({success:true, resultImage, creditBalance: user.creditBalance-1, message:"Background Removed Successfully."})


  }catch (error){
    // console.log(error.message)
    res.json({success:false, message:error.message})
  }
}

export {removeBgImage}


// explanation
// Reading and Preparing the Image File:

// req.file.path: The path of the uploaded file.
// fs.createReadStream(imagePath):
// Reads the image as a stream (efficient for large files) to prepare it for sending to the API.
FormData:
// formdata.append('image_file', imageFile): Attaches the image file to FormData, which allows sending files via HTTP requests.

// How fs.createReadStream Works
// fs.createReadStream(path):
// Creates a readable stream for the file at the specified path.
// A readable stream allows data to be read from the file in chunks rather than loading it all at once, which conserves memory and is faster for large files.


// axios.post: Sends a POST request to Clipdrop's background removal API.
// formdata: Contains the image file.
// Headers: The x-api-key authenticates the request with Clipdrop's API.
// responseType: 'arraybuffer':
// Specifies that the response should be received as a binary buffer, which is necessary when handling image data.

// explanation
// const base64Image = Buffer.from(data, 'binary').toString('base64')
// const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

// Buffer:
// What is Buffer: Buffer is a built-in Node.js class for working with binary data.
// Buffer.from(data, 'binary'): Creates a Buffer instance from the API’s binary response data.
// .toString('base64'): Converts the binary data to a Base64-encoded string.
// Base64 encoding allows binary data to be represented in text format, making it suitable for embedding in HTML or JSON.



// `data:${req.file.mimetype};base64,${base64Image}`
// What is a Data URL?

// A Data URL is a format used to include image or other media data directly in HTML or JSON without a separate file. It embeds the data right in the URL by specifying:
// The MIME type of the content (e.g., image/png, image/jpeg).
// The encoding (in this case, base64).
// The actual data encoded in Base64 format

// ${req.file.mimetype}: Specifies the MIME type of the uploaded file, e.g., image/png or image/jpeg. This is important because it tells the browser what type of image it’s handling.
// base64Image: This is the Base64 string representing the binary image data.
// Combined, resultImage is a Data URL string that can be embedded directly into an img tag in HTML or displayed directly in the client without needing a separate image file or URL.

// Example: How It Looks in the Response
// Suppose the req.file.mimetype is image/png, and the base64Image is a long Base64 string like iVBORw0KGgo.... The final resultImage string will look something like this:
// resultImage = "data:image/png;base64,iVBORw0KGgo..."

// The client can then display this image by embedding resultImage directly into an img tag like so:
{/* <img src="data:image/png;base64,iVBORw0KGgo..." alt="Processed Image" />
The browser reads the data:image/png;base64, prefix, understands that the following data is a PNG image encoded in Base64, and displays it. */}
