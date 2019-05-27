import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getSongs, getOrdered } from '../actions/index';

class DJ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const testURI = 'spotify:user:227yp6zusymii3tmzutj7gvfi:playlist:700AFroef6joR8AliYiCQk';
    // console.log(this.props.data.uri);
    // this.props.getSongs(this.props.data.uri);
    this.props.getSongs(testURI);
  }

  renderTracks = (tracks) => {
    return tracks.map((song) => {
      return (
        <div className="song">
          <div className="song-title"> {song.name} </div>
          <div className="song-artist"> {song.artist} </div>
        </div>
      );
    });
  }

  render() {
    const listLoading = (
      <div>
        List is loading...
      </div>
    );

    const songsElement = this.props.data.songs ? this.renderTracks(this.props.data.songs) : listLoading;
    const orderedElement = this.props.data.ordered ? this.renderTracks(this.props.data.ordered) : listLoading;

    return (
      <div className="dj-container">
        <div className="dj-title gradient">
          DJ WATSON
        </div>
        <div className="dj-songs">
          <div className="dj-song-list">
            {songsElement}
          </div>
          <div className="dj-song-list">
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
  getOrdered,
})(DJ));
