import { useEffect, useState } from "react";
import Header from "../componets/Header";
import MenuColetor from "../componets/MenuColetora";
import MenuSolicitante from "../componets/MenuSolicitante";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import "./HistoricoColetas.css";

function HistoricoColetas() {
  const [userData, setUserData] = useState(null);
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState(null); // "coletor" ou "solicitante"

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        // 🔹 Primeiro buscamos os dados do usuário logado
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // 🔹 Busca coletas onde o usuário é empresa OU solicitante
        const qColetor = query(
          collection(db, "coletas"),
          where("empresaId", "==", uid),
          where("status", "==", "concluída")
        );

        const qSolicitante = query(
          collection(db, "coletas"),
          where("solicitanteId", "==", uid),
          where("status", "==", "concluída")
        );

        const [snapColetor, snapSolicitante] = await Promise.all([
          getDocs(qColetor),
          getDocs(qSolicitante),
        ]);

        let lista = [];

        if (!snapColetor.empty) {
          lista = snapColetor.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTipoUsuario("coletor");
        } else if (!snapSolicitante.empty) {
          lista = snapSolicitante.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTipoUsuario("solicitante");
        } else {
          setTipoUsuario("vazio");
        }

        setColetas(lista);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarHistorico();
  }, []);

  const isColetora = userData?.tipo === "coletora";
  //const isSolicitante = userData?.tipo ==="solicitante"

  return (
    <div className="historico-wrapper">
      <Header pageTitle="Histórico de Coletas" />
      <main className="historico-container">
        {/* Exibe o menu correspondente */}
        {!isColetora ? (<MenuSolicitante />) : (<MenuColetor />)}

        <section className="historico-content">
          <h2>Coletas Concluídas</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : coletas.length === 0 ? (
            <p>Não há coletas concluídas ainda.</p>
          ) : (
            <ul>
              {coletas.map((coleta) => (
                <li key={coleta.id} className="coleta-card">
                  {tipoUsuario === "coletor" ? (
                    <>
                      <strong>Solicitante:</strong> {coleta.nomeSolicitante} <br />
                    </>
                  ) : (
                    <>
                      <strong>Coletora:</strong> {coleta.nomeEmpresa || "—"} <br />
                    </>
                  )}
                  <strong>Tipo de Lixo:</strong> {coleta.tipoLixo} <br />
                  <strong>Quantidade:</strong> {coleta.quantidade} <br />
                  <strong>Status:</strong>{" "}
                  <span className="status-concluida">{coleta.status}</span> <br />
                  {coleta.dataConclusao && (
                    <p>
                      <strong>Data da Conclusão:</strong>{" "}
                      {new Date(coleta.dataConclusao.seconds * 1000).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default HistoricoColetas;
