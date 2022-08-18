import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PurchaseCompleted = () => {
  const [searchParams] = useSearchParams()
  const state = searchParams.get('state')
  console.log(state)
  return (
    <div>PurchaseCompleted
      <p>Tu compra esta {state}</p>
    </div>
  )
}

export default PurchaseCompleted
