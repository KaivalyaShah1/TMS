import fs from 'fs';
import util from 'util';
import path from 'path';
import { pipeline } from 'stream';
import { Property } from '../../models/property.js';
const __dirname = path.resolve();

export const addImagesProperty = async function (req, res) {
  const property_id = req.params.id;
  try {
    // We check if property exists
    const foundProperty = await Property.findOne({ property_id });
    if (!foundProperty) {
      res.status(404).send({ message: "Error: Can't find property." });
      return;
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    Object.keys(req.files).forEach((key) => {
      // const file = req.files[key];
      // const uploadPath = `${__dirname}/src/uploads/${file.name}`;
      // file.mv(uploadPath, async function (err) {
      //   if (err) return res.status(500).send(err);
      //   const image =
      //     req.protocol + '://' + req.headers.host + '/uploads/' + file.name;
      //   foundProperty.images = [...foundProperty.images, image];
      //   await foundProperty.save();
      // });
    });

    for await (const data of Object.keys(req.files)) {
      const file = req.files[data];
      const fileName = `${Date.now()}${file.name}`;
      const uploadPath = `${__dirname}/src/uploads/${fileName}`;
      await file.mv(uploadPath, async function (err) {
        if (err) return res.status(500).send(err);

        const image = `${req.protocol}://${req.headers.host}/uploads/${fileName}`;
        foundProperty.images.push(image);
        await foundProperty.save();
      });
    }
    return res.status(201).send({ data: foundProperty.images });
  } catch (error) {
    console.log(error);
  } finally {
  }
};

export const deleteImagesProperty = async function (req, res) {
  const property_id = req.params.id;
  const { images } = req.body;
  try {
    // We check if property exists
    const foundProperty = await Property.findOne({ property_id });
    if (!foundProperty) {
      res.status(404).send({ message: "Error: Can't find property." });
      return;
    }
    foundProperty.images = foundProperty.images.filter(
      (img) => !images.includes(img)
    );
    foundProperty.save();
    unlinkImages(images);
    return res.send({ data: images });
  } catch (error) {
    res.send(error);
  }
};

export const unlinkImages = function (propertyImages = []) {
  const images = propertyImages.map((img) => {
    const imgSplt = img.split('/');
    return imgSplt[imgSplt.length - 1];
  });
  images.forEach((img) => {
    const __dirname = path.resolve();
    fs.unlink(__dirname + '/uploads/' + img, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Successfully deleted ' + img);
    });
  });
};
