import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../assets/test.css";

const ServiceForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Fonction pour récupérer automatiquement la localisation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const country = data.address.country || "";
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "";
            const displayName = data.display_name || "";

            setValue("country", country);
            setValue("city", city);
            setValue("location", displayName);
          } catch (error) {
            console.error(
              "Erreur lors de la récupération de l'adresse :",
              error
            );
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
          setLoadingLocation(false);
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas supportée par ce navigateur."
      );
      setLoadingLocation(false);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("serviceName", data.serviceName);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("location", data.location);
    formData.append("price", data.price);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload-images",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Service ajouté avec succès !");
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du service :", error);
      alert("Une erreur est survenue lors de l'ajout du service.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedImages([...event.target.files]);
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="login-form"
      >
        <div className="form-row">
          <div className="form-group">
            <label>Nom du service :</label>
            <input
              type="text"
              {...register("serviceName", {
                required: "Le nom du service est requis",
              })}
            />
            {errors.serviceName && <span>{errors.serviceName.message}</span>}
          </div>

          <div className="form-group">
            <label>Prix :</label>
            <input
              type="number"
              {...register("price", { required: "Le prix est requis", min: 0 })}
            />
            {errors.price && <span>{errors.price.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pays :</label>
            <input
              type="text"
              {...register("country", { required: "Le pays est requis" })}
              disabled={loadingLocation}
            />
            {errors.country && <span>{errors.country.message}</span>}
          </div>

          <div className="form-group">
            <label>Ville :</label>
            <input
              type="text"
              {...register("city", { required: "La ville est requise" })}
              disabled={loadingLocation}
            />
            {errors.city && <span>{errors.city.message}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Localisation précise :</label>
          <input
            type="text"
            {...register("location", {
              required: "La localisation est requise",
            })}
            disabled={loadingLocation}
          />
          {errors.location && <span>{errors.location.message}</span>}
        </div>

        {loadingLocation && <p> Localisation en cours...</p>}

        <div className="form-group">
          <label>Ajouter des images :</label>
          <label className="custom-file-upload">
            Choisir des images
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          {selectedImages.length > 0 && (
            <div className="file-list">
              <h4>Images sélectionnées :</h4>
              <ul>
                {selectedImages.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ServiceForm;
