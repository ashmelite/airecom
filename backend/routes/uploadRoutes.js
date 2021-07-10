import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

//config for multer; basically configuring the storageEngine; pass it in the upload middleware (below)
const storage = multer.diskStorage({
  destination(req, file, cb) {            //multer takes in an obj which has two functions in it: 1. destination (which takes in req, file and a call back function). The cb function is called inside it.
    cb(null, 'uploads/')                  //null for no errors
  },
  filename(req, file, cb) {           //2. filename which is 2nd function
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)                 //see article 12.7 @ 05:00
  }
})

//function to validate the file extension of the file being uploaded (before it actually gets uploaded)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())                 //test filetypes (var) against the extension of the file being uploaded; it will give back true/false
  const mimetype = filetypes.test(file.mimetype)                                              //it also returns true/false
  
  if (extname && mimetype) {
    return cb(null, true)           //null -> no errors; also "return callback vs callback" -> https://stackoverflow.com/questions/18217589/callback-or-return-callback
  } else {
    cb('Images Only!')              //'Images Only' passed as an error
  }
}

const upload = multer({                   //this is what we'll pass as middleware to our route
  storage,
  fileFilter: function(req, file, cb) {   //so that user can only upload images
    checkFileType(file, cb)               //we've created another function inside (and passed the exact same parameters to it) so as to keep code clean
  }
})

//endpoint; it will be '/api/upload' (from server.js) and add '/' after '/api/upload' ('/' is from post request below) so that makes it as '/api/upload/' which is still same as 'api/upload'. If it was '/example' in post request below, it'd have been 'api/upload/example'
router.post('/', upload.single('image'), (req, res) => {                  //single -> upload only one image; see article 12.7 @ 10:00 to know more about 'image' or see uploadFileHandler function in ProductEditScreen in frontend
  req.file.path = req.file.path.replace('\\','/')                         //I've added this line to replace the \ in path with / 
  res.send(`/${req.file.path}`)                                           //send back the path of the file (where it got stored)
})




export default router