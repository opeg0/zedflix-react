import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react"
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import { Container } from "./NavBar"
import '../Styles/Videos.css'
import NoImg from "./NoImage.jpg"
function Movies() {
    const {toggle, inputValue} = useContext(Container)
    const input = inputValue
    const [moviesData, setMoviesData]= useState([])
    const [trailer, setTrailer] = useState(true)
    const [movieTitle, setMovieTitle] = useState('')
    const Shown = input ? 'search' : 'discover'
    const Api = `https://api.themoviedb.org/3/${Shown}/movie`
    const Images = "https://image.tmdb.org/t/p/w500"

    const MovieCall = async () => {
        const data = await axios.get(Api ,{
            params: {
                api_key: '9decf12c5ddcb2d62e7978d41139a9a8',
                query: input
            }
        })
        const results = data.data.results
        setMoviesData(results)
    }
    useEffect(() => {
        setTimeout(() =>{
        MovieCall()
        }, 100)
    },[input])
    const MoviesTitle = (movie) => {
        setMovieTitle(movie.title)
        setTrailer(!trailer)
    }
    console.log(moviesData)
    return (
        <Fragment>
            <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
            <div className='movies-container'>
            {moviesData.map((movie) => {
                return(
                <Fragment>
                    <div id={trailer ? 'container' : 'NoContainer'}>
                    <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => MoviesTitle(movie)}/>
                    <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt="" onClick={() => MoviesTitle(movie)}/>
                    <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>
                    </div>
                </Fragment>
                )
            })}
            <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={toggle ? 'Darktheme' : 'LightThemeClose'} fontSize={55} color="#fff" cursor={'pointer'} onClick={() => setTrailer(true)}/>
            </div>
            </div>
        </Fragment>
    )
}

export default Movies