const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ENV = require("../config");
const { logger } = require("../config/logger");
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.info(
        `Tentative d'inscription avec un email déjà utilisé : ${email}`
      );
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nom,
      prenom,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    logger.info(`Nouvel utilisateur inscrit : ${email}`);
    const { password: _, ...userData } = newUser.dataValues;
    res
      .status(201)
      .json({ message: "Utilisateur inscrit avec succès", user: userData });
  } catch (error) {
    logger.error("Erreur lors de l'inscription", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.info(`Connexion échouée : utilisateur non trouvé - ${email}`);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      logger.info(`Connexion échouée : mot de passe incorrect - ${email}`);
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, ENV.TOKEN, {
      expiresIn: "24h",
    });

    const { password: _, ...userData } = user.dataValues;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    logger.info(`Connexion réussie : ${email} (${user.role})`);

    if (user.role === "fournisseur") {
      return res
        .status(200)
        .json({ message: "Bienvenue fournisseur", user: userData });
    }

    if (user.role === "admin") {
      return res
        .status(200)
        .json({ message: "Bienvenue admin", user: userData });
    }

    res.status(200).json({ message: "Bienvenue utilisateur", user: userData });
  } catch (error) {
    logger.error("Erreur lors de la connexion", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    const allusers = users.map((u) => {
      const { password, ...userdata } = u.dataValues;
      return userdata;
    });
    logger.info("Liste des utilisateurs récupérée");
    res.status(200).json(allusers);
  } catch (error) {
    logger.error("Erreur lors de la récupération des utilisateurs", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      logger.info(`Profil non trouvé pour l'utilisateur ID ${userId}`);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const { password: _, ...userData } = user.dataValues;

    logger.info(`Profil récupéré pour l'utilisateur ID ${userId}`);
    res.status(200).json({ message: "Profil récupéré", user: userData });
  } catch (error) {
    logger.error("Erreur lors de la récupération du profil", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, password } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      logger.info(
        `Tentative de mise à jour d'un profil inexistant - ID ${userId}`
      );
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const { password: _, ...userData } = user.dataValues;

    logger.info(`Profil mis à jour pour l'utilisateur ID ${userId}`);
    res.status(200).json({ message: "Profil mis à jour", user: userData });
  } catch (error) {
    logger.error("Erreur lors de la mise à jour du profil", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      logger.info(
        `Tentative de suppression d'un compte inexistant - ID ${userId}`
      );
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.destroy();

    logger.info(`Compte supprimé : ID ${userId}`);
    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    logger.error("Erreur lors de la suppression du compte", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
