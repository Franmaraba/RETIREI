
import { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function CreateAccount() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('solicitante'); // ou 'coletora'
    const navigate = useNavigate();

    
    const handleCadastro = async (e) => {
        e.preventDefault();

    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            // Salva dados adicionais no Firestore
            await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            nome,
            email,
            tipo
            });

            // Redireciona para o painel correto
            if (tipo === 'solicitante') {
            navigate('/painel-usuario');
            } else {
            navigate('/painel-coletora');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error.message);
            alert('Erro ao cadastrar: ' + error.message);
        }
    };



    return(
        <>
        
            <div>
                <h2>Cadastro</h2>
                <form onSubmit={handleCadastro}>

                    <label>Tipo de usuário:</label>
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="solicitante">Solicitante</option>
                    <option value="coletora">Empresa Coletora</option>
                    </select>

                    <label>Nome:</label>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} required />

                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

                    <button type="submit">Cadastrar</button>
                </form>
                </div>

        </>
    );
    
}

export default CreateAccount;