import logo from '../assets/Retirei.svg'
import { NavLink } from 'react-router-dom';
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
            <NavLink to="/login" ><button>Já tenho uma conta</button></NavLink>
            <NavLink to="/create-account"><button>Criar conta</button></NavLink>
            
            
        </div>
            
        
        
        </>
    )
    

    
}

export default HomePage;