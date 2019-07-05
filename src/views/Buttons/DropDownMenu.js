import React, { Component } from 'react';
import { DropdownMenu } from 'reactstrap';

class DropDownMenu extends Component {
    render() {
        return(
            <DropdownMenu>
                {this.props.children}
            </DropdownMenu>   
        );
    }
}

export default DropDownMenu;