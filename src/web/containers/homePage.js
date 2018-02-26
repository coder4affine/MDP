import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loadHome from '../../actions/homeAction';

export class HomePage extends Component {
  static propTypes = {};

  componentWillMount = () => {
    this.props.loadHome();
  };

  render() {
    const { loading } = this.props.home;
    return <div>{loading ? 'loading' : 'not loading'}</div>;
  }
}

HomePage.propTypes = {
  loadHome: PropTypes.func.isRequired,
  home: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    error: PropTypes.object,
    updatedOn: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = state => ({
  home: state.home,
});

const mapDispatchToProps = dispatch => ({
  loadHome: () => {
    dispatch(loadHome());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
