import React from "react";
import { Link} from "react-router-dom";

function Sidebar() {
  return (
    <aside
      className="col-12 col-md-2 d-flex flex-column p-3"
      style={{ height: "100vh", backgroundColor: "#F8F9FA" }}
    >
      <ul className="list-unstyled">
        <li className="p-2" style={{ fontSize: "18px", color: "grey" }}>
          <Link to="/location" style={{ textDecoration: "none" }}>
          Locations
          </Link>
        </li>
        <li className="p-2 text-primary" style={{ fontSize: "18px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
                Voitures
           </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
