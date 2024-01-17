import { useState } from 'react'

import "../App.css"

function CardComponent({user}) {
  
  return (
  
      <div className='card'>
        <div className='card-contents' >
            <h2>{user.name}</h2>
            <h4>{user.desc}</h4>
            <div className='interests'>
                Interests
                <ul>
                    {user.interests.map(i=>(<p>{i}</p>))}
                </ul>
            </div>
            <div className='social'>
                <a href="">Linked In</a>
                <a href="">Twitter</a>
            </div>
        </div>
      </div>
      
  )
}

export default CardComponent;
