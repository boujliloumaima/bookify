const db = require("../config/db");
const User = require("./user.model");
const Service = require("./service.model");
const Demande = require("./demande.model");
const Categorie = require("./categorie.model");
const Event = require("./event.model");
// Chaque service appartient à un fournisseur
User.hasMany(Service, { foreignKey: "user_id", onDelete: "CASCADE" });
Service.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
// Chaque service appartient à un categorie
Categorie.hasMany(Service, { foreignKey: "categorie_id", onDelete: "CASCADE" });
Service.belongsTo(Categorie, {
  foreignKey: "categorie_id",
  onDelete: "CASCADE",
});
// Une demande appartient à un utilisateur
Demande.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Demande, { foreignKey: "user_id", onDelete: "CASCADE" });

// Une demande concerne un service
Demande.belongsTo(Service, {
  foreignKey: "service_id",
  as: "service",
  onDelete: "CASCADE",
});
Service.hasMany(Demande, {
  foreignKey: "service_id",
  as: "demandes",
  onDelete: "CASCADE",
});
// Relation Service → Event
Service.hasMany(Event, {
  foreignKey: "serviceId",
  as: "events",
});
Event.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

// Relation Event → Demande
Event.hasOne(Demande, {
  foreignKey: "eventId",
  as: "demande",
});
Demande.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});
module.exports = {
  db,
  User,
  Service,
  Demande,
  Categorie,
  Event,
};
