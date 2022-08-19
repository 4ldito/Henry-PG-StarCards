import React from 'react'
import { useFetchStarsPack } from '../../../hooks/useFetchStarsPack'
import { useFetchCardsPack } from './../../../hooks/useFetchCardsPack'

import PacksCard from './PacksCard'

const Packs = ({ type }) => {
  let pack
  if (type === 'starsPack') pack = useFetchStarsPack().starsPacks
  else pack = useFetchCardsPack().cardsPack

  return (
    <>
      <h2 style={{ color: 'red' }}>{type} Disponibles:</h2>
      {pack.map((p) => {
        return (
          <PacksCard
            key={p.id}
            pack={p}
            type={type}
          />
        )
      })}
    </>
  )
}

export default Packs
