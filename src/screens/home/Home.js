import React, { Component } from "react";
import Header from "../../common/header/Header";
import ImageCard from "./ImageCard";
import Container from "@material-ui/core/Container";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      userProfileData: {
        full_name: 'Avinash Shrimali',
        profile_picture: 'https://scontent.cdninstagram.com/v/t51.29350-15/118885986_328768241703876_1409494140667970700_n.jpg?_nc_cat=104&_nc_sid=8ae9d6&_nc_ohc=CeFkYEPVjIQAX-_r17E&_nc_ht=scontent.cdninstagram.com&oh=9d991d4d20441fd91edec25ae569d1c1&oe=5F828618'
      },
      userData: null,
      filterData: [],
      userMediaData: [],
      stateChange: false,
      searchValue: ""
    };
    this.getMediaDetails = this.getMediaDetails.bind(this);
    this.getMediaInfo = this.getMediaInfo.bind(this);
  }

  getUserProfileInfo() {
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

  getMediaInfo() {
    this.setState({ userMediaData: [] })
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
          this.getMediaDetails(result.data, this.props.baseUrl)
        },
        error => {
          console.log("error...", error);
          this.props.history.push("/login");
        }
      );
  }
  getMediaDetails = (data, baseUrl) => {
    let detailsData = [];
    data.forEach(value => {
      if (value.id) {
        const url = baseUrl + value.id +
          "?fields=id,media_type,media_url,username,timestamp&access_token=" +
          sessionStorage.getItem("access-token");
        fetch(url)
          .then(res => res.json())
          .then(
            result => {
              const data = result;
              data["caption"] = value.caption;
              detailsData.push(data);
              this.state.userMediaData.push(result);
              this.setState({
                stateChange: !this.state.stateChange,
                filterData: this.state.userMediaData
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
    this.getUserProfileInfo();
    this.getMediaInfo();
  }
  render() {
    return (
      <div>
        <Header
          {...this.props}
          showSearchBar={true}
          searchChangeHandler={this.searchChangeHandler}
        />
        <Container maxWidth="xl">
          <ImageCard data={this.state.filterData} />
        </Container>
      </div>
    );
  }

  searchChangeHandler = event => {
    this.setState({ searchValue: event.target.value });
    if (event.target.value) {
      const filter = this.state.filterData.filter(data => {
        if (
          data.caption.split("#")[0].indexOf(this.state.searchValue) > -1
        ) {
          return data;
        }
      });
      this.setState({ filterData: filter });
    } else {
      this.setState({ filterData: this.state.userMediaData });
    }
  };
}

export default Home;