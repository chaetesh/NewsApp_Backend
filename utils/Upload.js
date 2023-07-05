// import multer from "multer";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url:
    "mongodb+srv://chaetesh:aetesh1234@cluster0.z14sfn0.mongodb.net/?retryWrites=true&w=majority",
  file: (request, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];

    // If image is not jpg/png format
    if(match.indexOf(file.memeType) === -1){
        return `${Date.now()}-news-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      fileName: `${Date.now()}-news-${file.originalname}`,
    };
  },
});

export default multer({storage});
