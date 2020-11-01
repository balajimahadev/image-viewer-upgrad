import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function getModalStyle() {
  const top = 33;
  const left = 33;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "34%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function ViewImageModal(props) {
  const classes = useStyles();
  const { selectedImage, openImageView, handleClose } = props;
  const [modalStyle] = React.useState(getModalStyle);
  const [comment, setComment] = React.useState("");
  const [like, setLike] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  function commentChangeHandler(e) {
    setComment(e.target.value);
  }
  function closeModal() {
    handleClose();
    setComments([]);
    setLike(false);
  }

  function updateComments() {
    if (comment) {
      let updatedComments = [comment];
      const updateLatestComment = comments.concat(updatedComments);
      setComments(updateLatestComment);
      setComment("");
    }
  }

  function onLikeImage() {
    setLike(!like);
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openImageView}
        onBackdropClick={closeModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              {selectedImage ? (
                <img
                  src={selectedImage.media_url}
                  alt={selectedImage.media_url}
                  style={{
                    height: "100%",
                    width:"100%"
                  }}
                ></img>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              {selectedImage ? (
                <div>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <Avatar
                        alt={selectedImage.username}
                        src={selectedImage.media_url}
                      />
                    </Grid>{" "}
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {selectedImage.username}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth"/>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                 {} #pgcertificate
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {selectedImage.tags && selectedImage.tags.map(tag => {
                      return (
                        <span
                          style={{ color: "#1976d2", fontSize: "14px" }}
                          size="small"
                          key={tag}
                          color="primary"
                        >
                          #{tag}{" "}
                        </span>
                      );
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    {comments.length > 0 &&
                    comments.map(cmt => {
                      return (
                        <p
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                          key={cmt}
                        >
                          <b>{selectedImage.username}:</b> {cmt}
                        </p>
                      );
                    })}
                  </Typography>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => onLikeImage()}
                    >
                      {like ? (
                        <FavoriteIcon style={{ color: red[500] }}/>
                      ) : (
                        <FavoriteBorderIcon/>
                      )}
                    </IconButton>
                    <span>
                      {like
                        ?  1
                        : 0}{" "}
                      likes
                    </span>
                  </CardActions>
                  <div style={{ margin: "1rem" }}>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="add-user-comment"
                        value={comment}
                        onChange={commentChangeHandler}
                        label="Add a comment"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!comment}
                        onClick={updateComments}
                      >
                        Add
                      </Button>
                    </form>
                  </div>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}