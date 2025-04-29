const Event = require("../models/event.model");

// ➡ Créer un événement
const createEvent = async (req, res) => {
  try {
    const { title, start, end, allDay, backgroundColor, borderColor } =
      req.body;
    const event = await Event.create({
      title,
      start,
      end,
      allDay,
      backgroundColor,
      borderColor,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'événement." });
  }
};

// ➡ Récupérer tous les événements
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des événements." });
  }
};
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { start, end, allDay } = req.body;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }
    await event.update({ start, end, allDay });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'événement." });
  }
};

// ➡ Supprimer un événement
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }
    await event.destroy();
    res.status(200).json({ message: "Événement supprimé." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'événement." });
  }
};

module.exports = { createEvent, getAllEvents, deleteEvent, updateEvent };
