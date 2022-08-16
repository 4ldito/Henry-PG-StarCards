import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const FORM_ID = 'payment-form'

export default function Mercadopago ({ shopCartItems }) {
  const { id } = useParams() // id de producto
  const [preferenceId, setPreferenceId] = useState(null)
  // const shopCartItems = useSelector(state => state.shopCartReducer.shopCart)

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post('http://localhost:3001/mercadopago/checkout', shopCartItems).then((order) => {
      console.log(order.data.id)
      setPreferenceId(order.data.id)
    })
  }, [id])

  useEffect(() => {
    console.log(preferenceId)
    if (preferenceId) {
      console.log('entra aca?')
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src =
        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
      script.setAttribute('data-preference-id', preferenceId)
      const form = document.getElementById(FORM_ID)
      form.appendChild(script)
      console.log('Se va a poner el script', script)
    }
  }, [preferenceId])

  return (
    <form id={FORM_ID} method='GET' />
  )
}
