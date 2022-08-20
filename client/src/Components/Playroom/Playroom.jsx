import React from 'react'
import useValidToken from './../../hooks/useValidToken';

export default function Playroom() {

  useValidToken({ navigate: true });


  return (
    <div>
      <div> esto es la playroom</div>
    </div>
  )
}
