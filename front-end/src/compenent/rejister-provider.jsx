import { useNavigate, Link } from "react-router-dom";
import "../assets/login.css";

export default function RegisterProvider() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Inscription Fournisseur</h2>

        <label For="name">Nom / Entreprise</label>
        <input type="text" name="name" required />

        <label For="email">Email</label>
        <input type="email" name="email" required />

        <label For="phone">Téléphone</label>
        <input type="tel" name="phone" required />

        <label For="password">Mot de passe</label>
        <input type="password" name="password" required />

        <button type="submit">Créer un compte</button>

        <p className="login-link">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
