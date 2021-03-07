import { render } from '@testing-library/react';
import React from 'react'

const Movies = ({movieData}) => {
    const Movie = ({title,poster,year}) =>(
        <div className='movie'>
            <p>{title}</p>
            <p>{year}</p>
          <div>
            <img src={poster}/>
          </div>
        </div>
      );
      function renderMovies(){
        let movieList = [];
        if (movieData!=null){
            movieData.forEach((movie)=>{
                let title = movie['Title']
                let poster = movie['Poster']
                let year = movie['Year']
                movieList.push(<Movie title={title} poster={poster} year={year}/>)
            })}
        return movieList;   
    }
    render()
        return <div >{renderMovies()}</div>
    
    
}

export default Movies;
