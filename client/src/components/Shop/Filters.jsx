import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import style from './styles/Filters.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterCardsPacks } from '../../redux/actions/cardsPack';

const Filters = () => {

    const dispatch = useDispatch();

    const [filters, setFilters] = useState({ race: 'allRaces', order: '', favs:'all' });
    const user = useSelector((state) => state.userReducer.user);
    const userId = user.id;
    // if (!userId && e.target.name === 'favs' )
    const onSelectChange = (e) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value
      })
    }

    useEffect(() => {
      dispatch(filterCardsPacks(filters))
    }, [filters])

    return (
        <div className={style.container}>
            <select onChange={onSelectChange} name='race'>
                <option value='allRaces'>Todas las Razas</option>
                <option value='Protoss'>Protoss</option>
                <option value='Terran'>Terran</option>
                <option value='Zerg'>Zerg</option>
            </select>
            { userId ? (
              filters.favs === 'all' ? (
            <button onClick={onSelectChange} value='favs' name='favs'> Mostrar sólo favoritos </button>
              ): (
            <button onClick={onSelectChange} value='all' name='favs'> Mostrar todos </button>
              )
            ) : (
              ""
            )
            }
            <select onChange={onSelectChange} name='order'>
                <option hidden value='allPrices'>Seleccionar orden</option>
                <option value='priceDes'>Precio de mayor a menor</option>
                <option value='priceAsc'>Precio de menor a mayor</option>
                <option value='stockDes'>Stock de mayor a menor</option>
                <option value='stockAsc'>Stock de menor a mayor</option>
            </select>
            {/* <select onChange={onSelectChange} name='order'>
                <option hidden value='allStock'>Stock</option>
                
            </select> */}
        </div>
    )
}

export default Filters