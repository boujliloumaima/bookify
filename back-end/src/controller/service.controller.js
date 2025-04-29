const { Service } = require("../models");
const { logger } = require("../config/logger");

// Créer un service
const createService = async (req, res) => {
  try {
    const {
      nom,
      description,
      prix,
      image,
      jours_disponibilite,
      heure_debut,
      heure_fin,
    } = req.body;
    const newService = await Service.create({
      nom,
      description,
      prix,
      image,
      jours_disponibilite,
      heure_debut,
      heure_fin,
    });
    logger.info(`Service créé avec succès: ${newService.nom}`);
    return res.status(201).json(newService);
  } catch (error) {
    logger.error(`Erreur lors de la création du service: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Erreur lors de la création du service." });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    logger.info(`Récupération de ${services.length} services.`);
    return res.status(200).json(services);
  } catch (error) {
    logger.error(
      `Erreur lors de la récupération des services: ${error.message}`
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des services." });
  }
};
const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      logger.warn(`Service avec ID ${id} non trouvé.`);
      return res.status(404).json({ message: "Service non trouvé." });
    }

    logger.info(`Service avec ID ${id} récupéré.`);
    return res.status(200).json(service);
  } catch (error) {
    logger.error(
      `Erreur lors de la récupération du service avec ID ${id}: ${error.message}`
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération du service." });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const {
    nom,
    description,
    prix,
    image,
    jours_disponibilite,
    heure_debut,
    heure_fin,
  } = req.body;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      logger.warn(`Service avec ID ${id} non trouvé pour mise à jour.`);
      return res.status(404).json({ message: "Service non trouvé." });
    }

    // Mise à jour des champs du service
    service.nom = nom || service.nom;
    service.description = description || service.description;
    service.prix = prix || service.prix;
    service.image = image || service.image;
    service.jours_disponibilite =
      jours_disponibilite || service.jours_disponibilite;
    service.heure_debut = heure_debut || service.heure_debut;
    service.heure_fin = heure_fin || service.heure_fin;

    await service.save();
    logger.info(`Service avec ID ${id} mis à jour.`);
    return res.status(200).json(service);
  } catch (error) {
    logger.error(
      `Erreur lors de la mise à jour du service avec ID ${id}: ${error.message}`
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du service." });
  }
};
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      logger.warn(`Service avec ID ${id} non trouvé pour suppression.`);
      return res.status(404).json({ message: "Service non trouvé." });
    }

    await service.destroy();
    logger.info(`Service avec ID ${id} supprimé.`);
    return res.status(200).json({ message: "Service supprimé avec succès." });
  } catch (error) {
    logger.error(
      `Erreur lors de la suppression du service avec ID ${id}: ${error.message}`
    );
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression du service." });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
