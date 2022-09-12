import React from 'react'

const Input = (props) => {
    const {onChange}=props
  return (
    <input type="text" onChange={onChange}/>
  )
}

export default Input