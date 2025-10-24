// Código React - PainelColetora.jsx
import { useEffect, useState } from 'react';
import  Header  from '../componets/Header';
import { db, auth } from '../firebase/config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore';

function PainelColetora() {
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    const buscarColetasPendentes = async () => {
      try {
        const q = query(
          collection(db, 'coletas'),
          where('status', '==', 'pendente')
        );

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

      // Atualiza a lista local
      setColetas((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: novoStatus } : c
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const pageTitle = 'Painel Coletora'

  return (
    <div>
      <Header pageTitle={pageTitle}/>
      
      <h2>Solicitações Pendentes</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : coletas.length === 0 ? (
        <p>Não há solicitações pendentes.</p>
      ) : (
        <ul>
          {coletas.map((coleta) => (
            <li key={coleta.id}>
              <strong>Solicitante:</strong> {coleta.solicitanteId} <br />
              <strong>Tipo:</strong> {coleta.tipoLixo} <br />
              <strong>Quantidade:</strong> {coleta.quantidade} <br />
              <strong>Endereço:</strong> {coleta.endereco} <br />
              <strong>Status:</strong> {coleta.status} <br />
              <button onClick={() => atualizarStatus(coleta.id, 'em andamento')}>
                Aceitar Coleta
              </button>
              <button onClick={() => atualizarStatus(coleta.id, 'concluída')}>
                Marcar como Concluída
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PainelColetora;