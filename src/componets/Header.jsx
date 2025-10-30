import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config.js";
import { useAuth } from "../contexts/AuthContext";
import "../App.css";

function Header({ pageTitle }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.warn("Usuário não encontrado no Firestore");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    if (window.confirm("Realmente deseja sair?")) {
      try {
        await auth.signOut();
        console.log("Usuário deslogado com sucesso");
        navigate("/");
      } catch (error) {
        console.error("Erro ao sair:", error.message);
      }
    }
  };

  return (
    <section className="header-section">
      <div className="header-btns">
        <NavLink to="/solicitacao">
          <button className="btn">Solicitar Coleta</button>
        </NavLink>
        <NavLink to="/user-prof">
          <button className="btn">Perfil</button>
        </NavLink>

        <div className="user-info">
          {userData && (
            <>
              <div className="user-details">
                {userData.fotoURL ? (
                  <img
                    src={userData.fotoURL}
                    alt={userData.nome || "Usuário"}
                    className="user-avatar"
                  />
                ) : (
                  <i className="fa fa-user user-icon"></i>
                )}
                <span>{userData.nome || user.email}</span>
              </div>
              <button onClick={handleSignOut} className="btn-exit">
                Sair
              </button>
            </>
          )}
        </div>
      </div>
      <h1>{pageTitle}</h1>
    </section>
  );
}

export default Header;
