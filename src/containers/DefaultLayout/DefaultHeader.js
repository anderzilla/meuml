import React, { Component } from 'react';
import { DropdownMenu, DropdownToggle, Nav ,DropdownItem, Badge, Dropdown, Progress } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';

import logo from '../../assets/img/brand/MeuML-logo2.png'
import sygnet from '../../assets/img/brand/sygnet-logo.png'
import avatar from '../../assets/img/avatars/user.svg'
import axios from "axios";
import {getToken} from "../../auth";
import Swal from "sweetalert2";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

    constructor(props){
        super(props);
        this.setState({
            notif: true
        })

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
        this.setState({
            notifications: [],
            isLoadingNotifications: true,
        });

        this.getNotifications()
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    getNotifications()
    {

        axios.get(process.env.REACT_APP_API_URL + `/notifications`,
            { headers: { "Authorization": 'Bearer ' + getToken() } })
            .then(res => {
                if (res.data.status === 'success') {
                    const message = res.data.message;
                    this.setState({
                        notifications: res.data.data,
                        isLoadingNotifications: false,
                    });
                } else {
                    this.setState({
                        notifications: [],
                        isLoadingNotifications: false,
                    });

                }
            });
    }

    render() {

        // eslint-disable-next-line

        const { children, ...attributes } = this.props;

        return (


          <React.Fragment>
              <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand
              full={{ src: logo, width:200, alt: 'MeuML' }}
              minimized={{ src: sygnet, width: 30, height: 30, alt: 'MeuML' }}
            />

            <AppSidebarToggler className="d-md-down-none" display="lg" />

            <Nav className="ml-auto" navbar>

                <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen}  toggle={this.toggle}>
                    <DropdownToggle nav>
                        <i className="icon-bell"></i><Badge pill color="danger">2</Badge>
                    </DropdownToggle>
                    <DropdownMenu right>
                        {!this.state.isLoadingNotifications ? (
                            !this.state.notifications > 0 ? (
                                <DropdownItem header tag="div" className="text-center"><strong>You have 5 notifications</strong></DropdownItem>
                            ) : (
                                <h3>Nenhuma notificação localizada ... </h3>
                            )
                        ) : (
                            <h3>Carregando notificações...</h3>
                        )}
                        <DropdownItem>
                            <div className="text-uppercase mb-1">
                                <small><b>Créditos</b></small>
                            </div>
                            <Progress className="progress-xs" color="info" value="25" />
                            <small className="text-muted">R$ 39,00</small>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
              <AppHeaderDropdown>
                <DropdownToggle nav>
                  <img src={avatar} className="img-avatar" alt="admin@bootstrapmaster.com" />
                </DropdownToggle>
                <DropdownMenu right style={{ right: 'auto', height: '400px' }}>
                  AppHeaderDropdown
                </DropdownMenu>
              </AppHeaderDropdown>
            </Nav>
            {/*<AppAsideToggler className="d-md-down-none" />*/}
            {/*<AppAsideToggler className="d-lg-none" mobile />*/}
          </React.Fragment>
        );
      }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
