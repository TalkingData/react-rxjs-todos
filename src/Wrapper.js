import React, { Component } from 'react';
import { takeWhile } from 'rxjs/operators';
import service from './service/todo';

class Wrapper extends Component {

  state = {
    source: null,
  }

  componentDidMount() {
    this.alive = true;
    this.setState({
      source: service.todos$.pipe(
        takeWhile(() => this.alive),
      ),
    });
  }

  componentWillUnmount() {
    this.alive = false;
  }

  render() {
    const { render } = this.props;
    return (
      <React.Fragment>
        {
          this.state.source ? render({
            service,
            source: this.state.source,
          }): null
        }
      </React.Fragment>
    );
  }
}

export default Wrapper;
