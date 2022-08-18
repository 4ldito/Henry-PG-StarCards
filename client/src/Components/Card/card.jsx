import React from 'react'

export default function Card ({ name, image, cost, Gdmg, Admg, life, ability, abilities, race, movement }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={image} />
      <div>
        <p>cost:{cost}</p>
        <p>Gdmg:{Gdmg}</p>
        <p>Admg:{Admg}</p>
        <p>life:{life}</p>
        <p>ability:{ability}</p>
        <p>abilities:{abilities}</p>
        <p>race:{race}</p>
        <p>movement:{movement}</p>
      </div>
    </div>
  )
}
