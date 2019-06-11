import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>&copy; 2019 MeuML.com</span>
        <span className="ml-auto">suporte@meuml.com.br ou (41)3333-4444</span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
