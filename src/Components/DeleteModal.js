import React, { Component } from 'react'
import { Typography, Button } from '@material-ui/core'

import { storage, db } from '../firebase/config'

export default class DeleteModal extends Component {

    deleteLocation = () => {
        let data = this.props.deleteModalData;
        let id = this.props.deleteModalData.id;

        db.collection('locations').doc(id).delete().then(res => {

            console.log('database entry deleted succesfully', res)

            let storageRef = storage.refFromURL(data.imgURL)

            storageRef.delete().then(res => {
                console.log('File deleted successfully', res)
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
        });

        this.props.setShowDeleteModal(false)

    }

    render() {
        const data = this.props.deleteModalData
        console.log(data.id)

        return (
            <div className="modal">
                <Typography variant="h3">
                    Delete Location
                </Typography>
                <br />
                <Typography variant="h5">
                    Are you sure you want to delete this location?
                </Typography>
                <br />
                <img className="modalImg" src={data.imgURL} alt="fountain" />
                <br />
                <Typography variant="h6">
                    {data.title}
                </Typography>
                <Typography variant="caption">
                    {data.description}
                </Typography>
                <br />
                <div>
                    <Button style={{ margin: '0 10px' }} size="large" variant="contained" onClick={() => this.props.setShowDeleteModal(false)}>Cancel</Button>
                    <Button style={{ margin: '0 10px' }} size="large" variant="contained" color="primary" onClick={this.deleteLocation}>Delete</Button>
                </div>
            </div>
        )
    }
}
