import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Lists from '../component/lists/Lists';

function ListPage() {
    const { id, name } = useParams();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const image = queryParams.get('image');

  return (
    <div>
        <Lists boardId={id} boardName={name} backgroundImage={image}/>
    </div>
  )
}

export default ListPage;
