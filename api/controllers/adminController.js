import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const test = (req, res) => {
//   res.json({ message: "Api calisiyor" });
// };

// sadece ilk kurulum icin
export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin zaten kayitli" });
    }

    if (!validatePassword(password)) {
      return res.status(401).json({
        message:
          "password should contain atleast one number and one special character",
      });
    }

    const passwordHashed = await bcrypt.hash(password, 12);

    const admin = new Admin({ username, password: passwordHashed });
    await admin.save();

    res.status(201).json({ message: "Admin olusturuldu" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    // admin yoksa
    if (!admin) {
      res.status(401).json({ message: "Gecersiz kullanici adi" });
    }

    // sifre karsilastirma
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ message: "Gecersiz parola" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function validatePassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
  return regex.test(password);
}
