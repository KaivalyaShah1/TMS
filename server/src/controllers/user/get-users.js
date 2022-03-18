import { User } from '../../models/user.js';

export const getUsers = async function (_, res) {
  console.log(_.user);
  const users = await User.find();
  res.status(200).send(users);
};
