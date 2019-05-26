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

  render() {
    return (
      <div> Whattdup </div>
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
