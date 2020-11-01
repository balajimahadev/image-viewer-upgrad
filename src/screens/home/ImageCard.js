import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Grid from "@material-ui/core/Grid";
import "./ImageCard.css";
import Moment from "react-moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const customeStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%"
    },
    media: {
        height: 0,
        paddingTop: "56.25%" 
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    }
}));

export default function ImageCard(props) {
    const classes = customeStyles();
    const [comment, setComment] = React.useState("");
    const [tags, setTags] = React.useState(['upgrad', 'fullStackDev']);
    const [render, setRender] = React.useState(false);
    let { data } = props;

    useEffect(() => {
        data &&
            data.map(image => {
                image["comments"] = [];
                return image;
            });
    }, [data]);
    useEffect(() => {
        data &&
            data.map(image => {
                image["liked"] = false;
                return image;
            });
    }, [data]);

    function commentChangeHandler(e) {
        setComment(e.target.value);
    }

    const updateComment = index => {
        if (comment) {
            const object = data[index];
            if (!object.hasOwnProperty('comments')) {
                data[index]["comments"] = [];
            }
            data[index].comments = data[index].comments.concat([comment]);
        }
        setComment("");
        document.getElementById("add-comment" + index).value = "";
    };
    const onLikeImage = index => {
        const object = data[index];
        if (!object.hasOwnProperty('liked')) {
            data[index]["liked"] = false;
        }
        let l = data[index].liked;
        data[index].liked = !l;
        setRender(!render);
    };

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
            {props.data &&
                props.data.map((imageObj, index) => (
                    <Grid item xs={6} key={imageObj.id}>
                        <Card className={classes.card} variant="outlined">
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={imageObj.username}
                                        src={imageObj.media_url}
                                    />
                                }
                                title={imageObj.username}
                                subheader={<Moment format="DD/MM/YYYY HH:mm:ss" interval={imageObj.timestamp} />}
                            />
                            <CardMedia
                                className={classes.media}
                                image={imageObj.media_url}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="bodyNew" color="textSecondary" component="p">
                                    {imageObj.caption.split("#")[0]}
                                </Typography>
                                <Typography variant="bodyNew" color="textSecondary" component="p">
                                    {tags.map(tag => {
                                        return (
                                            <span style={{ color: "#1976d2", fontSize: "14px" }} size="small" key={tag}>
                                                #{tag}{" "}
                                            </span>
                                        );
                                    })}
                                </Typography>
                                <Typography
                                    variant="bodyNew"
                                    color="textSecondary"
                                    component="div"
                                >
                                    {imageObj.comments &&
                                        imageObj.comments.length > 0 &&
                                        imageObj.comments.map(comment => {
                                            return (
                                                <p style={{ fontSize: "16px" }} key={comment}>
                                                    <b>{imageObj.username}:</b> {comment}
                                                </p>
                                            );
                                        })}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={() => onLikeImage(index)}
                                >
                                    {data[index].liked ? (
                                        <FavoriteIcon style={{ color: red[500] }} />
                                    ) : (
                                            <FavoriteBorderIcon />
                                        )}
                                </IconButton>
                                <span>
                                    {data[index].liked
                                        ? 1
                                        : 0}{" "}
                                    likes
                </span>
                            </CardActions>
                            <div style={{ margin: "1rem" }}>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <TextField
                                        id={"add-comment" + index}
                                        label="Add a comment"
                                        onChange={commentChangeHandler}
                                    />
                                    <Button
                                        variant="contained"
                                        id={"add-comments-button" + index}
                                        color="primary"
                                        onClick={() => updateComment(index)}
                                    >
                                        Add
                              </Button>
                                </form>
                            </div>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
}