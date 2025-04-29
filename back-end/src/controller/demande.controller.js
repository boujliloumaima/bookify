const Demande = require("../models/Demande");
const Service = require("../models/Service");
const User = require("../models/User");

// 📅 GET /demandes/calendar — événements pour FullCalendar
const getCalendarEvents = async (req, res) => {
  try {
    console.log("[GET] /demandes/calendar - Récupération des demandes");

    const demandes = await Demande.findAll({
      include: [{ model: Service }, { model: User, as: "client" }],
    });

    const events = demandes.map((d) => ({
      id: d.id,
      title: `${d.Service.nom} - ${d.client.nom}`,
      start: d.dateStart,
      end: d.dateEnd,
      backgroundColor:
        d.statut === "acceptee"
          ? "#00C853"
          : d.statut === "refusee"
          ? "#D50000"
          : "#FFD600",
    }));

    console.log(`[SUCCESS] ${events.length} événements récupérés`);
    res.json(events);
  } catch (error) {
    console.error("[ERROR] /demandes/calendar -", error.message);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des demandes" });
  }
};

// ➕ POST /demandes — Ajouter une nouvelle demande
const createDemande = async (req, res) => {
  try {
    const { serviceId, userId, dateStart, dateEnd } = req.body;
    console.log(`[POST] /demandes - Création de demande :`, req.body);

    const demande = await Demande.create({
      serviceId,
      userId,
      dateStart,
      dateEnd,
      statut: "en_attente",
    });

    console.log(`[SUCCESS] Demande créée avec ID ${demande.id}`);
    res.status(201).json(demande);
  } catch (error) {
    console.error("[ERROR] /demandes -", error.message);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création de la demande" });
  }
};

module.exports = {
  getCalendarEvents,
  createDemande,
};
