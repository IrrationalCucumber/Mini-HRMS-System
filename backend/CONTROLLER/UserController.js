const User = require("../Model/UserModel");

const UserController = {
  loginUser: async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    try {
      //query for admin
      const user = await User.findOne({
        where: { email: email, password: pass },
      });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UserController;
