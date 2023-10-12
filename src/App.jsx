import React, { useEffect, useState } from "react"

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_BASEURL
const IMG_URL = import.meta.env.VITE_API_IMAGEURL

function App() {
    const [movies, setMovies] = useState([])
    const [highestRatedmovies, setHighestRatedMovies] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                // Menggunakan map untuk mengubah data yang diambil
                const modifiedMovies = data.results.map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    releaseDate: movie.release_date,
                    voteAverage: movie.vote_average,
                    image: movie.poster_path,
                }))

                // Menggunakan filter untuk menampilkan film dengan rating lebih dari 7
                const highRatedMovies = modifiedMovies.filter(
                    (movie) => movie.voteAverage > 7
                )

                // Menggunakan reduce untuk menghitung total rating dari semua film
                const totalRating = modifiedMovies.reduce(
                    (acc, movie) => acc + movie.voteAverage,
                    0
                )

                // Menggunakan find untuk mencari film dengan ID tertentu
                const movieToFind = modifiedMovies.find(
                    (movie) => movie.id === 12345
                ) // Ganti 12345 dengan ID film yang diinginkan

                setMovies(modifiedMovies)
                setHighestRatedMovies(highRatedMovies)

                console.log(
                    "Daftar Film dengan Rating Tinggi:",
                    highRatedMovies
                )
                console.log("Total Rating Semua Film:", totalRating)
                console.log("Film dengan ID 12345:", movieToFind)
            })
            .catch((error) => {
                console.error("Terjadi kesalahan:", error)
            })
    }, [])

    return (
        <div className="App">
            <h1 className="mt-2 w-40 text-lg font-semibold md:w-60 md:text-2xl">
                Film Now Playing
            </h1>
            <div className="flex flex-nowrap gap-6 overflow-x-auto p-2">
                {movies.map((movie) => (
                    <div
                        className="relative flex-none justify-center text-center"
                        key={movie.id}
                    >
                        <img
                            src={`${IMG_URL}${movie.image}`}
                            className="h-60 w-40 rounded-lg md:h-80 md:w-60"
                        />
                        <h2 className="mt-2 w-40 text-sm font-semibold md:w-60 md:text-2xl">
                            {movie.title}
                        </h2>
                    </div>
                ))}
            </div>
            <h1 className="mt-2 w-40 text-lg font-semibold md:w-60 md:text-2xl">
                Highest Rated Films
            </h1>
            <div className="flex flex-nowrap gap-6 overflow-x-auto p-2">
                {highestRatedmovies.map((movie) => (
                    <div
                        className="relative flex-none justify-center text-center"
                        key={movie.id}
                    >
                        <img
                            src={`${IMG_URL}${movie.image}`}
                            className="h-60 w-40 rounded-lg md:h-80 md:w-60"
                        />
                        <h2 className="mt-2 w-40 text-sm font-semibold md:w-60 md:text-2xl">
                            {movie.title}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
