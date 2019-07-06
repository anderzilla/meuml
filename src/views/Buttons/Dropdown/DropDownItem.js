// React dependencies
import React, { Component } from "react";

// Style dependencies
import { DropdownItem } from "reactstrap";
import Swal from "sweetalert2";

// Other dependencies
import api from "../../../services/api";

// Main Component
class DropDownItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      data: "",
      method: "",
      hasChanged: false
    };

    // Binds
    this.apiRequest = this.apiRequest.bind(this);
    this.apiHandler = this.apiHandler.bind(this);
  }

  // Asking for 'data parameter' then sets new states
  apiRequest(props) {
    const { url, method, headers } = props;
    this.validateRequest(url, method, headers);
  }

  validateRequest(url, method) {
    if (method === 'get' || method === 'delete' ) {
      this.state.url = url // Delete parameters must be passed through the URL
      this.state.method = method

      this.state.hasChanged = true

      this.apiHandler();

    } else {
      // Getting data to POST or PUT
      Swal.fire({
        title: "Informe o valor:",
        input: "text",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showConfirmButton: true,
        confirmButtonText: "Confirmar"

        // Setting the new state
      }).then(res => {
        const data = { name: res.value };

        this.state.url = url
        this.state.data = data
        this.state.method = method

        this.state.hasChanged = true

        this.apiHandler();
      });
    };
  };

  // Listening for state changes
  apiHandler() {
    const { url, data, method, hasChanged } = this.state;

    if (hasChanged === true) {
      
      // Choosing the right HTTP method to work with
      // GET
      if (method === 'get') {
        api.get(url).then(res => {
          if (res.status === 200) {
            Swal.fire({
              html: '<p>Feito!</p>',
              type: 'success',
              showConfirmButton: true,
              showCancelButton: false,
              confirmButtonText: 'Fechar'
            })
          }
        });

      // PUT
      } else if (method === "put") {
        api.put(url, data).then(res => {
          if (res.status === 200) {
            Swal.fire({
              html: `<p>Editado com sucesso</p>`,
              type: "success",
              showConfirmButton: true,
              confirmButtonText: "Fechar"
            });
          }
        });
      
      // POST
      } else if (method === "post") {
        api.post(url, data).then(res => {
          Swal.fire({
            html: `<p>Enviado com sucesso</p>`,
            type: "success",
            showConfirmButton: true,
            confirmButtonText: "Ok"
          });
        });

      // DELETE
      } else if (method === "delete") {
        api.delete(url, data).then(res => {
          Swal.fire({
            html: `<p>Deletado com sucesso</p>`,
            type: "success",
            showConfirmButton: true,
            confirmButtonText: "Ok"
          });
        });

      // Warning a BAD REQUEST
      } else {
        Swal.fire({
          html: `<p>Método da API inválido. ${method}</p>`,
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
        onClick={() => this.apiRequest(this.props)}
        >{this.props.children}
      </DropdownItem>
    );
  }
}

export default DropDownItem;