import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react"
import {AiFillPlayCircle} from 'react-icons/ai'
import { Container } from "./NavBar";
import '../Styles/Videos.css'
import NoImg from "./NoImage.jpg"
function Movies() {
    const {toggle} = useContext(Container)
    const [moviesData, setMoviesData]= useState([])
    const [trailer, setTrailer] = useState(true)
    const Api = "https://api.themoviedb.org/3/discover/movie"
    const Images = "https://image.tmdb.org/t/p/w500"

    const MovieCall = async () => {
        const data = await axios.get(Api ,{
            params: {
                api_key: '9decf12c5ddcb2d62e7978d41139a9a8',
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
            <div className={toggle ? "mainBgColor" : 'secondaryBgcolor'}>
            <div className="movies-container">
            {moviesData.map((movie) => {
                return(
                <Fragment>
                    <div id="container">
                    <AiFillPlayCircle color='#fff' fontSize={40} id="playIcon" />
                    <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt=""/>
                    <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''}>{movie.title}</h3>
                    </div>
                </Fragment>
                )
            })}
            </div>
            </div>
        </Fragment>
    )
}

export default Movies