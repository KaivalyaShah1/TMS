import { User } from '../../models/user.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configuration } from '../../utils/index.js';

export const signIn = async function (req, res) {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email.toLowerCase() });
    if (!foundUser) {
      res.status(404).send({
        statusCode: 404,
        error: 'Internal Server Error',
        message: "Error: We can't find a user with that e-mail address.",
      });
    }
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      res
        .status(400)
        .send({ message: 'Error: Invalid password.', validPassword });
    }
    const { id, role, emailId, fullName, user_id } = foundUser;
    const accessToken = jwt.sign(
      { id, role, email, user_id },
      configuration.ACCESS_TOKEN_SECRET,
      {
        expiresIn: configuration.ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    res.status(200).send({
      user_id,
      fullName,
      emailId,
      role,
      accessToken,
    });
  } catch (error) {
    res.status(404).send({ message: 'Error: Something went wrong.' });
  }
};
