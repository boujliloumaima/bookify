import { useNavigate, Link } from "react-router-dom";
import "../assets/login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion Fournisseur</h2>

        <label>Email</label>
        <input type="email" required />

        <label>Mot de passe</label>
        <input type="password" required />

        <button type="submit">Se connecter</button>

        <p className="login-link">
          Pas de compte ? <Link to="/register-provider">S'inscrire</Link>
        </p>
      </form>
    </div>
  );
}
