import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Header from "../componets/Header";
import MenuColetor from "../componets/MenuColetora";
import MenuSolicitante from "../componets/MenuSolicitante";   
import PainelColetora from "../views/PainelColetora";
import PainelUsuario from "../views/PainelUsuario";
//import "./PainelPrincipal.css";

function PainelPrincipal() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    carregarDados();
    
  }, []);

  if (!userData) return <p>Carregando...</p>;

  return (
    <div className="painel-wrapper">
      <Header pageTitle="Painel Retirei" />

      <main className="painel-container">
        {/* Menu dinâmico */}
        {userData.tipo === "coletora" ? <MenuColetor /> : <MenuSolicitante />}

        {/* Conteúdo principal */}
        <section className="painel-content">
          {userData.tipo === "coletora" ? (
            <>
              <h2>Bem-vinda, {userData.nome}!</h2>
              <p className="p-paragrafo">Aqui estão suas coletas pendentes:</p>
              <PainelColetora /> 
            </>
          ) : (
            <>
              <h2>Bem-vindo(a), {userData.nome}!</h2>
              <p className="p-paragrafo">Gerencie suas solicitações abaixo:</p>
              <PainelUsuario />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default PainelPrincipal;
