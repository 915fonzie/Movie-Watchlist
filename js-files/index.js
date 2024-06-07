import updateMoviesSection from "./helper-files/updateMoviesSection.js"

const apiKey = "37b2f8fd"
const searchInput = document.getElementById("search")
const moviesSection = document.getElementById("movies-section")
const formEl = document.getElementById("form")
let localMovies = []

formEl.addEventListener("submit", function (e) {
  e.preventDefault()

  // choosing to not reset search prompt for if user wants to modify what they searched
  renderMovies(searchInput.value)
})

document.addEventListener("click", function (e) {
  const movieId = e.target.dataset.id
  if (movieId && !localStorage.getItem(`${movieId}`)) {
    let targetMovie = localMovies.filter((movie) => movie.imdbID === movieId)
    localStorage.setItem(`${movieId}`, JSON.stringify(targetMovie[0]))
    moviesSection.innerHTML = updateMoviesSection(localMovies)
  } else if (movieId) {
    localStorage.removeItem(`${movieId}`)
    moviesSection.innerHTML = updateMoviesSection(localMovies)
  }
})

async function renderMovies(input) {
  //default prompt if no movies are found
  let html = `<p class="no-result">Unable to find what you're looking for. Please try another search.</p>`
  const movieDetails = await searchResults(input)
  localMovies = movieDetails
  if (movieDetails) {
    moviesSection.innerHTML = updateMoviesSection(localMovies)
  } else {
    moviesSection.innerHTML = html
  }
}

async function searchResults(searchInput) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
  const movies = await response.json()
  return getMovieDetails(movies)
}

async function getMovieDetails(allMovies) {
  //checking to see if any movies were found from search input
  if (allMovies.Response === "True") {
    const movies = allMovies.Search.map(async (movie) => {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
      return await response.json()
    })
    return Promise.all(movies) //waiting for all promises to complete before returning
  }
}
