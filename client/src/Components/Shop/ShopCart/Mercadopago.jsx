import React, { useEffect } from 'react'

const FORM_ID = 'payment-form'

export default function Mercadopago ({ preferenceId }) {

  useEffect(() => {
    if (preferenceId !== -1) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js'
      script.setAttribute('data-preference-id', preferenceId.id)
      const form = document.getElementById(FORM_ID)
      form.appendChild(script)
    }
  }, [preferenceId])

  return (
    <form id={FORM_ID} method='GET' />
  )
}
