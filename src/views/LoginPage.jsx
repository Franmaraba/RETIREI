import { auth } from '../firebase/config.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword
    ,signInWithEmailAndPassword 
    ,signInWithPopup
    ,GoogleAuthProvider
    ,sendPasswordResetEmail} from "firebase/auth"


function LoginPage() {

    const [loginType, setLoginType] = useState('login');
    const [userCredentials, setUserCredentials] = useState({})
    const [error, setError ] = useState('')
    const navigate = useNavigate();

    const dict_errors = {
        "auth/weak-password": "A senha é muito fraca. Exija pelo menos 6 caracteres, incluindo números e letras.",
        "auth/invalid-email": "O endereço de e-mail é inválido.",
        "auth/user-not-found": "Não foi encontrada nenhuma conta com este e-mail ou número de telefone.",
        "auth/wrong-password": "A senha está incorreta.",
        "auth/email-already-in-use": "O endereço de e-mail já está sendo usado por outra conta.",
        "auth/operation-not-allowed": "Esta operação não é permitida para este projeto.",
        "auth/user-disabled": "Esta conta de usuário foi desativada.",
        "auth/too-many-requests": "Muitas tentativas de login. Tente novamente mais tarde.",
        "auth/invalid-api-key": "A chave da API fornecida é inválida.",
        "auth/requires-recent-login": "É necessário fazer login recentemente para realizar esta ação.",
        "auth/invalid-credential" : "E-mail ou senha Inválida"
        // Adicione mais erros aqui conforme necessário
        }
    
        function handleCredenciais(e){
            setUserCredentials({...userCredentials,[e.target.name]:e.target.value})
            
        }

        function handleLogin(e) {
            e.preventDefault()
            setError('')
    
            signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log('usuário logado com sucesso: ', user.email)
                navigate('/');
            })
            .catch((error) => {
                setError( dict_errors[error.code] || error.message);
            });
        }

        const handleGoogleLogin = async(e) =>{
            e.preventDefault()
            setError('')
    
            try {
                const provider = new GoogleAuthProvider()
                const result = await signInWithPopup(auth, provider) 
    
                const user = result.user
                console.log (' Google login ok', user)
                navigate('/');
    
            } catch(error){
                //const errorCode = error.code;
                console.error('Google login failed:', error);
                setError( dict_errors[error.code] || error.message);
            }
    
        }
        
        function handlePasswordReset(){ 
            const email = prompt('Informe seu e-mail:') 
            sendPasswordResetEmail(auth, email) 
            alert("Verifique sua caixa de e-mail, inclusive a pasta Spam")
        }


    return(
        <>
            <div className="container login-page">
                <section>
                    <h1>Login</h1>
                    <form className="add-form login">

                        <div className="form-control">
                            <label>E-mail *</label>
                            <input onChange={(e) =>{handleCredenciais(e)}} type="email" name="email" placeholder="Informe seu email" required />
                        </div>

                        <div className="form-control">
                            <label>Senha *</label>
                            <input onChange={(e) =>{handleCredenciais(e)}} type="password" name="password" placeholder="Informe a senha" required />
                        </div>

                        <button onClick={(e)=>{handleLogin(e)}} className="active btn btn-block">Entrar</button>

                        <button  onClick={(e)=>{handleGoogleLogin(e)}} className="active btn btn-block">Login com Google</button>

                        {<div className='error'> {error}  </div>    }

                        <a href=''> <p onClick={handlePasswordReset} className="forgot-password">Esqueci minha senha.</p></a>

                        
                    </form>
                </section>
            </div>
        
        </>
    )
    
}

export default LoginPage;