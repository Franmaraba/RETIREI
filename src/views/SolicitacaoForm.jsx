import { useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, getDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../global.css";

function SolicitacaoForm() {
  const [tipoLixo, setTipoLixo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      let nomeSolicitante = "";
      let telefoneSolicitante = "";

      if (userDoc.exists()) {
        const dados = userDoc.data();
        nomeSolicitante = dados.nome || "";
        telefoneSolicitante = dados.telefone || "";
      }

      await addDoc(collection(db, "coletas"), {
        solicitanteId: user.uid,
        nomeSolicitante,
        telefoneSolicitante,
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

      navigate("/");
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
          placeholder="*"
          required
        />

        <label>Quantidade:</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="*"
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
          placeholder="*"
          required
        />

        <button className="button-form" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Solicitar Coleta"}
        </button>
        <p>Os campos com * são de preenchimento obrigatório</p>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default SolicitacaoForm;
