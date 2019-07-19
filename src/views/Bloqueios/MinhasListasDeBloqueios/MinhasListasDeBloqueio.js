import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Form,
  Label,
  FormGroup,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../../auth";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

class MinhasListasDeBloqueio extends Component {
  constructor(props) {
    super(props);

    this.toggleConta = this.toggleConta.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      accountId: "",
      accountName: "",
      blackListName: "",
      accounts: [],
      backlistList: [],
      isLoadingBlacklistList: true,
      isLoadingAccounts: true
    };

    this.nbloqueios = "2048";
    this.nlistas = "48";
    // ...
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleConta() {
    this.setState(prevState => ({
      dropdownOpenConta: !prevState.dropdownOpenConta
    }));
  }

  fetchBlacklist(accountId, accountName) {
    this.setState({ accountId: accountId, accountName: accountName });
  }

  componentDidMount() {
    this.fetchAccounts();
    this.fetchBlacklistList();
  }

  fetchAccounts() {
    this.url = process.env.REACT_APP_API_URL + `/accounts`;
    axios
      .get(this.url, { headers: { Authorization: "Bearer " + getToken() } })
      .then(res => {
        //console.log(res);
        if (res.status === 200) {
          this.setState({
            accounts: res.data.data,
            isLoadingAccounts: false
          });
          if (res.data.data.meta.total > 0) {
            this.fetchBlacklist(res.data.data[0].id);
          } else {
          }
        } else {
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "error",
            showConfirmButton: true
          });
        }
      })
      .catch(error => {});
  }

  fetchDeletarLista(id) {
    this.url = process.env.REACT_APP_API_URL + `/blacklist/list/` + id;
    axios
      .delete(this.url, { headers: { Authorization: "Bearer " + getToken() } })
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            html: "<p>Lista excluída com sucesso</p>",
            type: "success",
            showConfirmButton: true
          });
        } else {
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "error",
            showConfirmButton: true
          });
        }
        this.fetchBlacklistList();
      })
      .catch(error => {
        !error.response
          ? this.setState({ tipoErro: error })
          : this.setState({ tipoErro: error.response.data.message });
        Swal.fire({
          html: "<p>" + this.state.tipoErro + "<br /></p>",
          type: "error",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Fechar"
        });
      });
  }

  fetchBlacklistList() {
    this.url = process.env.REACT_APP_API_URL + `/blacklist/list`;
    axios
      .get(this.url, { headers: { Authorization: "Bearer " + getToken() } })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            backlistList: res.data.data,
            isLoadingBlacklistList: false,
            nlistas: res.data.meta.total
          });
        } else {
          Swal.fire({
            html: "<p>" + res.data.message + "</p>",
            type: "error",
            showConfirmButton: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.blackListName === "") {
      Swal.fire({
        html: "<p>Preencha o nome da lista para bloqueá-la</p>",
        type: "error",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Fechar"
      });
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL + `/blacklist/list/import`,
          [
            {
              account_id: this.state.accountId,
              blacklist_name: this.state.blackListName
            }
          ],
          {
            headers: {
              Authorization: "Bearer " + getToken(),
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          //console.log(res.data);
          const status = res.data.status;
          this.setState({ status });
          if (this.state.status === "success") {
            const message = res.data.message;
            this.setState({ message });
            Swal.fire({
              html: "<p>" + this.state.message + "</p>",
              type: "success",
              showCloseButton: false,
              showConfirmButton: true,
              textConfirmButton: "OK"
            });
          } else {
            const message = res.data.message;
            this.setState({ message });
            Swal.fire({
              html: "<p>" + this.state.message + "</p>",
              type: "error",
              showConfirmButton: true
            });
          }
        })
        .catch(error => {
          console.log(error);
          !error.response
            ? this.setState({ tipoErro: error })
            : this.setState({ tipoErro: error.response.data.message });
          Swal.fire({
            html: "<p>" + this.state.tipoErro + "<br /></p>",
            type: "error",
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Fechar"
          });
        });
    }
  }

  render() {
    const {
      isLoading,
      isLoadingAccounts,
      isLoadingBlacklistList,
      backlistList,
      error,
      accounts
    } = this.state;
    const columns = [
      {
        dataField: "name",
        text: "Nome da Lista",
        sort: true
      },
      {
        dataField: "list_description",
        text: "Descrição",
        sort: true
      },
      {
        dataField: "quantidade",
        text: "Quantidade",
        sort: true
      },
      {
        dataField: "df1",
        isDummyField: true,
        text: " ",
        formatter: (cellContent, row) => {
          return (
            <Button
              onClick={() => this.fetchDeletarLista(row.id)}
              className="btn btn-danger btn-small"
            >
              <i className="fa fa-trash" />
            </Button>
          );
        }
      }
    ];

    // {
    //   dataField: 'df1',
    //   isDummyField: true,
    //   text: 'Action 1',
    //   formatter: (cellContent, row) => {
    //     if (row.inStock) {
    //       return (
    //         <h5>
    //           <span className="label label-success"> Available</span>
    //         </h5>
    //       );
    //     }
    //     return (
    //       <h5>
    //         <span className="label label-danger"> Backordered</span>
    //       </h5>
    //     );
    //   }
    // },

    // const customTotal = (from, to, size) => (
    //     <span className="react-bootstrap-table-pagination-total">
    //         Mostrando {from} em {to} de {size} resultados
    //     </span>
    // );

    const options = {
      hideSizePerPage: true,
      defaultSortName: "name",
      defaultSortOrder: "desc",
      sizePerPage: this.props.sizePerPage,
      sizePerPageList: [50],
      page: this.props.currentPage,
      onSizePerPageList: this.props.onSizePerPageList,
      totalSize: this.props.totalDataSize,
      onPageChange: (page, sizePerPage) => {
        // console.log('Page change!!!');
        // console.log('Newest size per page:' + sizePerPage);
        // console.log('Newest page:' + page);

        this.props.onPageChange(page, sizePerPage);
      }
    };
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            {this.state.nlistas === 0 ? (
              <div className="alert alert-info fade show">
                Nenhma lista de bloqueio cadastrada
              </div>
            ) : (
              <BootstrapTable
                keyField="id"
                data={backlistList}
                columns={columns}
                striped
                hover
                condensed
                //noDataIndication={<ReactLoading type={'spinningBubbles'} color={'#054785'} height={100} width={100} className='spinnerStyle' />}
                pagination={paginationFactory(options)}
                remote={true}
                fetchInfo={{ dataTotalSize: this.props.totalDataSize }}
              />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MinhasListasDeBloqueio;
