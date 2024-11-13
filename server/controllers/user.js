import bcrypt from "bcrypt";
import User from "../models/user.js";

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(204).json({ "message": "No users found." });
    res.json(users);
  } catch (err) {
    res.status(500).json({ "message": `${err.message}` });
  }
}

const getUser = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ "message": "id is required." });
    if (id !== req.user._id.toString()) return res.sendStatus(401);
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(400).json({ "message": `No user with id: ${id} is found.` })
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` })
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params?.id;
    const { password, email } = req.body;
    if (!password && !email) return res.status(400).json({ "message": "password or email required." });

    const user = await User.findOne({ _id: id, _id: req.user._id, username: req.user.username }).exec();

    if (!user) return res.status(400).json({ "message": `User with ${id} not found.` });

    if (req.body?.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    if (req.body?.email) user.email = req.body.email;

    const updatedUser = await user.save();
    res.json(updateUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ "message": "id parameter is requires." })
    const user = await User.findOne({ _id: id, _id: req.user._id, username: req.user.username }).exec();
    if (!user) return res.status(400).json({ "message": `User with ${id} not found.` });

    const deletedUser = await user.deleteOne({ _id: id });
    res.json(deleteUser);

  } catch (err) {
    console.log(err);
    res.status(500).json({ "message": `${err.message}` });
  }
}


export { getAllUser, getUser, updateUser, deleteUser };