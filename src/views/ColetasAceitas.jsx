import { useEffect, useState } from "react";
import Header from "../componets/Header";
import MenuColetor from "../componets/MenuColetora";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
//import "./ColetasAceitas.css";

function ColetasAceitas() {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarColetasAceitas = async () => {
      try {
        const q = query(
          collection(db, "coletas"),
          where("empresaId", "==", auth.currentUser.uid),
          where("status", "==", "em andamento")
        );

        const snapshot = await getDocs(q);
        const lista = [];
        snapshot.forEach((docItem) => {
          lista.push({ id: docItem.id, ...docItem.data() });
        });
        setColetas(lista);
      } catch (error) {
        console.error("Erro ao buscar coletas aceitas:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarColetasAceitas();
  }, []);

  const marcarConcluida = async (id) => {
    try {
      const coletaRef = doc(db, "coletas", id);
      await updateDoc(coletaRef, { status: "concluída" });

      setColetas((prev) => prev.filter((c) => c.id !== id));
      alert("Coleta marcada como concluída!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="coletas-wrapper">
      <Header pageTitle="Coletas Aceitas" />
      <main className="coletas-container">
        <MenuColetor />

        <section className="coletas-content">
          <h2>Coletas em Andamento</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : coletas.length === 0 ? (
            <p>Nenhuma coleta aceita no momento.</p>
          ) : (
            <ul>
              {coletas.map((coleta) => (
                <li key={coleta.id} className="coleta-card">
                  <strong>Solicitante:</strong> {coleta.nomeSolicitante} <br />
                  <strong>Tipo de Lixo:</strong> {coleta.tipoLixo} <br />
                  <strong>Quantidade:</strong> {coleta.quantidade} <br />
                  <strong>Endereço:</strong> {coleta.endereco} <br />
                  <strong>Status:</strong>{" "}
                  <span className="status-andamento">{coleta.status}</span> <br />
                  <button
                    onClick={() => marcarConcluida(coleta.id)}
                    className="btn-concluir"
                  >
                    Marcar como Concluída
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default ColetasAceitas;
