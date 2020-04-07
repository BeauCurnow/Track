import React from 'react';
import { Link } from "react-router-dom"

const TrackTable = props => (
    <div className="box">
    <div className="table-container">
    <table className="table is-fullwidth is-hoverable">
        <thead>
            <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Listened To</th>
                <th>Rating</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.tracks.map(track => (
                <tr key={track.id}>
                    <td><Link to={`/${track.id}`} onClick={()=> props.pickTrack(track)}>{track.title}</Link></td>
                    <td>{track.artist}</td>
                    <td>{track.album}</td>
                    {track.listened_to == true || track.listened_to == "true" ? (
                        <td>Yep</td>
                    ):(<td>Nope</td>)}
                    <td>{track.rating}</td>
                    
                    <td><div className="buttons"> <button className="button is-primary is-fullwidth" onClick={() => props.editTrack(track)}>Update</button><button className="button is-danger is-fullwidth" onClick={() => {props.deleteTrack(track.id); fetch('http://35.232.86.10:1337/tracks/' + track.id, {method: 'DELETE', body: JSON.stringify(track)}
            )}}>Delete</button>
                   </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    </div>

)

export default TrackTable;