import React from 'react';
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { db } from '../firebase/config'
import PopupCard from './PopupCard';

import { Modal, Button } from '@material-ui/core'

export default class MapDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            markers: [],
            popUpData: {},
            modalOpen: false,
        }

    }

    componentDidMount() {

        db.collection('locations').get()
            .then(snapshot => {
                let data = snapshot.docs.map(doc => doc.data())
                this.setState({ data })
            })

        setTimeout(() => this.setState({ modalOpen: true }), 1000)
    }

    modalClose = () => {
        this.setState({ modalOpen: false })
    }

    render() {
        return (
            <>
                <Modal
                    open={this.state.modalOpen}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', outline: '0' }}>
                    <div className="modal">
                        <img src={require('../Images/marker.gif')} alt="a gif of map pin"></img>
                        <p>Tap on the markers below to learn more!</p>
                        <Button onClick={this.modalClose} variant="contained">Continue</Button>
                    </div>
                </Modal>
                <div
                    style={{
                        height: '100vh',
                        width: '100%',
                        position: 'relative',
                    }}>

                    <Map
                        center={[12.9716, 77.5946]}
                        zoom={11}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            this.state.data.map(doc =>
                                <Marker key={doc.title} position={[doc.coords.lat, doc.coords.lng]}>
                                    <Popup onClick={this.getPopupData}>
                                        <PopupCard title={doc.title} description={doc.description} imgURL={doc.imgURL} videoURL={doc.videoURL} />
                                    </Popup>
                                </Marker>
                            )
                        }
                    </Map>
                    <Link to="/new-location">
                        <div className="logoLink">
                            <img src={require('../Images/logo.png')} alt="logo of the company"></img>
                        </div>
                    </Link>
                </div>
            </>
        )
    }
}
