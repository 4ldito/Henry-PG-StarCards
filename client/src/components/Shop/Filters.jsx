import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCardsPacks } from "../../redux/actions/cardsPack";

import style from "./styles/Filters.module.css";
import { BiFilterAlt } from "react-icons/bi";

const Filters = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    race: "allRaces",
    order: "",
    favs: "all",
  });
  const selectRace = useRef(null);
  const selectOrder = useRef(null);

  const user = useSelector((state) => state.userReducer.user);
  const userId = user.id;
  // if (!userId && e.target.name === 'favs' )
  const onSelectChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    setFilters({
      race: "allRaces",
      order: "",
      favs: "all",
    });
    selectRace.current.selectedIndex = 0;
    selectOrder.current.selectedIndex = 0;
  }

  useEffect(() => {
    dispatch(filterCardsPacks(filters));
  }, [filters]);

  return (
    <div className={style.container}>
      <button className={style.btnClearFilter}>
        <BiFilterAlt size={50} />
      </button>
      <button className={style.btn} onClick={handleClearFilters} value="favs" name="favs">
        Clear Filters
      </button>
      {userId ? (
        filters.favs === "all" ? (
          <button className={style.btn} onClick={onSelectChange} value="favs" name="favs">
            Show favorites
          </button>
        ) : (
          <button className={style.btn} onClick={onSelectChange} value="all" name="favs">
            Show all
          </button>
        )
      ) : (
        <></>
      )}

      <select ref={selectRace} onChange={onSelectChange} name="race" className={style.select}>
        <option value="allRaces">All races</option>
        <option value="Protoss">Protoss</option>
        <option value="Terran">Terran</option>
        <option value="Zerg">Zerg</option>
      </select>

      <select ref={selectOrder} onChange={onSelectChange} name="order" className={style.select}>
        <option hidden value="allPrices">Select order</option>
        <option value="priceDes">Price from highest to lowest</option>
        <option value="priceAsc">Price from lowest to highest</option>
        <option value="stockDes">Stock from highest to lowest</option>
        <option value="stockAsc">Stock from lowest to highest</option>
      </select>

      {/* <select onChange={onSelectChange} name='order'>
                <option hidden value='allStock'>Stock</option>
                
            </select> */}
    </div>
  );
};

export default Filters;
