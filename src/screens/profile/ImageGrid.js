import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import ViewImageModal from "./ViewImageModal";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%"
  }
}));

export default function ImageGrid(props) {
  const classes = useStyles();
  const [openImageView, setOpenImageView] = useState(false);
  const [selectedImage, setImage] = useState("");

  const viewImage = imageObj => {
    setOpenImageView(true);
    setImage(imageObj);
  };
  const handleClose = () => {
    setOpenImageView(false);
    setImage("");
  };

  return (
    <Grid container spacing={1} direction="row" alignItems="center">
      {props.data &&
      props.data.map(imageObj => (
        <Grid
          id="image-grids"
          item
          xs={4}
          key={imageObj.id}
          onClick={() => viewImage(imageObj)}
        >
          <Card className={classes.card} variant="outlined">
            <CardMedia
              className={classes.media}
              image={imageObj.media_url}
              title={imageObj.media_url}
            />
          </Card>
        </Grid>
      ))}
      <ViewImageModal
        openImageView={openImageView}
        selectedImage={selectedImage}
        handleClose={handleClose}
      ></ViewImageModal>
    </Grid>
  );
}