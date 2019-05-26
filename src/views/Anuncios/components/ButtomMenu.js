import React, { Component } from 'react';
import styled from 'styled-components';
import {
  ButtonDropdown, DropdownToggle, DropdownItem,
  DropdownMenu,
} from 'reactstrap';

function DropdownList(props) {
  const options = props.options;
  const list = options.map((option, index) =>
    <DropdownItem key={`dl_${option}_${index}`} >{option}</DropdownItem>
  );
  return (
    <DropdownMenu >
      { list }
    </DropdownMenu>
  );
}
const StyledMenu = styled.div`
  margin: 2px;
`;

export default class ButtomMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClick() {
    this.setState({ open: !this.state.open});
  }
  render() {
    const { title, options}  = this.props;
    return (
      <StyledMenu>
        <ButtonDropdown isOpen={this.state.open} toggle={this.handleClick.bind(this)} >
          <DropdownToggle caret color="secondary" >
            { title }
          </DropdownToggle>
          <DropdownList options={options} />
        </ButtonDropdown>
      </StyledMenu>
    );
  }
}


