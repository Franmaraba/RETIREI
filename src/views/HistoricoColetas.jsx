import { useEffect, useState } from "react";
import Header from "../componets/Header";
import MenuColetor from "../componets/MenuColetora";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./HistoricoColetas.css";

function HistoricoColetas() {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const q = query(
          collection(db, "coletas"),
          where("empresaId", "==", auth.currentUser.uid),
          where("status", "==", "concluída")
        );

        const snapshot = await getDocs(q);
        const lista = [];
        snapshot.forEach((docItem) => {
          lista.push({ id: docItem.id, ...docItem.data() });
        });
        setColetas(lista);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarHistorico();
  }, []);

  return (
    <div className="historico-wrapper">
      <Header pageTitle="Histórico de Coletas" />
      <main className="historico-container">
        <MenuColetor />

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
                  <strong>Solicitante:</strong> {coleta.nomeSolicitante} <br />
                  <strong>Tipo de Lixo:</strong> {coleta.tipoLixo} <br />
                  <strong>Quantidade:</strong> {coleta.quantidade} <br />
                  <strong>Endereço:</strong> {coleta.endereco} <br />
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
