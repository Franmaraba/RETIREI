import logo from "../assets/Retirei.png";
import celulares from "../assets/celulares-descartados.jpg";
import computadores from "../assets/computadores-descartados.jpg";
import pilhas from "../assets/pilhas-reciclagem.jpg";
import eletronico from "../assets/eletrodomesticos.jpg";
import sobreIcon from "../assets/icone-sobre.png";
import funcionaIcon from "../assets/funciona.ong.png";
import helpIcon from "../assets/help.png";
import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
//import "../global.css";
import "./HomePage.css";

function HomePage() {

    useEffect(() => {
        const links = document.querySelectorAll('.menu a[href^="#"]');
        links.forEach(link => {
          link.addEventListener("click", e => {
            e.preventDefault();
            const alvo = document.querySelector(link.getAttribute("href"));
            if (alvo) alvo.scrollIntoView({ behavior: "smooth" });
          });
        });
        return () => {
          links.forEach(link =>
            link.removeEventListener("click", () => {})
          );
        };
      }, []);
  return (
    <>
      <header className="hero">
        <div className="header-top">
          <h4 className="logo">
            <img src={logo} alt="Logo Retirei" />
          </h4>

          <nav className="menu">
          <a href="#sobre">Sobre</a>
            <a href="#funciona">Como funciona?</a>
            <a href="#suporte">Suporte</a>
            <NavLink to="/login">Entrar</NavLink>
            <NavLink to="/create-account">Cadastre-se</NavLink>
          </nav>
        </div>

        <div className="hero-text">
          <p>
            Cuide do <strong>futuro,</strong>
            <br /> descarte de forma
            <br />
            responsável.
          </p>
        </div>
      </header>

      <h3 class="titulo-descartes">Itens que podem ser descartados:</h3>

      <section class="features">
        <div class="feature">
          <h3>Celulares</h3>
          <img src={celulares} alt="Celulares" />
        </div>

        <div class="feature">
          <h3>Computadores</h3>
          <img src={computadores} alt="Computadores" />
        </div>

        <div class="feature">
          <h3>Pilhas e Baterias</h3>
          <img src={pilhas} alt="Pilhas e Baterias" />
        </div>

        <div class="feature">
          <h3>Eletrodomésticos</h3>
          <img src={eletronico} alt="Eletrodomésticos" />
        </div>
      </section>

      <section id="sobre" class="secao lado-esquerdo">
        <div class="texto">
          <h2>Sobre o projeto</h2>
          <p>
            Nosso sistema foi desenvolvido para facilitar o descarte consciente
            de eletrônicos, conectando pessoas que desejam descartar seus
            aparelhos de forma correta com empresas especializadas na coleta e
            reciclagem desses materiais. <br />
            <br />
            Por meio da plataforma, o usuário realiza uma solicitação de
            descarte, informando o tipo de equipamento e o local de retirada. As
            empresas cadastradas recebem essas solicitações, podendo agendar a
            coleta de maneira prática, rápida e segura. <br />
            <br />
            Além de simplificar o processo, o projeto incentiva a
            sustentabilidade e a responsabilidade ambiental, contribuindo para a
            redução de resíduos eletrônicos descartados de forma inadequada.
          </p>
        </div>
        <div class="icone">
          <img src={sobreIcon} alt="Ícone sobre o projeto" />
        </div>
      </section>

      <section id="funciona" class="secao lado-direito">
        <div class="icone">
          <img src={funcionaIcon} alt="Ícone de funcionamento" />
        </div>

        <div class="texto">
          <h2>
            Descartar eletrônicos ficou fácil com o Retirei. Mas como funciona?
          </h2>
          <p>
            Conectamos quem precisa descartar com quem sabe reciclar... 🔘
            Agende sua retirada agora e faça parte da mudança!
          </p>
        </div>
      </section>

      <section id="suporte" class="secao lado-esquerdo">
        <div class="texto">
          <h2>Suporte</h2>
          <p>
            Nossa equipe está pronta para te ajudar com qualquer dúvida sobre
            solicitações, agendamentos ou funcionamento da plataforma. <br />
            <br />
            Entre em contato pelos canais abaixo e retornaremos o mais rápido
            possível.
          </p>
          <br />
          <br />
          <p>📧 E-mail: suporte@retirei.com</p>
          <p>💬 WhatsApp: (11) 99999-9999</p>
          <p>🕐 Horário de atendimento: Segunda a sexta, das 8h às 18h</p>
          <p>
            📚 Central de Ajuda: <a href="#">Acessar FAQ</a>
          </p>
        </div>
        <div class="icone">
          <img src={helpIcon} alt="Ícone de suporte" />
        </div>
      </section>
    </>
  );
}

export default HomePage;
