import React from "react";

export default function Profil() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h2>{user.nom}</h2>
      <h2>{user.email}</h2>
      <h2>{user.phone}</h2>
    </div>
  );
}
