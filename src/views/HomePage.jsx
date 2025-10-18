import logo from '../assets/Retirei.svg'
import { NavLink, Link } from 'react-router-dom';
import '../global.css'

function HomePage () {


    return(
        <>

        <div className='container'>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <p>Cuide do <strong>futuro</strong>, descarte de forma responsável</p>

            <p>Seja bem Vindo</p>
            <Link to="/login" ><button>Já tenho uma conta</button></Link>
            <Link to="/create-account"><button>Criar conta</button></Link>
            
            
        </div>
            
        
        
        </>
    )
    

    
}

export default HomePage;