import { NavLink } from "react-router-dom";
import './Menus.css';

function MenuSolicitante() {

  return (
    <>
      <section className="container-menu">
        <h2>Menu</h2>
        <NavLink to="/perfil">
          <button>Perfil</button>
        </NavLink>

        <NavLink to="/coletas-aceitas">
          <button>Coletas</button>
        </NavLink>

        <NavLink to="/historico-coletas">
          <button>Historico de Coletas</button>
        </NavLink>
      </section>
    </>
  );
}

export default MenuSolicitante;
