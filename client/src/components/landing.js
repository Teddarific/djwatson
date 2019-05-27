import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import { setURI } from '../actions/index';

import '../style.scss';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitURI = this.submitURI.bind(this);
  }

  handleChange(e) {
    this.setState({
      uri: e.target.value,
    });
  }

  submitURI() {
    this.props.setURI(this.state.uri);
    this.props.history.push('/dj');
  }

  render() {
    return (
      <div className="landing-container">
        <div className="landing-title gradient"> DJ WATSON </div>
        {
        // <div className="landing-subtitle">
        //   {'Enter your Spotify Playlist\'s URI to get started.'}
        // </div>
        }
        <Fade duration={3000}>
          <input className="landing-input" placeholder="Spotify Playlist URI" onChange={this.handleChange} type="text" value={this.state.uri} />
          <button className="landing-button" onClick={this.submitURI}> MIX </button>
        </Fade>
      </div>
    );
  }
}

export default withRouter(connect(null, {
  setURI,
})(Landing));
