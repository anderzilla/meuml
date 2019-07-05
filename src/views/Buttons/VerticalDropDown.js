import React, { Component } from "react";
import { DropdownToggle, ButtonDropdown, ButtonGroup } from "reactstrap";
import DropDownMenu from './DropDownMenu';

class VerticalDropDown extends Component {
  constructor(props) {
    super(props);
    
    this.state = { isDropdownOpen: false };
  }

  // Changing the button state to the opposite
  // If it is contracted it expands and if it is expanded it contracts
  toggle() {
      this.state.isDropdownOpen ? (
          this.setState({ isDropdownOpen:false })
          ):(
          this.setState({ isDropdownOpen:true })
      )
  };

  render() {
    return (
      <ButtonGroup>
        <ButtonDropdown
            isOpen={this.state.isDropdownOpen}
            toggle={() => { this.toggle() }}>
          <DropdownToggle caret color="primary" size="sm">Opções</DropdownToggle>
          <DropDownMenu>
              {this.props.children}
          </DropDownMenu>
        </ButtonDropdown>
      </ButtonGroup>
    );
  }
}

export default VerticalDropDown;
