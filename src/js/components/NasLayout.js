'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { Route, Switch } = require('react-router-dom');
const HomeWrapper = require('../components/HomeWrapper');
const mapStateToProps = function (state, ownProps) {
  return {}
}

const mapDispatchToProps = function (dispatch) {
  return {}
}

class NasLayout extends React.Component {
  render() {
    return (
      <div>
        <Switch>

          <Route exact path={`${this.props.match.url}`} component={HomeWrapper} />

        </Switch>
      </div>
    );
  }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NasLayout);