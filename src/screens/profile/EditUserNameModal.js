import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import './EditUserNameModal.css';

function getModalStyle() {
  const top = 30;
  const left = 30;

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '25%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditUserNameModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [fullName, setFullname] = React.useState("");
  const [fullNameRequired, setFullNameRequired] = React.useState(false);

  function fullNameChangeHandler(e) {
    setFullname(e.target.value);
    props.updateClickHandler(e.target.value);
    if (e.target.value) {
      setFullNameRequired(false);
    } else {
      setFullNameRequired(true);
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.editUserModal}
        onClose={props.handleClose}
        onBackdropClick={props.handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit</h2>
          <FormControl id="fullName-form-control" required>
            <InputLabel htmlFor="fullName">Full Name</InputLabel>
            <Input id="fullName" type="text" onChange={fullNameChangeHandler} />
            {fullNameRequired ? <FormHelperText>
              <span className="red">Full name required</span>
            </FormHelperText> : null}
          </FormControl>
          <div style={{ marginTop: "1rem" }}>
            <Button variant="contained" color="primary" disabled={!fullName}
              onClick={props.submitClickHandler}>Update</Button>
          </div>
        </div>
      </Modal>
    </div>
  );

}