import React from 'react'
import Filters from './Filters';
import InventoryContainer from './InventoryContainer';
import Sort from './Sort';
import SearchUserCard from './SearchUserCard';


export default function Inventory() {


  return (<div>
            <div>
              <Filters />
              <Sort />
              <SearchUserCard />
            </div>
            <InventoryContainer />
        </div>);
}
