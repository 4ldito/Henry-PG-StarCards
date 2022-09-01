import React, { useEffect }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { team } from "./team";
import { getUser } from "../../redux/actions/user";
import { BsChevronDown } from "react-icons/bs";
import css from "./About.module.css";

export default function About() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user.id !== undefined) dispatch(getUser(user.id));
  }, []);
  
  return (
    <div className={css.containerAll}>
      <div className={css.containerAbout}>
        <div className={css.about}>
          <div className={css.containerImage}>
            <img src="https://firebasestorage.googleapis.com/v0/b/starcardsv2.appspot.com/o/packs%2FBunker%20Terran?alt=media&token=7741703c-7122-4d4f-9911-cfb84c6244d3" />
          </div>
          <div className={css.InfoAbout}>
            <h1>Sobre Starcards</h1>
            <p>
              Starcards es un juego de cartas basado en el universo Starcraft.
              El reconocido juego de estrategia de ciencia ficción se recrea en
              un formato de juego de cartas en el que los participantes podrán
              comprar packs de cartas, armar sus mazos y competir con otros
              jugadores online eligiendo a sus personajes preferidos.
            </p>
            <p>
              Desarrollamos esta idea para el proyecto grupal final de la
              carrera de desarrollo full stack de Henry. Starcards surgió como
              idea de uno de los participantes y se fue potenciando con las
              experiencias y conocimientos de cada uno. El equipo lo conformamos
              Aldo Aliscioni, Antu D’Ippolito, Emerson Edward Villalta, Emiliano
              Aparicio, Fabián Santos, Lautaro Pérez y Manuel Losada.
            </p>
            <p>
              Para el desarrollo de Starcards utilizamos tecnologías aprendidas
              en Henry así como también nuevas herramientas en las que nos
              aventuramos para mejorar la experiencia de usuario. Sin embargo,
              Starcards no expresa solamente lo aprendido en términos de
              desarrollo web sino también la formación que tuvimos como fruto de
              un intenso trabajo colectivo durante algunas semanas. Este
              proceso, difícil de ver solamente navegando en nuestra página, fue
              fundamental para adquirir conocimientos de trabajo en equipo,
              planificación y flujo de trabajo.
            </p>
            {/* <br />
          <p>
            Esperamos que este producto les guste tanto como a nosotros. No
            duden en dejarnos su feedback para seguir mejorando.
          </p> */}
          </div>
        </div>
      </div>
      <a href="#containerTeam" className={css.medium}>
        <h1>THE TEAM BEHIND STARCARDS</h1>
        <BsChevronDown size={35} id="arrow" className={css.arrow} />
      </a>
      <div id="containerTeam" className={css.containerTeam}>
        <div className={css.containerPeoples}>
          {team.map((people) => (
            <div className={css.containerPeople}>
              <div className={css.containerImagePeople}>
                <img src={people.image} className={css.imagePeople} />
              </div>
              <div className={css.containerDataPeople}>
                <h4>{people.name}</h4>
                <p>{people.summary}</p>
                <div>
                  <button className={css.btnLink}>
                    <a href={people.linkedin} target="_blank">
                      LinkedIn
                    </a>
                  </button>
                  <button className={css.btnLink}>
                    <a href={people.github} target="_blank">
                      GitHub
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

