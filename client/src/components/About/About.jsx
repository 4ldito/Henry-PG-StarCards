import React, { useEffect } from "react";
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
              Starcards is a card game based on the Starcraft universe.
              The famous science fiction strategy game is recreated in a card
              game format in which participants can buy packs of cards, assemble
              their decks and compete against other players online  choosing
              their favorite characters.
            </p>
            <p>
              We developed this idea for the final group project of Henry's full
              stack development career. Starcards appeared as an idea of ​​one of
              the participants and was strengthened with the experiences and knowledge
              of each one of the participants. The team is made up of Aldo Aliscioni,
              Antu D'Ippolito, Emerson Edward Villalta, Emiliano Aparicio, Fabián Santos,
              Lautaro Pérez and Manuel Losada.
            </p>
            <p>
              For the development of Starcards we use technologies learned at Henry as
              well as new tools that we acquire to improve the user experience.
              However, Starcards is not only what we learned in terms of web development
              but also what we learned as a result of intense collective work for a
              few weeks. This process, difficult to see only by browsing our page,
              was essential to gain knowledge of teamwork, planning and workflow.
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
            <div className={css.containerPeople} key={people.name}>
              <div className={css.containerImagePeople}>
                <img src={people.image} className={css.imagePeople} />
              </div>
              <div className={css.containerDataPeople}>
                <h4>{people.name}</h4>
                {/* <p>{people.summary}</p> */}
                <div>
                  <a href={people.linkedin} target="_blank">
                    <button className={css.btnLink}>
                      LinkedIn
                    </button>
                  </a>
                  <a href={people.github} target="_blank">
                    <button className={css.btnLink}>
                      GitHub
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

