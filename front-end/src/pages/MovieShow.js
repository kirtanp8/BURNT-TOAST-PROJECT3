import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RatingForm from '../components/RatingForm'

const MovieShow = () => {
  const [movie, setMovie] = useState([])
  const [genre, setGenre] = useState([])
  const [comments, setComments] = useState([])
  const { id } = useParams()
  

  useEffect(() => {
    async function fetchMovie() {
  
      const config = {
        method: 'get',
        url: `/api/movies/${id}`,
        headers: { }
      }
  
      const response = await axios(config)
      console.log(response.data)
      setGenre(response.data.genre)
      setComments(response.data.rating)
      setMovie(response.data)
    }
    fetchMovie()
  }, [id])

  return (
    <div className="movie-show-div">
      <div className="movie-show-img-div">
        <img src={movie.image} alt={movie.title} style={{ maxWidth: '70vh', maxHeight: '70vh' }}/>
      </div>
      <div className="movie-data-container-div">
        <h1>
          {movie.title}
        </h1>
        <div className="movie-info">
          <p>Director: {movie.director}</p>
          <p>Released: {movie.releaseYear}</p>
          <p>Description: {movie.description}</p>
          <p>Genre: {genre.join(', ')}</p>
          <p>Rating: {movie.averageRating}</p>
        </div>
        <div className="rate-n-review-div">
          <RatingForm />
        </div>
        <div className="comments-div">
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MovieShow
