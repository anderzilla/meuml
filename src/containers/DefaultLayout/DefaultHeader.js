import React, { Component } from 'react';
import { DropdownMenu, DropdownToggle, Nav ,DropdownItem, Badge, Dropdown, Progress } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import {Notifications} from '../../views/Notifications';

import logo from '../../assets/img/brand/MeuML-logo2.png'
import sygnet from '../../assets/img/brand/sygnet-logo.png'
import avatar from '../../assets/img/avatars/user.svg'
import axios from "axios";
import {getToken} from "../../auth";
import Notifier from "react-desktop-notification"

import Swal from "sweetalert2";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

    constructor(props){
        super(props);

        this.state = {
            notif: true,
            dropdownOpen: false,
            notifications: [],
            isLoadingNotifications: true,
        };

        this.toggle = this.toggle.bind(this);

        this.getNotifications()
    }

    gotNewNotification(){

        //Here will pop a notifier and always open in a new window when clicked.
        Notifier.start("Title","Here is context","www.google.com","validated image url");

        //Here will pop notifier and open in a specified name window "popwin1" when clicked.
        Notifier.start("Title","Here is context","www.google.com","validated image url","popwin1");

        //Here will pop notifier and focus parent window only when clicked.
        Notifier.focus("Title","Here is context","www.google.com","validated image url");

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
                        notifications: res.data.data.notifications,
                        isLoadingNotifications: false,
                    });

                    if (res.data.data.browser !== undefined){
                        if(res.data.data.browser.questions !== undefined){
                            Notifier.start("Novas perguntas ",res.data.data.browser.questions.message,"/#/perguntas?view=all");
                        }
                    }


                } else {
                    this.setState({
                        notifications: [],
                        isLoadingNotifications: false,
                    });

                }
            });
    }

    setNotificationsAsViewed()
    {
        axios.put(process.env.REACT_APP_API_URL + `/notifications/viewed/all`,
            {},
            { headers: { "Authorization": 'Bearer ' + getToken() } });
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

                {/* <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} onClick={() => this.setNotificationsAsViewed()} toggle={this.toggle}>
                    <DropdownToggle nav>
                        <i className="icon-bell"></i><Badge pill color="danger">{this.state.notifications.length}</Badge>
                    </DropdownToggle>
                    <DropdownMenu right>
                        {!this.state.isLoadingNotifications ? (
                            this.state.notifications.length > 0 ? (

                                    this.state.notifications.map((notification)=> {
                                        return (
                                                <DropdownItem header tag="div" className={"text-center" + !notification.viewed ? "default": "success" } ><span>1 Pergunta não respondida: <br /></span><a href={notification.resource}>{notification.resource}</a></DropdownItem>
                                            )
                                    })
                            ) : (
                                <DropdownItem header tag="div" className="text-center"><strong>Nenhuma notificação</strong></DropdownItem>
                            )
                        ) : (
                            <h3>Carregando notificações...</h3>
                        )}
                    </DropdownMenu>
                </Dropdown> */}
              {/* <AppHeaderDropdown>
                <DropdownToggle nav>
                  <img src={avatar} className="img-avatar" alt="admin@bootstrapmaster.com" />
                </DropdownToggle>
                <DropdownMenu right style={{ right: 'auto', height: '400px' }}>
                  AppHeaderDropdown
                </DropdownMenu>
              </AppHeaderDropdown> */}
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
