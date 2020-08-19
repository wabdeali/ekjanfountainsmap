import React, { Component } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'

import { db } from '../firebase/config'

export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                id: '',
                title: '',
                description: '',
                imgURL: '',
                videoURL: '',
                coords: '',
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.data.description === nextProps.editModalData.description) {
            return null;
        }

        return {
            data: nextProps.editModalData,
        }

    }

    onChangeHandler = e => {

        if (e.target.name === 'lat' || e.target.name === 'lng') {

            let data = this.state.data;
            data.coords[e.target.name] = e.target.value;

            this.setState({ data })

        } else {
            let data = this.state.data;

            data[e.target.name] = e.target.value;

            this.setState({ data })
        }
    }

    updateLocation = () => {

        const uploadObject = this.state.data;

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

        const id = uploadObject.id;
        delete uploadObject.id;

        console.log(uploadObject)
        db.collection('locations').doc(id).set({ ...uploadObject });
        this.props.setShowEditModal(false);
    }

    render() {

        let data = this.state.data;

        return (
            <div className="editModal">
                <Typography variant="h3">Edit Location</Typography>
                <img className="modalImg" src={data.imgURL} alt="fountain" />

                <div className="formInput">
                    <TextField
                        className="formInput"
                        required
                        fullWidth
                        label="Title"
                        variant="filled"
                        name="title"
                        onChange={this.onChangeHandler}
                        value={data.title}
                    />
                </div>

                <div className="formInput">
                    <TextField
                        className="formInput"
                        required
                        fullWidth
                        label="Description"
                        variant="filled"
                        name="description"
                        onChange={this.onChangeHandler}
                        value={data.description}
                    />
                </div>

                <div className="formInput">
                    <TextField
                        className="formInput"
                        fullWidth
                        label="Youtube Video Link"
                        variant="filled"
                        name="videoURL"
                        onChange={this.onChangeHandler}
                        value={data.videoURL}
                    />
                </div>

                <div className="formInput">
                    <TextField
                        className="formInput"
                        required
                        fullWidth
                        label="Latitude"
                        variant="filled"
                        name="lat"
                        onChange={this.onChangeHandler}
                        value={data.coords.lat}
                    />
                </div>
                <div className="formInput">
                    <TextField
                        className="formInput"
                        required
                        fullWidth
                        label="Longitude"
                        variant="filled"
                        name="lng"
                        onChange={this.onChangeHandler}
                        value={data.coords.lng}
                    />
                </div>
                <div>
                    <Button style={{ margin: '0 10px' }} size="large" variant="contained" onClick={() => this.props.setShowEditModal(false)}>Cancel</Button>
                    <Button style={{ margin: '0 10px' }} size="large" variant="contained" color="primary" onClick={this.updateLocation}>Update</Button>
                </div>
            </div>
        )
    }
}
