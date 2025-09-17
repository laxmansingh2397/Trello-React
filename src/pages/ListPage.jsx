import React from 'react'
import { useParams } from 'react-router-dom'
import Lists from '../component/lists/Lists';

function ListPage() {
    const { id } = useParams();
    const {name} = useParams();
  return (
    <div>
        <Lists boardId={id} boardName={name}/>
    </div>
  )
}

export default ListPage
