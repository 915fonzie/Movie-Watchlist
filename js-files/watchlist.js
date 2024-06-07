import updateMoviesSection from "./helper-files/updateMoviesSection.js"

const moviesSection = document.getElementById("movies-section")
let localMovies = []

if (localStorage.length > 0) {
  Object.keys(localStorage).forEach((movieId) => {
    if (localStorage.getItem(`${movieId}`)) {
      localMovies.unshift(JSON.parse(localStorage.getItem(`${movieId}`)))
    }
  })
  const html = updateMoviesSection(localMovies)
  moviesSection.innerHTML = html
} else {
  moviesSection.innerHTML = `
        <div class="empty-watchlist"> 
            <p>Your watchlist is looking a little empty...</p>
            <a href="../index.html"><img src="/icons/add.svg"/>Let's add some movies!</a>
        </div>
    `
}

document.addEventListener("click", function (e) {
  const movieId = e.target.dataset.id
  if (movieId && !localStorage.getItem(`${movieId}`)) {
    let targetMovie = localMovies.filter((movie) => movie.imdbID === movieId)
    localStorage.setItem(`${movieId}`, JSON.stringify(targetMovie[0]))
    moviesSection.innerHTML = updateMoviesSection(localMovies)
  } else if (movieId) {
    localStorage.removeItem(`${movieId}`)
    localMovies = localMovies.filter((movie) => !(movie.imdbID === movieId))
    if (localMovies.length < 1) {
      moviesSection.innerHTML = `
                 <div class="empty-watchlist"> 
                    <p>Your watchlist is looking a little empty...</p>
                    <a href="../index.html"><img src="/icons/add.svg"/>Let's add some movies!</a>
                </div>
            `
    } else {
      moviesSection.innerHTML = updateMoviesSection(localMovies)
    }
  }
})
