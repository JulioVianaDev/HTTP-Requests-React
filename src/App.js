import React,{useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  
  const [movies,setMovies] = useState([])
  const [isLoading,setIsLoading]= useState(false)
  const [error,setError] = useState(null)
  
  
  const fetchMovies=useCallback(async function(){
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      if (response.ok){
        throw new Error('somethins was wrong')
      }
      const data =await  response.json();  
      const transformedMovies = data.results.map(movieData=>{
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })      
      setMovies(transformedMovies)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
    }
   
  })
  useEffect(()=>{
    fetchMovies()
  },[fetchMovies])
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length ===0 && 'não achei nenhum filme' }
        {!isLoading ? <MoviesList movies={movies}/> :'loading'}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
