import multer from 'multer'

// creating multer middleware for parsing formdata
const storage = multer.diskStorage({
  filename: function(req,file,callback){
    callback(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage})

export default upload

// explanation
// multer: A Node.js middleware for handling multipart/form-data, which is commonly used for file uploads.
// storage: Configures where and how files are stored. Here, diskStorage saves files locally on the server.
// filename: Specifies the file-naming convention. It uses the current timestamp combined with the original filename to avoid filename conflicts.
// upload: Configures Multer to use the storage settings.
// multer.diskStorage: Configures how files are stored.

// 3. Storage Configurations
// Multer supports two primary storage engines:

// Disk Storage (multer.diskStorage()): Stores files directly on the server’s disk.
// Memory Storage (multer.memoryStorage()): Stores files in memory as Buffer objects

// 1. Disk Storage
// Disk storage saves uploaded files to the server's file system, and it provides more control over the filenames and file paths. Here's how to configure it:

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, 'uploads/')  // Set the upload directory
//   },
//   filename: function (req, file, callback) {
//     const uniqueSuffix = `${Date.now()}_${file.originalname}`;
//     callback(null, uniqueSuffix);  // Custom filename with timestamp
//   }
// });

// destination function: Defines where the files will be stored on the server. You can specify the path (e.g., 'uploads/') or dynamically set it based on the file type, user, etc.
// filename function: Controls the name of the saved file. Here, we concatenate the current timestamp with the original file name to create a unique filename. The callback function is called to complete the setup by providing null for errors and the desired filename as the second argument.


// const upload = multer({ storage });
// multer({ storage }): The multer function initializes the file upload middleware and takes an options object. Here, { storage } specifies the storage configuration, which defines where and how files are stored on the server.

// storage: This is typically defined using multer.diskStorage(), which controls the destination path and filename for each uploaded file. It determines:

// Destination: Where the file will be saved on the server (e.g., in an uploads folder).
// Filename: How the file will be named when stored.

// upload.single('file')
// Purpose: upload.single() is a middleware function provided by Multer to handle single file uploads.
// file: This parameter refers to the form field name from the HTML form or client request. For example, if you have a form with <input type="file" name="file" />, then upload.single('file') will look for the file in this file field.
// req.file: After uploading, the uploaded file’s metadata (like file path, filename, size, etc.) will be available in req.file. This is useful if you need to access or log details about the file.

