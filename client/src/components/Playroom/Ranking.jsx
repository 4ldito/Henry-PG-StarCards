import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRanking } from "../../redux/actions/user";

import style from "./Ranking.module.css";

const Ranking = () => {
  const dispatch = useDispatch();

  const usersRanking = useSelector((state) => state.userReducer.usersRanking);

  useEffect(() => {
    dispatch(getRanking());
  }, []);

  if (!usersRanking?.length) return <p>Loading..</p>;

  return (
    <div className={style.container}>
      <h3>Ranking</h3>
      <div className={style.infoContainer}>
        <div className={style.columnsContainer}>
          <p>Rank</p>
          <p>Username</p>
          <p>Score</p>
        </div>
        <div className={style.usersContainer}>
          {usersRanking.map((u, i) => {
            i = i + 1;
            if (i < 10) i = `0${i}`;
            return (
              <div className={style.userContainer} key={u.id}>
                <p>{i}</p>
                <Link to={`/userProfile?username=${u.username}`}>
                  {u.username}
                </Link>
                <p>{u.score}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
