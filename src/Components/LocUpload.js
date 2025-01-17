import React, { useState } from 'react'

import { TextField, Button, Typography } from '@material-ui/core'

import { auth } from '../firebase/config'

import Progress from './Progress'
import LocationTable from './LocationTable'

const LocUpload = () => {
    const uploadFormat = {
        title: '',
        description: '',
        imgURL: '',
        videoURL: '',
        coords: {
            lat: '',
            lng: '',
        },
    }

    let [uploadObject, setUploadObject] = useState(uploadFormat)
    let [coords, setCoords] = useState('')
    let [img, setImg] = useState(null)
    let [textEnabled, setTextEnabled] = useState(false)
    let [ready, setReady] = useState(false)

    const types = ['image/png', 'image/jpeg']

    const uploadImage = e => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setImg(selected);
            setTextEnabled(true)
        } else {
            setImg(null);
        }
    }

    const getCoords = e => {

        let coordsString = e.target.value
        setCoords(coordsString)

        let coordsArr = coordsString.split(/,\s/);

        setUploadObject({
            ...uploadObject,
            coords: {
                lat: coordsArr[0],
                lng: coordsArr[1],
            }
        })

    }

    const onChangeHandler = e => {

        setUploadObject({
            ...uploadObject,
            [e.target.name]: e.target.value,
        })
    }

    const uploadData = () => {

        if (!img) {
            alert('Please select an image');
            return;
        }

        if (uploadObject.title === '') {
            alert('Enter the title');
            return;
        } else if (uploadObject.description === '') {
            alert('Enter the description');
            return;
        }

        if (uploadObject.coords.lat === '' || uploadObject.coords.lng === '') {
            alert('Enter Coordinates')
            return;
        }

        setReady(true)

    }

    const logout = () => {

        auth.signOut();

    }

    return (
        <>
            <div style={{ textAlign: 'right', margin: '10px', }}>
                <Button onClick={logout} variant="outlined">Logout</Button>
            </div>
            <div
                style={{
                    width: '50%',
                    margin: '50px auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}>

                <Typography variant="h3">
                    Add a new location
            </Typography>
                <div
                    style={{
                        margin: '30px',
                        textAlign: 'center'
                    }}
                    className="formInput">
                    <Typography variant="h6">
                        Select image to upload
                </Typography>
                    <br />
                    <input id="uploadButton" onChange={uploadImage} type='file' name='image'></input>
                </div>

                <div className="formInput">
                    <TextField
                        className="formInput"
                        disabled={!textEnabled}
                        required
                        fullWidth
                        label="Title"
                        variant="filled"
                        name="title"
                        onChange={onChangeHandler}
                        value={uploadObject.title}
                    />
                </div>

                <div className="formInput">
                    <TextField
                        className="formInput"
                        disabled={!textEnabled}
                        required
                        fullWidth
                        multiline
                        label="Description"
                        variant="filled"
                        name="description"
                        onChange={onChangeHandler}
                        value={uploadObject.description}
                    />
                </div>

                <div className="formInput">
                    <TextField
                        className="formInput"
                        disabled={!textEnabled}
                        fullWidth
                        label="Youtube Video Link"
                        variant="filled"
                        name="videoURL"
                        onChange={onChangeHandler}
                        value={uploadObject.videoURL}
                    />
                </div>

                <div className="formInput">
                    <TextField
                        className="formInput"
                        disabled={!textEnabled}
                        required
                        fullWidth
                        label="Coordinates"
                        variant="filled"
                        name="lat"
                        onChange={getCoords}
                        value={coords}
                    />
                </div>

                <Button onClick={uploadData} variant="outlined" >Upload Data</Button>

                {ready && <Progress file={img} data={uploadObject} setReady={setReady} setUploadObject={setUploadObject} setCoords={setCoords} setImg={setImg} />}

            </div>

            <LocationTable />

        </>
    );
}

export default LocUpload;