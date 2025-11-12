import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ importa o hook
import Header from '../componets/Header';
import { db, auth } from '../firebase/config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore';
import '../global.css';
import MenuColetor from '../componets/MenuColetora';
import './PainelColetora.css';

function PainelColetora() {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ cria a função de navegação

  useEffect(() => {
    const buscarColetasPendentes = async () => {
      try {
        const q = query(collection(db, 'coletas'), where('status', '==', 'pendente'));
        const snapshot = await getDocs(q);
        const lista = [];
        snapshot.forEach((docItem) => {
          lista.push({ id: docItem.id, ...docItem.data() });
        });
        setColetas(lista);
      } catch (error) {
        console.error('Erro ao buscar coletas pendentes:', error);
      } finally {
        setLoading(false);
      }
    };
    buscarColetasPendentes();
  }, []);

  const atualizarStatus = async (id, novoStatus) => {
    try {
      const coletaRef = doc(db, 'coletas', id);
      await updateDoc(coletaRef, {
        status: novoStatus,
        empresaId: auth.currentUser.uid
      });
      setColetas((prev) => prev.map((c) => (c.id === id ? { ...c, status: novoStatus } : c)));

     
      navigate('/coletas-aceitas');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const pageTitle = 'Painel Coletora';

  return (
    <div className="painel-wrapper">
      <Header pageTitle={pageTitle} />
      <main className="painel-container">
        <section className="painel-content">

          {loading ? (
            <p>Carregando...</p>
          ) : coletas.length === 0 ? (
            <p>Não há solicitações pendentes.</p>
          ) : (
            <ul>
              {coletas.map((coleta) => (
                <li key={coleta.id} className="coleta-card">
                  <strong>Solicitante:</strong> {coleta.nomeSolicitante} <br />
                  <strong>Tipo:</strong> {coleta.tipoLixo} <br />
                  <strong>Quantidade:</strong> {coleta.quantidade} <br />
                  <strong>Endereço:</strong> {coleta.endereco} <br />
                  <strong>Status:</strong> {coleta.status} <br />
                  <div className="btns-coleta">
                    <button onClick={() => atualizarStatus(coleta.id, 'em andamento')}>
                      Aceitar Coleta
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default PainelColetora;
