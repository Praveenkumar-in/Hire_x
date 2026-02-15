
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// ✅ Company logo upload (FIXED)
const logoStorage = new CloudinaryStorage({
  cloudinary,params: async (req, file) => {
  try {
    console.log('🟢 Cloudinary params fn called');
    return {
      folder: 'hirex/company_logos',
      resource_type: 'image',
      format: file.mimetype.split('/')[1],
      public_id: Date.now() + '-' + file.originalname,
    };
  } catch (err) {
    console.error('🟥 CLOUDINARY PARAMS ERROR:', err);
    throw err;
  }
}
})
  

// ✅ Resume upload (FIXED)
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'hirex/resumes',
      resource_type: 'raw',
      public_id: file.originalname,
    };
  },
});


const uploadLogo = multer({
  storage: logoStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});
const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { uploadLogo, uploadResume };



module.exports = { uploadLogo, uploadResume };

