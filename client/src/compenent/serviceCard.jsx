import React from "react";
import "../assets/card.css";
import { Link } from "react-router-dom";
import ThemeContext from "./themecontext";
import { useContext } from "react";

export default function ServiceCard() {
  const { theme } = useContext(ThemeContext);
  const data = [
    {
      id: 1,
      title: "Massage Relaxant",
      description:
        "Détendez-vous avec un massage relaxant aux huiles essentielles, dans une ambiance zen.",
      image:
        "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg",
    },
    {
      id: 2,
      title: "Maquillage Professionnel",
      description:
        "Maquillage de jour, de soirée ou pour événements, réalisé par une artiste professionnelle.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
    {
      id: 3,
      title: "Cours de Yoga",
      description:
        "Séances de yoga en petit groupe pour renforcer le corps et calmer l’esprit.",
      image: "https://i.ibb.co/k2LcK9d2/images.jpg",
    },
    {
      id: 4,
      title: "Photographie Portrait",
      description:
        "Shooting portrait en studio ou en extérieur avec retouche professionnelle incluse.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
    {
      id: 5,
      title: "Coiffure moderne",
      description:
        "Coiffure moderne, brushing, ou coupe tendance dans un salon chaleureux.",
      image: "https://i.ibb.co/cKyxzGSn/hairdresser-taking-care-her-client.jpg",
    },
    {
      id: 6,
      title: "hotel",
      description:
        "Manucure, pose de gel et nail art pour des ongles parfaits et stylés.",
      image:
        "https://i.ibb.co/JPXCdYJ/vojtech-bruzek-Yrxr3bs-Pd-S0-unsplash.jpg",
    },
  ];
  return (
    <div className={`container-card ${theme}`}>
      {data.map((e) => {
        return (
          <div class="card">
            <img class="card-img" src={e.image} alt="Image" />

            <div class="card-body">
              <h5 class="card-title">{e.title}</h5>

              <p class="card-text">{e.description}</p>
              <Link to="#" class="card-btn">
                reserver
                <span class="arrow">→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
