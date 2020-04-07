import React, { useState, useEffect } from 'react'

const UpdateTrackForm = props => {
    const [track, setTrack] = useState(props.currentTrack)

    const handleInputChange = event => {
        const {name, value} = event.target

        setTrack({...track, [name]: value})
    }

    useEffect(() => {
        setTrack(props.currentTrack)
    }, [props])

    return(
        <div className="box">
        <form onSubmit={event => {
            event.preventDefault()
            console.log(JSON.stringify(track))
            props.updateTrack(track.id, track)
            fetch('http://35.232.86.10:1337/tracks/' + track.id,{
                method: 'PUT',
                body: JSON.stringify(track),
                

            });
        }}>
            <div className="field">
            <label className="label">Title</label>
            <div className="control">
            <input type="text" className="input is-fullwidth" name="title" value={track.title} onChange={handleInputChange}/>
            </div>
            </div>
            <div className="field">
            <label className="label">Artist</label>
            <div className="control">
            <input type="text" className="input is-fullwidth" name="artist" value={track.artist} onChange={handleInputChange}/>
            </div>
            </div>
            <div className="field">
            <label className="label">Album</label>
            <div className="control">
            <input type="text" className="input is-fullwidth" name="album" value={track.album} onChange={handleInputChange}/>
            </div>
            </div>
            <div className="field">
            <label className="label">Listened To</label>
            <div className="control">
                    <div name="listened_to" value={track.listened_to} onChange={handleInputChange}>
                    <label className="radio"><input type="radio" name="listened_to" value="true" defaultChecked={track.listened_to === "true" || track.listened_to === true}/>Yes</label>
                    <label className="radio"><input type="radio" name="listened_to" value="false" defaultChecked={track.listened_to === false || track.listened_to === "false"}/>No</label>
                    </div>
                    </div>
                    </div>      
            <div className="field">  
            <label className="label">Rating</label>
            <div className="control">
            <div className="select is-fullwidth" onChange={handleInputChange}>
            <select value={track.rating} name="rating" onChange={handleInputChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            </div>
            </div>
            </div>
            <div className="field">
            <label className="label">Genre</label>
            <div className="control">
            <div className="select is-fullwidth" >
            <select value={track.genre} name="genre" onChange={handleInputChange}>
                <option value=""></option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Pop Country">Pop Country</option>
                <option value="Pop Rock">Pop Rock</option>
                <option value="Synth Pop">Synth Pop</option>
                <option value="Indie Pop">Indie Pop</option>
                <option value="EDM">EDM</option>
                <option value="Contemporary">Contemporary</option>
                <option value="World">World</option>
            </select>
            </div>
            </div>
            </div>
            <div className="field">
            <label className="label">Recommender</label>
            <div className="control">
            <input type="text"  className="input is-fullwidth" name="recommender" value={track.recommender} onChange={handleInputChange}/>
            </div>
            </div>
            <div className="field">
            <label className="label">Comments</label>
            <div className="control">
            <input type="text" className="input is-fullwidth" name="comments" value={track.comments} onChange={handleInputChange}/>
            </div>
            </div>
            <div className="field">
            <div className="control">
            <button className="button is-primary is-fullwidth">Save</button>
            </div>
            </div>
            <div className="field">
            <div className="control">
            <button className="button is-danger is-fullwidth" onClick={() => props.setEditing(false)}>Cancel</button>
            </div>
            </div>
        </form>
        </div>
    )
}

export default UpdateTrackForm

