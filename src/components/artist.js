import React, { useState, useEffect } from 'react';


const Artist = props => {
    
    let url = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + props.name + "&api_key=5c5f0a68c3aad820a3b3987068acdeec&format=json"

    const [artist, setArtist] = useState({})

    useEffect(() => {
        fetch(`${url}`).then(response =>{
            if (response.ok) {
                return response.json();
            }
            throw new Error('error'); 
        })
        .then(data => setArtist(data.artist))
        .catch(() => 
            setArtist({error: "Last.fm is currently unavailable"})
        );

    }, [url]);

    // const [album, setAlbum] = useState({})

    // useEffect(() =>{
    //     fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5c5f0a68c3aad820a3b3987068acdeec&artist=${props.name}&album=${props.album}&format=json`)
    //     .then(response =>{
    //         if(response.ok){
    //             return response.json();
    //         }
    //         throw new Error('error');
    //     })
    //     .then(data => setAlbum(data.album))
    //     .catch(() =>
    //     setArtist({error: "Last.fm is currently unavailable"})
    //     );
    // }, []); 

    return(
        <div>
        {/* <img src={album?.image?.[2]?.["#text"]}/> */}
        <p dangerouslySetInnerHTML= {{ __html: artist?.bio?.summary}}/>
        <p><b>Other Artists You Might Like:</b></p>
        <div>
            <p>{artist?.similar?.artist[0]?.name}</p>
            <p>{artist?.similar?.artist[1]?.name}</p>
            <p>{artist?.similar?.artist[2]?.name}</p>
        </div>
        </div>
    )
}

export default Artist