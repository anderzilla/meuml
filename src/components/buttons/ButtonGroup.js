import React from "react";
import {
  ButtonGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import api from "../../services/api";
import Swal from "sweetalert2";

export class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdown: "closed" };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    if (this.state.dropdown === "closed") this.setState({ dropdown: "opened" });
    if (this.state.dropdown === "opened") this.setState({ dropdown: "closed" });
  }

  render() {
    return (
      <ButtonGroup>
        <ButtonDropdown
          isOpen={this.state.dropdown === "opened"}
          toggle={this.toggle}
          size="sm"
        >
          <DropdownToggle caret color="dark" size="md">
            {this.props.title || <span>Opções</span>}
          </DropdownToggle>
          <DropdownMenu>{this.props.children}</DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>
    );
  }
}

export class BtnGroup extends React.Component {
  render() {
    return(
      <>
        <ButtonGroup className="this.props.className">
          {this.props.children}
        </ButtonGroup>
      </>
    );
  }
}

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      http: null,
      url: null,
      called: 0,
      ask: null,
      mode: "sleep"
    };
    this.handleBuild = this.handleBuild.bind(this);
    this.callApi = this.callApi.bind(this);
  }
  componentDidMount() {
    this.handleBuild();
  }

  handleBuild = async () => {
    if (this.state.mode === "sleep") {
      try {
        const { data, http, url, ask, callback } = this.props;
        if (ask !== undefined) await this.setState({ ask });
        if (data !== undefined) await this.setState({ data });
        if (http !== undefined) await this.setState({ http });
        if (url !== undefined) await this.setState({ url });
        if (callback !== undefined) await this.callback();

        if (http !== null && url !== null){
          await this.setState({ mode: "ready" });
        };
      } catch (error) {
        Swal.fire({
          html: `<p>${error}</p>`,
          type: "error",
          showCloseButton: true
        });
      }
    }
  };

  notify = res => {
    Swal.fire({
      html: `<p>${res.data.message}</p>`,
      type: res.data.status,
      showCloseButton: true
    });
  };
  callback = () => this.props.callback();
  callApi = async () => {
    try {
      await this.handleBuild();
      const { data, http, url } = this.state;
      if (http === "get") {
        const statusResponse = await api.get(url);
        this.notify(statusResponse);
      
      } else if (http === "put") {
        if(data === null) {
          Swal.fire({
            html: `<p>${this.state.ask}</p>`,
            type: "question",
            input: "text",
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: "Cancelar"
          }).then(res => {
            if(res !== null && res !== undefined){
              this.callback();
              api.put(url, {name:res.value}).then(resT => {
                // this.props.history.push('/listacontas?status=lista');
                window.location.reload();
                Swal.fire({
                  html:`<p>${resT.data.message}</p>`,
                  type: resT.data.status,
                  showCloseButton: true
                });
              })
            }
          })
        } else {
          const statusResponse = await api.put(url, data);
          this.notify(statusResponse);
        }

      } else if (http === "post") {
        const statusResponse = await api.post(url, data);
        this.notify(statusResponse);
      } else if (http === "delete") {
        const statusResponse = await api.delete(url);
        this.notify(statusResponse);
      }
      await this.setState("sleep");
    } catch {}
  };

  render() {
    return (
      <button
        className={this.props.className}
        onClick={() => this.callApi()}
        callback={() => this.props.callback()}
        name={this.props.name}
        data={this.props.data}
        http={this.props.http}
        url={this.props.url}
        ask={this.props.ask}
      >{this.props.children}
      </button>
    );
  }
}
