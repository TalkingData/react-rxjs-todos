import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import Wrapper from "./Wrapper";

/**
 * A public higher-order component to access the imperative API
 */
const withLoop = Component => {
  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <Wrapper
        render={props => {
          return (
            <Component
            {...remainingProps}
            {...props}
            ref={wrappedComponentRef}
          />
          );
        }}
      />
    );
  };

  C.displayName = `withRouter(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: PropTypes.func
  };

  return hoistStatics(C, Component);
};

export default withLoop;