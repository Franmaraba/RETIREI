import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import Header from "../componets/Header";
import MenuColetor from "../componets/MenuColetora";
import MenuSolicitante from "../componets/MenuSolicitante";
import "./Perfil.css";

function PagePerfil() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [nome, setNome] = useState("");
  const [fotoURL, setFotoURL] = useState("");
  const [telefone, setTelefone] = useState("");

  const aplicarMascaraTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, ""); // Remove tudo que não é número
    if (numeros.length <= 10) {
      // Telefone fixo (10 dígitos)
      return numeros
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      // Celular (11 dígitos)
      return numeros
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };
  const handleTelefoneChange = (e) => {
    setTelefone(aplicarMascaraTelefone(e.target.value));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          setNome(data.nome || "");
          setFotoURL(data.fotoURL || "");
          setTelefone(data.telefone || "");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        nome,
        fotoURL,
        telefone,
      });
      alert("Perfil atualizado com sucesso!");
      setEditMode(false);
      setUserData((prev) => ({ ...prev, nome, fotoURL }));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao salvar alterações.");
    }
  };

  const isColetora = userData?.tipo === "coletora";

  return (
    <div className="perfil-wrapper">
      <Header pageTitle="Meu Perfil" />
      <main className="perfil-container">
        {isColetora && <MenuColetor />}
        {!isColetora && userData && <MenuSolicitante />}

        <section className="perfil-content">
          <h2>Informações do Perfil</h2>

          {!userData ? (
            <p>Carregando dados...</p>
          ) : (
            <div className="perfil-card">
              <div className="perfil-foto">
                {fotoURL ? (
                  <img src={fotoURL} alt="Foto do usuário" />
                ) : (
                  <div className="foto-placeholder">
                    <i className="fa fa-user"></i>
                  </div>
                )}
              </div>

              {editMode ? (
                <div className="perfil-form">
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <label>Telefone:</label>
                  <input
                    type="text"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    required
                  />

                  <label>URL da Foto:</label>
                  <input
                    type="text"
                    value={fotoURL}
                    onChange={(e) => setFotoURL(e.target.value)}
                  />

                  <div className="perfil-btns">
                    <button onClick={handleSave} className="btn-salvar">
                      Salvar
                    </button>
                    <button
                      className="btn-cancelar"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="perfil-info">
                  <p>
                    <strong>Nome:</strong> {userData.nome || "Não informado"}
                  </p>
                  <p>
                    <strong>Telefone:</strong>{" "}
                    {userData.telefone || "Não informado"}
                  </p>
                  <p>
                    <strong>Email:</strong> {auth.currentUser.email}
                  </p>
                  <p>
                    <strong>CPF/CNPJ:</strong>{" "}
                    {userData.cpfCnpj || "Desconhecido"}
                  </p>

                  <button
                    onClick={() => setEditMode(true)}
                    className="btn-editar"
                  >
                    Editar Perfil
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default PagePerfil;
