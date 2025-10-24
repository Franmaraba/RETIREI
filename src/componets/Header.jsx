import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from '../firebase/config.js';
import { useAuth } from '../contexts/AuthContext';
//import "./Header.css";
import '../App.css'

function Header({ pageTitle }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (window.confirm('realmente deseja sair?')) {
      try {
        await auth.signOut();
        console.log("Usuário deslogado com sucesso");
        navigate('/');
      } catch (error) {
        console.error("Erro ao sair:", error.message);
      }
    }
  };

  return (
    <section className="header-section">
      <div className="header-btns">
        <NavLink to="/solicitacao"><button className="btn">Solicitar Coleta</button></NavLink>
        <NavLink to="/user-prof"><button className="btn">Perfil</button></NavLink>
        <div className="user-info">
          {user && (
            <>
              <div className="user-details">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "Usuário"}
                    className="user-avatar"
                  />
                ) : (
                  <i className="fa fa-user user-icon"></i>
                )}
                <span>{user.displayName || user.email}</span>
              </div>
              <button onClick={handleSignOut} className="btn-exit">Sair</button>
            </>
          )}
        </div>
      </div>
      <h1>{pageTitle}</h1>
    </section>
    
  );
}

export default Header;
