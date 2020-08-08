import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { db } from '../firebase/config'
import PopupCard from './PopupCard';

export default class MapDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            markers: [],
            popUpData: {},
        }

    }

    componentDidMount() {

        db.collection('locations').get()
            .then(snapshot => {
                let data = snapshot.docs.map(doc => doc.data())
                this.setState({ data })
            })
    }

    getPopupData = () => {

    }

    render() {
        return (
            <div 
            style={{
                height: '100vh',
                width: '100%',
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
            </div>
        )
    }
}
