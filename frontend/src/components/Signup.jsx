import React, { use, useState } from 'react'

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Welcome to Todos</h1>
      <p>Please sign up here</p>
    </div>
  )
}

export default Signup
