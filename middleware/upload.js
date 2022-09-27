
// const express = require('express')
// const multer = require('multer')

// const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//         cb(null, './public/img_product')
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now() + '-' + file.originalname
//         cb(null, name)
//     }
// })
// const upload = multer({storage:storage})

// module.exports = upload

// ==========================================================================
 //Upload drive
 const express = require('express')
 const { google } = require('googleapis');
 const { model } = require('mongoose');
 var multer = require('multer')
 var GoogleDriveStorage = require('multer-google-drive')
 
 const app = express()
 
 
 const CLIENT_ID = '696264302834-oigrvq9t0plcbh7k6kfs8baes7so7ifr.apps.googleusercontent.com'
 const CLIENT_SECRET = 'mtlRGYrpDL9_C5zld8i24v_E'
 const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
 const REFRESH__TOKEN = '1//04wJWv-GPGxTHCgYIARAAGAQSNwF-L9IrceeFFX9kXhRQBpi8NcxS3QCznigmk0KtGpwnbNz3Iy8D6x1AQ4d_tBrx4E3PkGrFkFo'
 
 
 const oauth2Client = new google.auth.OAuth2(
     CLIENT_ID,
     CLIENT_SECRET,
     REDIRECT_URI
 );
 
 oauth2Client.setCredentials({ refresh_token: REFRESH__TOKEN })
 
 const drive = google.drive({ 
     version:'v3', 
     auth:oauth2Client
 })
 
//  let host = 'https://lh3.google.com/u/0/d/'
 
 const parents = '1WU3GiJz71GHntSvee56zljpNpA7FmEX7'
 
 const upload = multer({
     storage: GoogleDriveStorage({
       drive: drive,
       parents: parents,
       fileName: function (req, file, cb) {
         let filename  = `${file.originalname}`;
         cb(null, filename );
       }
     })
   })
    
 
 module.exports = upload
