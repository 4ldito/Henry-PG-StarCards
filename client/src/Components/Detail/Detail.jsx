import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postOpinions } from '../../redux/actions/cards/postOpinions.js'
import {useNavigate} from 'react-router-dom'


export default function Detail (id) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const detailCard = useSelector(state => state.detailReducer.card)
    const opinion= useSelector(state => state.detailReducer.opinion)
    const cardId = detailCard.id
    const [input, setInput] = useState({
        comment:"",
        score: 0,
        cardId: 0,
        userId: 7
    })
    
    useEffect(() => {
        navigate("/detail")
    },[opinion])

    console.log('opinion', opinion)
    function handleInput (e) {
        setInput({
            ...input,
            cardId: detailCard.id,
            [e.target.name]: e.target.value
        })
    }
   
    let ratingSum = opinion.map(r => r.score).reduce((prev, curr) => prev + curr, 0)
    let rating = ratingSum / opinion.length
 
    function handleComment(e) {
        e.preventDefault()
        dispatch(postOpinions(input))
    }



    return (
        <div>
            <h3>{detailCard.name}</h3>
            <img src={detailCard.image} alt={detailCard.image} />
            <div>
                <p>cost:{detailCard.cost}</p>
                <p>Gdmg:{detailCard.Gdmg}</p>
                <p>Admg:{detailCard.Admg}</p>
                <p>life:{detailCard.life}</p>
                <p>ability:{detailCard.ability}</p>
                <p>abilities:{detailCard.abilities}</p>
                <p>race:{detailCard.race}</p>
                <p>movement:{detailCard.movement}</p>
            </div>
            <div>
                <p>rating: {rating.toFixed(1)}</p>
                <p>comments:</p>
                {
                    opinion.map((opinion) => {
                    return <p key={opinion.id}>{opinion.comment}</p>
                    })
                }
            </div>
            <form>
                <label >Comment: </label>
                <input type="text" name='comment' value={input.comment} onChange={e => handleInput(e)} />
                <label >Score: </label>
                <input type="number" name='score' value={input.score} onChange={e => handleInput(e)} />
                <button onClick={e => handleComment(e)}>Comment</button>
            </form>
        </div>
    )
}