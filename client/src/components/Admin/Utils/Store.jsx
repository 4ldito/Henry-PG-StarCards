import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCardsPacks } from '../../../redux/actions/cardsPack'
import { getStarsPacks } from '../../../redux/actions/starsPacks'

function Store() {
    const dispatch = useDispatch()
    const cardPacks = useSelector((state) => state.cardsPacksReducer.cardsPacks)
    const starPacks = useSelector((state) => state.starsPackReducer.starsPacks)

    useEffect(() => {
        !cardPacks && dispatch(getCardsPacks())
        !starPacks && dispatch(getStarsPacks())
    }, [])
    
  return (
    <>
    <div>
        {<ul >
            {cardPacks.map((c) =>
                        <li key={c.id}>
                          {/* <label> Id: </label> {c.id}  */}
                          <label> Name: </label> {c.name} 
                          <label> Price: </label> {c.price} 
                          <label> Stock: </label> {c.stock} 
                        </li>
                    )}
        </ul >}
    </div>
    <div>
        {<ul >
            {starPacks.map((s) =>
                        <li key={s.id}>
                          {/* <label> Id: </label> {s.id}  */}
                          <label> Name: </label> {s.name} 
                          <label> Price: </label> {s.price} 
                          <label> Stars: </label> {s.stars} 
                        </li>
                    )}
        </ul >}
    </div>
    </>
  )
}

export default Store