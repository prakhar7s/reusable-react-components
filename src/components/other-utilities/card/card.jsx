import React from "react";

import "./card.css";

const Card = () => {
  return (
    <div className="container">
      <div className="card-container">
        <div className="circles"></div>
        <div className="circles"></div>
        <div className="circles"></div>
        <div className="circles"></div>
        <div className="circles"></div>
        <div className="card">
          <div className="upper">
            <div className="dp-img">
              <img
                src="https://lh3.googleusercontent.com/proxy/7VzjLd73q6dMRbF4uLnZ08tf5AhN5PQ9AS_NJA00CkzVLZG9vC5Z383tKkzrm213IJUNNn4kVOFS-6fe6g7FvCk5Vrdd_yFcLCDHb2vVWKyshAlE6XbNXB9O6A"
                alt="dp"
              />
            </div>
            <div className="name-username">
              <h2>Prakhar 🇮🇳</h2>
              <h4>@prakhar7s</h4>
            </div>
            <div className="date">June 22</div>
          </div>
          <div className="content">
            <p>There are moments in life that require more</p>
            <p>Meet people with a similar min & vibe 🤝</p>
            <p>Now build an empire together 👑 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
