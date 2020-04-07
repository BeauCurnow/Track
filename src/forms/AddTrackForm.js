import React, {useState} from 'react';

const AddTrackForm = props => {
    const initialFormState = { 
        id: null, title: '', artist:'', album:'', listened_to:'', rating: 0, genre: '', recommender: '', comments: ''
    }

    const [track, setTrack] = useState(initialFormState);

    const handleInputChange = event => {

        const{name, value} = event.target
        
        setTrack({...track, [name]: value})
        // return  fetch('https://localhost:1337/tracks',{
        //     method: 'POST',
        //     mode:'cors',
        //     body:JSON.stringify(track),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res=> {
        //     return res;
        // }).catch(err => err)

    }

    return(
        <div className="box">
        <form 
        onSubmit={event => {
            event.preventDefault()
            if (!track.title || !track.artist || ! track.recommender) return
                props.addTrack(track)
                setTrack(initialFormState)

            console.log(JSON.stringify(track))
            fetch('http://35.232.86.10:1337/tracks',{
                method: 'POST',
                body: JSON.stringify(track),
                

            });
        }}>

            <div className="field">
            <label className="label">Title</label>
            <div className="control is-expanded">
            <input type="text"  className="input is-fullwidth"name="title" value={track.title} onChange={handleInputChange}/>
            </div>
            </div>
            <div className="field">
            <label className="label">Artist</label>
            <div className="control is-expanded">
            <input type="text" className="input is-fullwidth" name="artist" value={track.artist} onChange={handleInputChange}/>
            </div>
            </div>
            <div className="field">
                <label className="label">Album</label>
                <div className="control is-expanded">
                    <input className="input is-fullwidth" type="text" name="album" value={track.album} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="field">
                <label className="label">Recommender</label>
                <div className="control is-expanded">
                    <input className="input is-fullwidth" type="text" name="recommender" value={track.recommender} onChange={handleInputChange}/>
                </div>
            </div>
            <div>
                <button className="button is-info is-fullwidth">Add track</button>
            </div>
        </form>
    </div>
        
    )
}
export default AddTrackForm