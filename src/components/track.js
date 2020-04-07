import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import Artist from './artist'


const Track = props => {

    const [track, setTrack] = useState(props.currentTrack)

    useEffect(() => {
        setTrack(props.currentTrack)
    }, [props])

    let tracker = 0;
    let stars =[];

    tracker = parseInt(track.rating);
    
    for (let i = 0; i < tracker; i++){
        stars[i] = (<FontAwesomeIcon key={i} size="2x" icon={faStar}/>)
    }
    


    const [album, setAlbum] = useState({})

    useEffect(() =>{
        fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5c5f0a68c3aad820a3b3987068acdeec&artist=${track.artist}&album=${track.album}&format=json`)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            throw new Error('error');
        })
        .then(data => setAlbum(data.album))
        .catch(() =>
        setAlbum({error: "Last.fm is currently unavailable"})
        );
    }, [track.artist,track.album]); 



    return(
        <div className="box" key={track.id}>
            <div className="columns is-marginless">
            <div className="column">
            <h1 className='title is-subtitle'>{track.title}</h1>
            <p className="title is-subtitle is-size-5">{track.artist} - {track.album}</p>
            <span className="has-text-warning">{stars}</span></div>
            <div className="column">
                <figure className="image is-square">
                <img alt="album-cover"src={album?.image?.[3]?.["#text"]}/></figure></div> 
            </div>
            <p><b>Genre: </b>{track.genre}</p>
            <p><b>Recommender: </b>{track.recommender}</p>
            <p><b>Comments: </b>{track.comments}</p>
            <p><b>Additional Information (Provided by Last.fm)</b></p>
            <Artist name= {track.artist} album={track.album}/>
            <br/>
            <Link to="/" className="button">Back</Link>
        </div>
    )
}

export default Track;