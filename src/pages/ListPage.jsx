import React from 'react'
import { useParams } from 'react-router-dom'
import Lists from '../component/lists/Lists';

function ListPage() {
    const { id } = useParams();
  return (
    <div>
        <Lists boardId={id}/>
    </div>
  )
}

export default ListPage
