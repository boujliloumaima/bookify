import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/login.css";
import { useForm } from "react-hook-form";
import logo from "../assets/logo-l.png";

export default function RegisterProvider() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/login");
  };

  const { inscrimode } = useParams();

  return (
    <div className="pageregister">
      <img src={logo} alt="" className="logoI" />
      <div className="login-container">
        {inscrimode === "fournisseur" ? (
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="login-title">Inscription Fournisseur</h2>
            <label htmlFor="name">Nom / Entreprise</label>
            <input
              type="text"
              {...register("nom", { required: "Le nom est requis" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email requis",
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: "Email invalide",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Téléphone requis",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Numéro invalide (10 chiffres)",
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              {...register("password", {
                required: "Mot de passe requis",
                minLength: {
                  value: 6,
                  message: "6 caractères minimum",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <label htmlFor="cpassword">Confirmer Mot de passe</label>
            <input
              type="password"
              {...register("cpassword", {
                required: "Confirmation requise",
                validate: (value) =>
                  value === watch("password") ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            {errors.cpassword && (
              <p className="error">{errors.cpassword.message}</p>
            )}

            <button type="submit">Créer un compte</button>

            <p className="login-link">
              Déjà inscrit ? <Link to="/login">Se connecter</Link>
            </p>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="login-title">Inscription Client</h2>

            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              {...register("nom", { required: "Le nom est requis" })}
            />
            {errors.lastname && (
              <p className="error">{errors.lastname.message}</p>
            )}

            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              {...register("prenom", { required: "Le prénom est requis" })}
            />
            {errors.firstname && (
              <p className="error">{errors.firstname.message}</p>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email requis",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email invalide",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Téléphone requis",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Numéro invalide (10 chiffres)",
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              {...register("password", {
                required: "Mot de passe requis",
                minLength: {
                  value: 6,
                  message: "6 caractères minimum",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <label htmlFor="cpassword">Confirmer Mot de passe</label>
            <input
              type="password"
              {...register("cpassword", {
                required: "Confirmation requise",
                validate: (value) =>
                  value === watch("password") ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            {errors.cpassword && (
              <p className="error">{errors.cpassword.message}</p>
            )}

            <button type="submit">Créer un compte</button>

            <p className="login-link">
              Déjà inscrit ? <Link to="/login">Se connecter</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
