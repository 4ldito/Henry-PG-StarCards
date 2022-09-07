import React from 'react'

import css from './Stats.module.css'
import ZERG from '../../img/zerg.svg'
import PROTOSS from '../../img/protoss.svg'
import TERRAN from '../../img/terran.svg'

export default function Stats() {
  return (
    <div className={css.containerTo}>
        <div className={css.div}>
            <img className={css.race} src={ZERG} alt="" />
            <span>ZERG</span>

            <div className={css.seccion}><strong>WINS:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>LOSES:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>TIES:</strong><span className={css.span}> 54</span></div>
        </div>
        
        <div className={css.div}>
            <img className={css.race} src={PROTOSS} alt="" />
            <span>PROTOSS</span>

            <div className={css.seccion}><strong>WINS:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>LOSES:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>TIES:</strong><span className={css.span}> 54</span></div>
        </div>

        <div className={css.div}>
            <img className={css.race} src={TERRAN} alt="" />
            <span>TERRAN</span>

            <div className={css.seccion}><strong>WINS:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>LOSES:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>TIES:</strong><span className={css.span}> 54</span></div>
        </div>

        <div className={css.div}>
            <div className={css.race}/>
            <span>TOTAL</span>

            <div className={css.seccion}><strong>WINS:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>LOSES:</strong><span className={css.span}> 54</span></div>
            <div className={css.seccion}><strong>TIES:</strong><span className={css.span}> 54</span></div>
        </div>
    </div>
  )
}
