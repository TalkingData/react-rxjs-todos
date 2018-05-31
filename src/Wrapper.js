import React, { Component } from 'react';
import { takeWhile } from 'rxjs/operators';

class Wrapper extends Component {

  state = {
    streams: {
      isMounted: false,
    },
  }

  componentDidMount() {
    const { app } = this.props;
    const streams = {};
    this.alive = true;

    Object.keys(app)
    .filter((item) => /\$$/.test(item))
    .forEach(item => {
      streams[item] = app[item].pipe(
        takeWhile(() => this.alive),
      );
    });

    this.setState({
      streams: {
        isMounted: true,
        ...streams,
      },
    });
  }

  componentWillUnmount() {
    this.alive = false;
  }

  render() {
    const { render, app } = this.props;
    return (
      <React.Fragment>
        {
          this.state.streams.isMounted ? render({
            app,
            dispatch: app.dispatch,
            streams: this.state.streams,
          }): null
        }
      </React.Fragment>
    );
  }
}

export default Wrapper;
