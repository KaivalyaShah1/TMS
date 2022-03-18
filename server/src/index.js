import express from 'express';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
var port = process.env.PORT || 5000;
import path from 'path';
import authRouter from '../src/routes/auth/index.js';
import userRouter from '../src/routes/user/index.js';
import enquiriesRouter from '../src/routes/enquiries/index.js';
import propertyRouter from '../src/routes/properties/index.js';
import os from 'os';
import { verifyToken } from './middlewares/auth.middleware.js';
import fileupload from 'express-fileupload';
import cors from 'cors';
const __dirname = path.resolve();

var app = express();

var db =
  process.env.DB_CONNECT ||
  'XYZZZZ';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors({ origin: '*' }));
app.use('/uploads', express.static(`${__dirname}/src/uploads`));
app.use(
  fileupload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
    safeFileNames: true,
    tempFileDir: os.tmpdir(),
    useTempFiles: true,
    preserveExtension: true,
    abortOnLimit: true,
    // debug: true,

    onFileBegin: (name, file) => {
      console.log(`begin upload ${name}`);
    },
    onFileComplete: (name, file) => {
      console.log(`complete upload ${name}`);
    },
  })
);

app.get('/', function (req, res) {
  console.log('app starting on port: ' + port);
  res.send('tes express nodejs mongodb');
});

app.use('/auth', authRouter);
app.use('/users', verifyToken, userRouter);
app.use('/properties', propertyRouter);
app.use('/enquiries', enquiriesRouter);

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    try {
      app.listen(port, function () {
        console.log('app listening on port: ' + port);
      });
    } catch (error) {
      console.error(error);
    }
  })
  .catch((e) => console.error(error));
