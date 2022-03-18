import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models/user.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configuration } from '../../utils/index.js';

export const register = async function (req, res) {
  const { fullName, email, password, role } = req.body;
  if (fullName && email && password && role) {
    try {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const newUser = new User({
        user_id: uuidv4(),
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role,
      });
      const { user_id } = await newUser.save();
      const accessToken = jwt.sign(
        { id: newUser.user_id, role, email },
        configuration.ACCESS_TOKEN_SECRET,
        {
          expiresIn: configuration.ACCESS_TOKEN_EXPIRES_IN,
        }
      );
      return res
        .status(201)
        .send({ user_id, email: email.toLowerCase(), fullName, accessToken });
    } catch (error) {
      res.send(error);
    }
  }
  res.status(400).send({ message: 'Error: form is invalid' });
};
