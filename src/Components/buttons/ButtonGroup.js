import React, { Component } from 'react';
import { DropdownToggle, DropdownMenu, ButtonDropdown, ButtonGroup } from "reactstrap";

class BtnGroup extends Component {
  constructor(props) {
    super(props);

    this.state = { isDropdownOpen: false };
  }

  toggle() {
    this.state.isDropdownOpen ? (
        this.setState({ isDropdownOpen:false })
        ):(
        this.setState({ isDropdownOpen:true })
    )
  };

  render() {
    return(
      <div>
        {
          (this.props.className === 'horizontal-button-group') ? (
          <ButtonGroup>
            {this.props.children}
          </ButtonGroup>
          ) : (
            (this.props.className === 'vertical-button-group') ? (
              <ButtonGroup>
              <ButtonDropdown
                  isOpen={this.state.isDropdownOpen}
                  toggle={() => { this.toggle() }}>
                <DropdownToggle caret color="primary" size="sm">Opções</DropdownToggle>
                <DropdownMenu>
                    {this.props.children}
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            ) : (
              this.props.children
            )
          )
      }
      </div>
    );
  }
}

export default BtnGroup;
