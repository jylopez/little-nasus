'use strict';
const React = require('react');
const { connect } = require('react-redux');

const mapStateToProps = function (state, ownProps) {
  return {
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
  }
}

class HomeWrapper extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        Basic Nas starting point
      </div>
    )
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);