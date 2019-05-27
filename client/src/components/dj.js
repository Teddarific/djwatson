import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import DotDotDot from './dotdotdot';

import { getSongs, clearData } from '../actions/index';

class DJ extends Component {
  constructor(props) {
    super(props);

    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    // const testURI = 'spotify:user:227yp6zusymii3tmzutj7gvfi:playlist:700AFroef6joR8AliYiCQk';
    // this.props.getSongs(testURI);
    this.props.getSongs(this.props.data.uri);
  }

  goHome() {
    this.props.clearData();
    this.props.history.push('/');
  }

  renderTracks = (tracks) => {
    return tracks.map((song) => {
      return (
        <div className="song song-hoverable">
          <div className="song-title"> {song.name} </div>
          <div className="song-artist"> {song.artist} </div>
        </div>
      );
    });
  }

  render() {
    const listLoading = (
      <div className="loading">
        List is loading
        <DotDotDot />
      </div>
    );

    const songsElement = this.props.data.songs ? this.renderTracks(this.props.data.songs) : listLoading;
    const orderedElement = this.props.data.ordered ? this.renderTracks(this.props.data.ordered) : listLoading;

    return (
      <div className="dj-container">
        <div className="dj-title gradient" onClick={this.goHome} role="button" tabIndex={0}>
          DJ WATSON
        </div>
        <div className="dj-songs">
          <div className="dj-list">
            <Fade bottom duration={500}>
              <div className="dj-list-title"> Your Playlist </div>
            </Fade>
            <Fade bottom duration={500}>
              <div className="song list-title">
                <div className="song-title"> TITLE </div>
                <div className="song-artist"> ARTIST </div>
              </div>
            </Fade>
            {songsElement}
          </div>
          <div className="dj-list">
            <Fade bottom duration={500}>
              <div className="dj-list-title"> Ordered Playlist </div>
            </Fade>
            <Fade bottom duration={500}>
              <div className="song list-title">
                <div className="song-title"> TITLE </div>
                <div className="song-artist"> ARTIST </div>
              </div>
            </Fade>
            {orderedElement}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.data,
  }
);


export default withRouter(connect(mapStateToProps, {
  getSongs,
  clearData,
})(DJ));
