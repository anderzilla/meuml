// React dependencies
import React, { Component } from "react";

// Style dependencies
import { DropdownItem } from "reactstrap";
import Swal from "sweetalert2";

// Other dependencies
import api from "../../services/api";

// Main Component
class DropDownItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      data: "",
      method: "",
      headers: "",
      hasChanged: false
    };

    // Binds
    this.buttonCall = this.buttonCall.bind(this);
    this.listenChanges = this.listenChanges.bind(this);
  }

  // Asking for 'data parameter' then sets new states
  buttonCall(props) {
    const { url, method, headers } = props;

    // Getting data
    Swal.fire({
      title: "Informe o valor:",
      input: "text",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showConfirmButton: true,
      confirmButtonText: "Confirmar"

      // Setting the new state
    }).then(res => {
      this.state.url = url;
      this.state.data = { name: res.value };
      this.state.method = method;
      this.state.headers = headers;

      // Firing a state reactive function
      this.state.hasChanged = true;
      this.listenChanges();
    });
  }

  // Listening for state changes
  listenChanges() {
    const { url, data, method, headers, hasChanged } = this.state;

    if (hasChanged === true) {
      
      // Choosing the right HTTP method to work with
      // PUT
      if (method === "put") {
        api.put(url, data, headers).then(res => {
          if (res.status === 200) {
            Swal.fire({
              html: `<p>Feito!</p>`,
              type: "success",
              showConfirmButton: true,
              confirmButtonText: "Ok"
            });
          }
        });
      
      // POST
      } else if (method === "post") {
        api.post(url, data).then(res => {
          Swal.fire({
            html: `<p>Renomeado com sucesso</p>`,
            type: "success",
            showConfirmButton: true,
            confirmButtonText: "Ok"
          });
        });

      // DELETE
      } else if (method === "delete") {
        api.delete(url, data).then(res => {
          Swal.fire({
            html: `<p>Renomeado com sucesso</p>`,
            type: "success",
            showConfirmButton: true,
            confirmButtonText: "Ok"
          });
        });

      // Warning a BAD REQUEST
      } else {
        Swal.fire({
          html: `<p>Método da API inválido.</p>`,
          type: "error",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Fechar"
        });
      }
    }
  }

  render() {
    return (
      <DropdownItem
        url={this.props.children}
        method={this.props.children}
        headers={this.props.children}
        onClick={() => this.buttonCall(this.props)}
      >
        {this.props.children}
      </DropdownItem>
    );
  }
}

export default DropDownItem;
