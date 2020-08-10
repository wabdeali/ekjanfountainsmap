import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";

const PopupCard = (props) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia component="img" src={props.imgURL}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{props.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {props.videoURL.length > 0 && <CardActions>
                <Button size="small" color="primary" href={props.videoURL} target="_blank">
                    Watch Video
                </Button>
            </CardActions>}
        </Card>
    );
}

export default PopupCard;