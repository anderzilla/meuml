import React, { Component } from 'react';
import axios from "axios";
import {getToken} from "../../auth";
import Swal from "sweetalert2";
import {Card, CardBody, CardHeader, } from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class Categorias extends Component {


  constructor(props) {
    super(props);
    this.products = this.fetchCategories();
    this.state = {
      data: [],
      totalDataSize: 0,
      sizePerPage: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {

    axios.get(process.env.REACT_APP_API_URL + `/categories`,
        { headers: {"Authorization" : 'Bearer '+getToken()}},
    ).then(res => {
      if (res.data.status === 'success'){

        this.table = res.data.data;
        this.options = {
          sortIndicator: true,
          hideSizePerPage: true,
          paginationSize: res.data.meta.pages,
          hidePageListOnlyOnePage: true,
          clearSearch: true,
          alwaysShowAllBtns: false,
          withFirstAndLast: false,
          sizePerPage: 50,
          paginationShowsTotal: true
        }


        this.setState({
          categorias: res.data.data,
          isLoading: false,
          total: res.data.meta.total
        });

      }else{
        Swal.fire({html:'<p>'+res.data.message+'</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({html:'<p>'+ error.response.data.message+'</p>', type: 'error', showConfirmButton: false, showCancelButton: true, cancelButtonText: 'Fechar'});
    });
  }

  render() {


    const { isLoading, categorias, error } = this.state;

    return (

        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <h4>Categorias - ({this.state.total}) </h4>
            </CardHeader>

            <CardBody>
              <BootstrapTable data={this.table} version="4" striped hover pagination search options={this.options}>
                <TableHeaderColumn isKey dataField="external_id" dataSort>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="path">Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField="weight" dataSort>Peso</TableHeaderColumn>
                <TableHeaderColumn dataField="dimension" dataSort>Dimensão</TableHeaderColumn>
              </BootstrapTable>
            </CardBody>

          </Card>

        </div>
    );
  }
}

export default Categorias;
