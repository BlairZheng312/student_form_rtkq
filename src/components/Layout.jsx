import React from 'react'
import Menu from './Menu'

export default function Layout(props) {
  return (
    <div>
        <Menu />
        <hr />
        {props.children}
    </div>
  )
}
