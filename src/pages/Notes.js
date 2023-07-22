import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import NoteCard from '../Components/NoteCard';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1
}
const useStyle = makeStyles({
  container: {
    padding: '0!important'
  }
})

function Notes() {
  const [data, setData] = useState([]);

  async function deleteHandler(id) {
    await fetch('http://localhost:8000/notes/' + id, { method: 'DELETE'})
    let filteredData = data.filter(item => item.id !== id)
    setData(filteredData)
  }

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  const classes = useStyle()
  return (
    <Container className={classes.container}>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {!!data.length && data.map(item => (
          <div key={item.id}>
            <NoteCard item={item} deleteHandler={deleteHandler} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}

export default Notes;
