import { useState } from "react";
import logo from "../assets/Retirei.png";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import "../global.css";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState();
  const [tipo, setTipo] = useState("solicitante"); // ou 'coletora'
  const navigate = useNavigate();

  const aplicarMascaraCpfCnpj = (valor) => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 11) {
      // CPF
      return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // CNPJ
      return numeros
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
  };

  const handleCpfCnpjChange = (e) => {
    setCpfCnpj(aplicarMascaraCpfCnpj(e.target.value));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // Salva dados adicionais no Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nome,
        cpfCnpj,
        email,
        tipo,
      });

      // Redireciona para o painel correto
      if (tipo === "solicitante") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error.message);
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <>
      <div>
        <h4 className="logopage">
          <NavLink to="/">
            <img src={logo} alt="Logo Retirei" />
          </NavLink>
        </h4>
        <form onSubmit={handleCadastro}>
          <h2>Cadastro</h2>

          <label>Tipo de usuário:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="solicitante">Solicitante</option>
            <option value="coletora">Empresa Coletora</option>
          </select>

          <div className="form-control">
            <label>Nome:</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Informe o seu nome"
              required
            />
          </div>
          <div className="form-control">
            <label>CPF/CNPJ:</label>
            <input
              type="text"
              value={cpfCnpj}
              onChange={handleCpfCnpjChange}
              placeholder="Digite seu CPF ou CNPJ"
              maxLength={18}
              required
            />
          </div>

          <div className="form-control">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o seu e-mail"
              required
            />
          </div>

          <div className="form-control">
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a sua senha"
              required
            />
          </div>

          <button className="button-submit" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;
