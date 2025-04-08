import React from "react";
import "../assets/card.css";
import image from "../assets/logo-l.png";

export default function ServiceCard() {
  return (
    <div>
      <div class="card">
        <a href="#">
          <img class="card-img" src={image} alt="Image" />
        </a>
        <div class="card-body">
          <a href="#">
            <h5 class="card-title">Noteworthy technology acquisitions 2021</h5>
          </a>
          <p class="card-text">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a href="#" class="card-btn">
            Read more
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
