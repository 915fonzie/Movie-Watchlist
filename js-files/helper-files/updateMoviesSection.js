
/* This function is used to be able to update the dom when item gets added or removed 
from watchlist without fetching the data from the api everytime */

function updateMoviesSection(localMovies) {
    const html = localMovies.map(movie => {
        const { Title, Runtime, Plot, Ratings, Genre, imdbID } = movie
        const movieInWatchlist = localStorage.getItem(`${imdbID}`)

        //checking to see if move has a poster and putting placeholder if it doesn't
        if (movie.Poster === 'N/A') {
            movie.Poster = 'images/poster-placeholder.png'
        }

        return `
                <div class="movie-container">
                    <img src='${movie.Poster}' class="poster-img"/>
                    <div>
                        <div class="title-rating">
                            <h3>${Title}</h3>
                            <p><img src="/icons/rating-star.svg"/> ${Ratings[0].Value.slice(0, 3)}</p>
                        </div>
                        <div class="runtime-genre-add">
                            <p>${Runtime}</p>
                            <p>${Genre}</p>
                            <a  data-id="${imdbID}">
                                <img src="${movieInWatchlist ? "/icons/remove.svg" : "/icons/add.svg"}"data-id="${imdbID}"/>
                             ${movieInWatchlist ? " Remove" : " Watchlist"}</a>
                        </div>
                        <p>${Plot}</p>
                    </div>
                </div>
             `
    }).join('')

    return html
}

export default updateMoviesSection