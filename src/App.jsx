import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import About from "./About"

const API_KEY = "916b84f078f168c7251f3ecbea3f0237"
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`

function App() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                // Menggunakan map untuk mengubah data yang diambil
                const modifiedMovies = data.results.map((movie) => ({
                    id: movie.id,
                    title: movie.title,
                    releaseDate: movie.release_date,
                    voteAverage: movie.vote_average,
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

                setMovies(highRatedMovies)

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
            <Routes>
                <Route Component={About} path="/about" />
            </Routes>
            <h1>Film Now Playing</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <p>Tanggal Rilis: {movie.releaseDate}</p>
                        <p>Rating: {movie.voteAverage}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
