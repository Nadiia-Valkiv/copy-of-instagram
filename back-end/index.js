import express from 'express';
import multer from 'multer';
import path from 'path';

const port = 3000;

const app = express();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('myImage');

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = fileTypes.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        return cb('Error: Image only!')
    }
}

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            })
        } else {
            if(req.file === undefined) {
                res.render('index', {
                msg: 'Error: No file Selected!'
            })
            } else {
                res.render('index', {
                msg: 'File Uploaded!', 
                file: `uploads/${req.file.filename}`
            })
            }
        }
    });
});

