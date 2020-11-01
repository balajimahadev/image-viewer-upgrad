import React, { Component } from "react";
import Header from "../../common/header/Header";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import "./Profile.css";
import ImageGrid from "./ImageGrid";
import Fab from "@material-ui/core/Fab";
import EditUserNameModal from "./EditUserNameModal";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: {
        full_name: 'Balaji Mahadev',
        profile_picture: 'https://scontent.cdninstagram.com/v/t51.29350-15/118885986_328768241703876_1409494140667970700_n.jpg?_nc_cat=104&_nc_sid=8ae9d6&_nc_ohc=CeFkYEPVjIQAX-_r17E&_nc_ht=scontent.cdninstagram.com&oh=9d991d4d20441fd91edec25ae569d1c1&oe=5F828618'
      },
      editUserModal: false,
      filterData: null,
      userMediaData: null,
      searchValue: "",
      viewUpdateFullName: "",
      fullname: "",
      stateChange: false
    };
    this.getMediaData = this.getMediaData.bind(this);
    this.getMediaIds = this.getMediaIds.bind(this);
  }

  handleClose = () => {
    this.setState({ editUserModal: false });
  };
  handleOpen = () => {
    this.setState({ editUserModal: true });
  };
  updateClickHandler = fullname => {
    this.setState({ viewUpdateFullName: fullname });
  };
  submitClickHandler = () => {
    this.setState({
      editUserModal: false,
      fullname: this.state.viewUpdateFullName
    });
  };

  getUserProfileData() {
    fetch(
      this.props.baseUrl +
      "?access_token=" +
      sessionStorage.getItem("access-token")
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({ userProfileData: result.data });
        },
        error => {
          console.log("error...", error);
          this.props.history.push("/login");
        }
      );
  }

  getMediaIds() {
    this.setState({userMediaData: []})
    fetch(
        this.props.baseUrl +
        "me/media?fields=id,caption&access_token=" +
        sessionStorage.getItem("access-token")
    )
        .then(res => res.json())
        .then(
            result => {
              this.setState({
                userData: result.data
              });
              this.getMediaData(result.data, this.props.baseUrl)
            },
            error => {
              console.log("error...", error);
              this.props.history.push("/login");
            }
        );
  }
  getMediaData = (data, baseUrl) => {
    let detailsData = [];
    data.forEach(value => {
      if(value.id) {
        const url = baseUrl +  value.id +
            "?fields=id,media_type,media_url,username,timestamp&access_token=" +
            sessionStorage.getItem("access-token");
        fetch(url)
            .then(res => res.json())
            .then(
                result => {
                  const data = result;
                  data["caption"] = value.caption;
                  detailsData.push(data);
                  this.state.userMediaData.push(data);
                  this.setState({
                    stateChange: !this.state.stateChange
                  })
                },
                error => {
                  console.log("error...", error);
                  this.props.history.push("/login");
                }
            );
      }

    });
  };

  componentDidMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push("/");
    }
    this.getMediaIds();
  }
  render() {
    return (
      <div>
        <Header {...this.props} showSearchBar={false}/>
        <Container maxWidth="xl">
          <div style={{ height: "2rem" }}></div>
          <Grid container spacing={3} justify="flex-start">
            <Grid item xs={3}/>
            <Grid item xs={2}>
              {this.state.userProfileData ? (
                <Avatar
                  alt={this.state.userProfileData.full_name}
                  id="profile-image"
                  fontSize="large"
                  variant="circle"
                  src={this.state.userProfileData.profile_picture}
                />
              ) : null}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5" component="h2">
                {this.state.userProfileData
                  ? this.state.userProfileData.username
                  : null}
              </Typography>
              <Grid container spacing={3} justify="center">
                <Grid item xs={4}>
                  Posts:{" "}
                  {this.state.userProfileData
                    ? 4
                    : null}
                </Grid>
                <Grid item xs={4}>
                  Follows:{" "}
                  {this.state.userProfileData
                    ? 124
                    : null}
                </Grid>
                <Grid item xs={4}>
                  Follows By:{" "}
                  {this.state.userProfileData
                    ? 32
                    : null}
                </Grid>
              </Grid>
              <Typography variant="h5" component="h2">
                {this.state.fullname ? this.state.fullname : null}
                {this.state.userProfileData && !this.state.fullname
                  ? this.state.userProfileData.full_name
                  : null}
                <Fab
                  color="secondary"
                  id="edit-profile"
                  aria-label="edit"
                  onClick={this.handleOpen}
                >
                  <EditIcon/>
                </Fab>
              </Typography>
            </Grid>
            <Grid item xs={3}/>
          </Grid>
          <ImageGrid data={this.state.userMediaData}/>
          <EditUserNameModal
            editUserModal={this.state.editUserModal}
            handleClose={this.handleClose}
            updateClickHandler={this.updateClickHandler}
            submitClickHandler={this.submitClickHandler}
          />
        </Container>
      </div>
    );
  }
}
export default Profile;