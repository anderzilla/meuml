import React, { Component } from "react";
import { DropdownToggle, DropdownMenu, ButtonDropdown, ButtonGroup } from "reactstrap";

class DropDownMenu extends Component {
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
          <DropdownToggle caret color={this.props.className} size="sm">Opções</DropdownToggle>
          <DropdownMenu>
              {this.props.children}
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>
    );
  }
}

export default DropDownMenu;