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
            Cuide do <strong>futuro,</strong>
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
            info="Antes de se desfazer do seu aparelho, remova todos os dados pessoais e faça um backup. Retire o chip e o cartão de memória. Procure pontos de coleta autorizados, como lojas de eletrônicos, operadoras ou programas de reciclagem, para garantir que os materiais tóxicos não contaminem o meio ambiente. Lembre-se: celulares contêm metais valiosos que podem ser reaproveitados se descartados corretamente."
          />

          <FeatureCard
            title="Computadores"
            img={computadores}
            info="Placas, HDs e fios podem ser reaproveitados e reciclados."
          />

          <FeatureCard
            title="Pilhas e Baterias"
            img={pilhas}
            info="Contêm compostos tóxicos e precisam de descarte especial."
          />

          <FeatureCard
            title="Eletrodomésticos"
            img={eletronico}
            info="Plásticos, motores e metais podem ser reciclados adequadamente."
          />
        </section>
      </div>

      <section id="sobre" className="secao lado-esquerdo">
        <div className="texto">
          <h2>Sobre o projeto</h2>
          <p>
            Nosso sistema foi desenvolvido para facilitar o descarte consciente
            de eletrônicos [...]
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
          <p>Conectamos quem precisa descartar com quem sabe reciclar...</p>
        </div>
      </section>

      <section id="suporte" className="secao lado-esquerdo">
        <div className="texto">
          <h2>Suporte</h2>
          <p>Nossa equipe está pronta para te ajudar...</p>
        </div>
        <div className="icone">
          <img src={helpIcon} className="icon-white" alt="" />
        </div>
      </section>
    </>
  );
}

export default HomePage;
