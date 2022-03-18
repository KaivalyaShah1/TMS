import { v4 as uuidv4 } from 'uuid';
import { Property } from '../../models/property.js';
import path from 'path';
const __dirname = path.resolve();

export const createProperty = async function (req, res) {
  const { name, address, type, position, features } = req.body;
  let reqPosition = JSON.parse(position);

  if (!name || !address || !type || !position) {
    res.status(400).send({ message: 'Error: Required fields are missing.' });
    return;
  }
  try {
    let property_id = uuidv4();
    delete req.body.position;

    const newProperty = new Property({
      property_id,
      position: reqPosition,
      ...req.body,
    });
    await newProperty.save();

    const foundProperty = await Property.findOne({ property_id });
    if (!foundProperty) {
      res.status(404).send({ message: "Error: Can't find property." });
      return;
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    for await (const data of Object.keys(req.files)) {
      const file = req.files[data];
      const fileName = `${Date.now()}${file.name}`;

      const uploadPath = `${__dirname}/src/uploads/${fileName}`;
      console.log(uploadPath);
      await file.mv(uploadPath, async function (err) {
        if (err) return res.status(500).send(err);

        const image = `${req.protocol}://${req.headers.host}/uploads/${fileName}`;
        foundProperty.images.push(image);

        await foundProperty.save();
      });
    }

    res.status(201).send({ data: foundProperty });
  } catch (error) {
    res.send(error);
  }
};
