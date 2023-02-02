import axios from "axios";
import React, { Fragment, useEffect, useState } from "react"
import {AiFillPlayCircle} from 'react-icons/ai'
import NoImg from "./NoImage.jpg"
function Movies() {
    const [moviesData, setMoviesData]= useState([])
    const Api = "https://api.themoviedb.org/3/discover/movie"
    const Images = "https://image.tmdb.org/t/p/w500"

    const MovieCall = async () => {
        const data = await axios.get(Api ,{
            params: {
                api_key: 'c4d4f9a6d1f8458c051ff0183b1676e5',
            }
        })
        const results = data.data.results
        setMoviesData(results)
    }
    useEffect(() => {
        MovieCall()
    },[])
    console.log(moviesData)
    return (
        <Fragment>
            {moviesData.map((movie) => {
                return(
                <Fragment>
                    <div id="container">
                    <AiFillPlayCircle color='black' fontSize={40} id="playIcon" />
                    <img src={moviesData.poster_path ? `${Images}${moviesData.poster_path}` : NoImg} alt=""/>
                    <h3>{moviesData.title}</h3>
                    </div>
                </Fragment>
                )
            })}
        </Fragment>
    )
}

export default Movies