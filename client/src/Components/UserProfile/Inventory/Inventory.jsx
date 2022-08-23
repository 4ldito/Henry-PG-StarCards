import React from 'react'
import Filters from './Filters';
import InventoryContainer from './InventoryContainer';
import Sort from './Sort';


export default function Inventory() {


  return (<div>
            <div>
              <Filters />
              {/* <Sort /> */}
            </div>
            <InventoryContainer />
        </div>);
}
