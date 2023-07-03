import React from "react";

function MobileMenu({ setShowForm, setMenu }) {
  return (
    <div className="mobile-menu text-white d-flex justify-content-around align-items-center text-small">
      <div className="d-flex flex-column align-items-center">
        <img src={require("../assets/home 1.png")} />
        Home
      </div>
      <div className="d-flex flex-column align-items-center">
        <img src={require("../assets/job-seeker 1.png")} />
        Jobs
      </div>
      <div className="d-flex flex-column align-items-center mt-3">
        <button
          className="add-button"
          onClick={() => {
            setShowForm(true);
            setMenu("addJob");
          }}
        >
          +
        </button>
        Add a Job
      </div>
      <div className="d-flex flex-column align-items-center">
        <img src={require("../assets/application.png")} />
        Applications
      </div>
      <div className="d-flex flex-column align-items-center">
        <img src={require("../assets/Profile.png")} />
        Profile
      </div>
    </div>
  );
}

export default MobileMenu;
