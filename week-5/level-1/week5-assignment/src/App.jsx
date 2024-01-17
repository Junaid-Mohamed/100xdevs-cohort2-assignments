import { useState } from 'react'

import './App.css'
import CardComponent from './components/CardComponent'

function App() {
  
  const user = {
    name :"Junaid",
    desc:"I'm a web dev learning react.",
    interests: ['chess','stock market'],
    linkedIn:"",
    twitter:""
  }
  const [userDetails,setUserDetails] = useState([]);

  return (
  
      <div>
       <CardComponent user={user}/>
      </div>
      
  )
}

export default App
