import React from 'react'

export default function My_Trips() {
    const user = JSON.parse(localStorage.getItem('curruser'));
    console.log(user.email);
  return (
    <div>
      my
    </div>
  )
}
