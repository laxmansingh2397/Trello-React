import React from 'react'
import Boards from '../component/boards/Boards'

const HomePage = () => {
    const title = "My Board | Trello";
  return (
    <div>
      <title>{title}</title>
      <Boards />
    </div>
  )
}

export default HomePage
