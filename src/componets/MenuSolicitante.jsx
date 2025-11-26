import { NavLink } from "react-router-dom";
import "./Menus.css";

function MenuSolicitante() {
  return (
    <>
      <section className="container-menu">
        <NavLink to="/">
          <button>Inicio</button>
        </NavLink>
        
        <NavLink to="/perfil">
          <button>Perfil</button>
        </NavLink>

        <NavLink to="/historico-coletas">
          <button>Historico</button>
        </NavLink>
      </section>
    </>
  );
}

export default MenuSolicitante;
