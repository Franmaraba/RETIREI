import { useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import '../global.css'

function SolicitacaoForm() {
  const [ tipoLixo, setTipoLixo ]  = useState("");
  const [ quantidade, setQuantidade ] = useState("");
  const [ observacoes, setObservacoes ] = useState("");
  const [ endereco, setEndereco ] = useState("");
  const [ loading, setLoading ] = useState("");
  const [ mensagem, setMensagem ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, "coletas"), {
        solicitanteId: user.uid,
        tipoLixo,
        quantidade: parseInt(quantidade),
        observacoes,
        endereco,
        status: "pendente",
        dataSolicitacao: Timestamp.now(),
      });

      setMensagem("Solicitação enviada com sucesso!");
      setTipoLixo("");
      setQuantidade("");
      setObservacoes("");
      setEndereco("");
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      setMensagem("Erro ao enviar solicitação.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Solicitar Coleta de Lixo Eletrônico</h2>

      <form onSubmit={handleSubmit}>
        <label>Tipo de lixo eletrônico:</label>
        <input
          type="text"
          value={tipoLixo}
          onChange={(e) => setTipoLixo(e.target.value)}
          required
        />

        <label>Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        <label>Observações:</label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />

        <label>Endereço para coleta:</label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Solicitar Coleta"}
        </button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default SolicitacaoForm;
