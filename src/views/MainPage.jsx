import  Header  from '../componets/Header';
//import "./MainPage.css";
import '../App.css'

function MainPage() {

  const pageTitle = 'Pagina Inicial'

  return (
    <>
      <Header pageTitle={pageTitle}/>
      <div>
        <p className="text">Seja Bem-vindo!</p>
      </div>
    </>
  );
}

export default MainPage;
