import React, { useState } from 'react'

function Home() {
    const [todo, setTodo] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    
  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
