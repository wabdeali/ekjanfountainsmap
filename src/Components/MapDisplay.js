import React from 'react';
import { Link } from 'react-router-dom'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import { db } from '../firebase/config'
import PopupCard from './PopupCard';

import { Modal, Button, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core'

export const weAreHereIcon = new L.Icon({
    iconUrl: require('../Images/weAreHere.png'),
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 50],
})

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
                        zoom={6}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            this.state.data.map(doc =>
                                <Marker key={doc.imgURL} position={[doc.coords.lat, doc.coords.lng]}>
                                    <Popup>
                                        <PopupCard title={doc.title} description={doc.description} imgURL={doc.imgURL} videoURL={doc.videoURL} />
                                    </Popup>
                                </Marker>
                            )
                        }
                        <Marker position={[12.964025, 77.583636]} icon={weAreHereIcon}>
                            <Popup>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia component="img" src={require('../Images/logo.png')} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">Ekjan Associates</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            A house of exclusive Fountains, Fountain Nozzles, Submersible Lights, Fountain Pumps, LED Lights and All kinds of Fountain Accessories.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" href="http://www.ekjanassociates.in/" target="_blank">
                                            Visit our Website
                                        </Button>
                                        <Button size="small" color="primary" href="google.com/maps/place/EKJAN+ASSOCIATES/@12.9639782,77.5814573,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae15e061b1d57d:0xab548331c241b794!8m2!3d12.963973!4d77.583646" target="_blank">
                                            Open in Maps
                                        </Button>

                                    </CardActions>
                                </Card>
                            </Popup>
                        </Marker>
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
