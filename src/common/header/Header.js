import React, { Component } from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      searchValue: "",
      userProfileData: {
        full_name: 'Avinash Shrimali',
        profile_picture: 'https://scontent.cdninstagram.com/v/t51.29350-15/118885986_328768241703876_1409494140667970700_n.jpg?_nc_cat=104&_nc_sid=8ae9d6&_nc_ohc=CeFkYEPVjIQAX-_r17E&_nc_ht=scontent.cdninstagram.com&oh=9d991d4d20441fd91edec25ae569d1c1&oe=5F828618'
      },
    };

  }

  componentDidMount() {
    if (this.state.loggedIn === false) {
      this.props.history.push("/");
    }
  }

  menuOpenHandler = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  menuCloseHandler = () => {
    this.setState({ anchorEl: null });
  };
 
  logoutHandler = () => {
    sessionStorage.removeItem("access-token");
    this.menuCloseHandler();
    this.props.history.push("/");
  };

  profileRedirect = () => {
    this.props.history.push("/profile");
  };
  
  homeRedirect = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="header">
        <div className="title" onClick={this.homeRedirect}>Image Viewer</div>

        <div className="header-right">
          {this.props.showSearchBar === true ?
            <div id="search-field">
              <div className="searchIcon">
                <SearchIcon/>
              </div>
              <Input className="searchInput" onChange={this.props.searchChangeHandler} disableUnderline={true}
                     placeholder="Search..."/>
            </div> : ""}
          <IconButton id="profile-icon" edge="start" color="inherit" aria-label="menu" style={{marginTop: '0.5rem', marginRight: '0.5rem'}}>
            {this.state.userProfileData ?
              <Avatar alt={this.state.userProfileData.full_name} id="profile-icon" fontSize="small"
                      ariant="circle" src={this.state.userProfileData.profile_picture}
                      onClick={this.menuOpenHandler}/> : null}
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.menuCloseHandler}
            >
              <MenuItem onClick={this.profileRedirect}>My Account</MenuItem>
              <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </div>

      </div>

    );
  }


}

export default Header;