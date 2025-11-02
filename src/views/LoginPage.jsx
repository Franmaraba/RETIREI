import { auth, db } from "../firebase/config.js";
import logo from "../assets/Retirei.png";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  /*signInWithPopup,
  GoogleAuthProvider,*/
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../global.css";

function LoginPage() {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dict_errors = {
    "auth/weak-password":
      "A senha é muito fraca. Exija pelo menos 6 caracteres, incluindo números e letras.",
    "auth/invalid-email": "O endereço de e-mail é inválido.",
    "auth/user-not-found":
      "Não foi encontrada nenhuma conta com este e-mail ou número de telefone.",
    "auth/wrong-password": "A senha está incorreta.",
    "auth/email-already-in-use":
      "O endereço de e-mail já está sendo usado por outra conta.",
    "auth/operation-not-allowed":
      "Esta operação não é permitida para este projeto.",
    "auth/user-disabled": "Esta conta de usuário foi desativada.",
    "auth/too-many-requests":
      "Muitas tentativas de login. Tente novamente mais tarde.",
    "auth/invalid-api-key": "A chave da API fornecida é inválida.",
    "auth/requires-recent-login":
      "É necessário fazer login recentemente para realizar esta ação.",
    "auth/invalid-credential": "E-mail ou senha Inválida",
  };

  function handleCredenciais(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  // 🔹 LOGIN COM EMAIL E SENHA
  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      const user = userCredential.user;

      console.log("Usuário logado:", user.email);

      // 🔍 Busca o tipo de usuário no Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const tipo = userDoc.data().tipo;

        // 🚀 Redireciona para o painel correto
        if (tipo === "solicitante") {
          navigate("/painel-usuario");
        } else {
          navigate("/painel-coletora");
        }
      } else {
        console.warn("Documento de usuário não encontrado no Firestore.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(dict_errors[error.code] || error.message);
    }
  }

  //  LOGIN COM GOOGLE
  /*async function handleGoogleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Login com Google:", user.email);

      //  Busca o tipo no Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const tipo = userDoc.data().tipo;

        if (tipo === "solicitante") {
          navigate("/painel-usuario");
        } else {
          navigate("/painel-coletora");
        }
      } else {
        console.warn(
          "Usuário não encontrado no Firestore, redirecionando para cadastro."
        );
        navigate("/create-account");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      setError(dict_errors[error.code] || error.message);
    }
  }*/

  // 🔹 RESET DE SENHA
  function handlePasswordReset() {
    const email = prompt("Informe seu e-mail:");
    if (!email) return;
    sendPasswordResetEmail(auth, email);
    alert("Verifique sua caixa de e-mail, inclusive a pasta Spam.");
  }

  return (

    
    <div className="container login-page">
      <h4 className="logopage">
        <NavLink to="/"><img src={logo} alt="Logo Retirei" /></NavLink>
                  
                </h4>
      
      <section>

        <form className="add-form login">
        <h2>Login</h2>
          <div className="form-control">
            <label>E-mail *</label>
            <input
              onChange={handleCredenciais}
              type="email"
              name="email"
              placeholder="Informe seu email"
              required
            />
          </div>

          <div className="form-control">
            <label>Senha *</label>
            <input
              onChange={handleCredenciais}
              type="password"
              name="password"
              placeholder="Informe a senha"
              required
            />
          </div>

          <button onClick={handleLogin} className="active btn btn-block">
            Entrar
          </button>
          {/*<button onClick={handleGoogleLogin} className="active btn btn-block">
            Login com Google
          </button>*/}

          {error && <div className="error">{error}</div>}
          <a href="" onClick={handlePasswordReset} className="forgot-password">
            Esqueci minha senha.
          </a>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
