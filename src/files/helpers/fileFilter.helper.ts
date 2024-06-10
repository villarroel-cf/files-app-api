export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if(!file) return callback(new Error('File is empty'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg'];
    if(validExtensions.includes(fileExtension)){
        return callback(null, true);
    }
    callback(null, false);
}

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };