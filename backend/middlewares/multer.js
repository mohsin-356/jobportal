// write a basic multer middleware to handle file uploads
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const singleUpload = multer({ storage }).single('file'); // Accept a single file with the field name 'file'

export default singleUpload;