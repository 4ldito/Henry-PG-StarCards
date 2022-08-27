
import { useEffect, useState } from 'react';
import style from './styles/Filters.module.css'
import { useDispatch } from 'react-redux';
import { filterCardsPacks } from '../../redux/actions/cardsPack';

const Filters = () => {

    const dispatch = useDispatch();

    const [filters, setFilters] = useState({ race: 'allRaces', order: '', favs:'all' });

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
            {
              filters.favs === 'all' ?
            <button onClick={onSelectChange} value='favs' name='favs'> Mostrar sólo favoritos </button>
            :
            <button onClick={onSelectChange} value='all' name='favs'> Mostrar todos </button>
            }
            <select onChange={onSelectChange} name='order'>
                <option hidden value='allPrices'>Precio</option>
                <option value='priceDes'>Mayor a Menor</option>
                <option value='priceAsc'>Menor a Mayor</option>
            </select>
            <select onChange={onSelectChange} name='order'>
                <option hidden value='allStock'>Stock</option>
                <option value='stockDes'>Mayor a Menor</option>
                <option value='stockAsc'>Menor a Mayor</option>
            </select>
        </div>
    )
}

export default Filters