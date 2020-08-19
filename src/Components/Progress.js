import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage'

const Progress = ({ file, data, setReady, setUploadObject, setCoords, setImg }) => {

    const { url, progress } = useStorage(file, data)
    console.log(url, progress)

    useEffect(() => {
        if (url) {
            setUploadObject({
                title: '',
                description: '',
                imgURL: '',
                videoURL: '',
                coords: {
                    lat: '',
                    lng: '',
                },
            })
            setCoords('')
            setImg(null)
            setReady(false)
        }
    }, [url, setReady, setUploadObject, setCoords, setImg])

    return (

        <div className="progress-bar"
            style={{
                width: progress + '%'
            }}>

        </div>

    )

}

export default Progress