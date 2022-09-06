import React, { useEffect, useRef } from 'react';

import style from '../styles/Mercadopago.module.css';

const FORM_ID = 'payment-form';

export default function Mercadopago({ preferenceId }) {

  const form = useRef(null);

  useEffect(() => {
    if (preferenceId !== -1) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId.id);
      if (form.current.childNodes.length) {
        while (form.current.firstChild) {
          form.current.removeChild(form.current.firstChild);
        }
      }
      form.current.appendChild(script);
    }
  }, [preferenceId])

  return (
    <form className={style.formContainer} ref={form} id={FORM_ID} method='GET' />
  )
}
