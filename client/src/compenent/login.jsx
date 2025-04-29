import { useNavigate, Link } from "react-router-dom";
import "../assets/login.css";
import ThemeContext from "./themecontext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [inscrimode, setInscrimode] = useState("fournisseur");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  const instructeur = () => {
    setInscrimode("fournisseur");
  };

  const client = () => {
    setInscrimode("client");
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className={`tab-button ${inscrimode}`}>
        <button onClick={instructeur} className="f">
          Fournisseur
        </button>
        <button className="c" onClick={client}>
          Client
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login-title">
          {inscrimode === "fournisseur"
            ? "Connection Fournisseur"
            : "Connection Client"}
        </h2>

        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email requis",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Format d'email invalide",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>Mot de passe</label>
        <input
          type="password"
          {...register("password", {
            required: "Mot de passe requis",
            minLength: {
              value: 6,
              message: "Minimum 6 caractères",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Se connecter</button>

        <p className="login-link">
          Pas de compte ?{" "}
          <Link to={`/register-provider/${inscrimode}`}>S'inscrire</Link>
        </p>
      </form>
    </div>
  );
}
