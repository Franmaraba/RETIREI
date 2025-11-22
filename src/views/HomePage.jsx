import logo from "../assets/Retirei.png";
import celulares from "../assets/celulares-descartados.jpg";
import computadores from "../assets/computadores-descartados.jpg";
import pilhas from "../assets/pilhas-reciclagem.jpg";
import eletronico from "../assets/eletrodomesticos.jpg";
import sobreIcon from "../assets/icone-sobre.png";
import funcionaIcon from "../assets/funciona.ong.png";
import helpIcon from "../assets/help.png";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

/* ============================
   COMPONENTE FeatureCard
============================ */
function FeatureCard({ title, img, info }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="card-inner">
        <div className="card-front">
          <h3>{title}</h3>
          <img src={img} alt={title} />
        </div>

        <div className="card-back">
          <h3>{title}</h3>
          <p>{info}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================
   COMPONENTE PRINCIPAL: HomePage
============================ */
function HomePage() {

  useEffect(() => {
    const links = document.querySelectorAll('.menu a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const alvo = document.querySelector(link.getAttribute("href"));
        if (alvo) alvo.scrollIntoView({ behavior: "smooth" });
      });
    });

    return () => {
      links.forEach((link) =>
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
            Cuide do <strong>futuro</strong>,
            <br /> descarte de forma
            <br />
            responsável.
          </p>
        </div>
      </header>

      <div className="hero2">
        <h3 className="titulo-descartes">Itens que podem ser descartados:</h3>

        <section className="features">
          <FeatureCard
            title="Celulares"
            img={celulares}
            info="Antes de descartar o aparelho, apague os dados, faça backup e retire chip e cartão. Entregue-o em pontos de coleta autorizados para evitar danos ao ambiente e permitir a reciclagem dos metais."


          />

          <FeatureCard
            title="Computadores"
            img={computadores}
            info="Antes de descartar o computador, apague os dados, faça backup e remova itens pessoais. Entregue-o em pontos de coleta autorizados para evitar impactos ambientais e permitir a reciclagem."
          />

          <FeatureCard
            title="Pilhas e Baterias"
            img={pilhas}
            info="Antes de descartar pilhas e baterias, verifique se estão vazando e armazene-as em local seguro. Leve-as a pontos de coleta autorizados para evitar contaminação do solo e da água e garantir a reciclagem dos materiais."
          />

          <FeatureCard
            title="Eletrodomésticos"
            img={eletronico}
            info="Antes de descartar eletrodomésticos, retire itens pessoais e separe peças úteis, como: cabos, botões, plástico e etc. Leve-os a pontos de coleta autorizados para evitar danos ambientais e permitir a reciclagem.

"
          />
        </section>
      </div>

      <section id="sobre" className="secao lado-esquerdo">
        <div className="texto">
          <h2>Sobre o projeto</h2>
          <p>
           Nosso sistema foi desenvolvido para facilitar o descarte consciente de eletrônicos, conectando pessoas que desejam descartar seus aparelhos de forma correta com empresas especializadas na coleta e reciclagem desses materiais. 
          </p>
        </div>
        <div className="icone">
          <img src={sobreIcon} className="icon-white" alt="" />
        
        </div>
      </section>

      <section id="funciona" className="secao lado-direito">
        <div className="icone">
          <img src={funcionaIcon} className="icon-white" alt="" />
        </div>

        <div className="texto">
          <h2>Descartar eletrônicos ficou fácil com o Retirei.</h2>
          <p>Por meio da plataforma, o usuário realiza uma solicitação de descarte, informando o tipo de equipamento e o local de retirada. As empresas cadastradas recebem essas solicitações, podendo agendar a coleta de maneira prática, rápida e segura.
<br /> <br />
Além de simplificar o processo, o projeto incentiva a sustentabilidade e a responsabilidade ambiental, contribuindo para a redução de resíduos eletrônicos descartados de forma inadequada.</p>
        </div>
      </section>

      <section id="suporte" className="secao lado-esquerdo">
        <div className="texto">
          <h2>Suporte</h2>
          <p>Nossa equipe está pronta para te ajudar! Estamos à disposição para te ajudar e ajudar ao meio ambiente. <br /> <br /> Caso tenha dúvidas entre em contato no e-mail: suporte@retirei.com</p>
        </div>
        <div className="icone">
          <img src={helpIcon} className="icon-white" alt="" />
        </div>
      </section>
    </>
  );
}

export default HomePage;
