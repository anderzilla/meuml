import React, { Component } from 'react';
import axios from "axios";
import {getToken} from "../../auth";
import Swal from "sweetalert2";
import {Card, CardBody, CardHeader, } from "reactstrap";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'


const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const RemoteTable = props => (
    <div>
      <BootstrapTable
          remote={ { sort: true } }
          keyField="id"
          data={ props.data }
          pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
          columns={ columns }
          onTableChange={ props.fetchCategories }
      />
    </div>
);


class Categorias extends Component {


  constructor(props) {
    super(props);

    this.fetchCategories();

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

  fetchCategorias(limit = 50, offset = 1, filter = '', sortName = 'id', sortOrder = 'ASC') {

    let url = process.env.REACT_APP_API_URL + `/categories?offset=${offset}&limit=${limit}`

    if( this.state.filter !== ''){
      url += `&filter=`+this.state.filter
    }

    if(filter !== ''){
      url += `&filter=`+filter
    }

    if(this.state.sortName !== 'id' && this.state.sortName !== undefined){
      sortName = this.state.sortName;
    }

    if(this.state.sortOrder !== 'ASC' && this.state.sortOrder !== undefined){
      sortOrder = this.state.sortOrder
    }

    url += '&sortOrder=' + sortOrder + '&sortName=' + sortName

    axios.get(url,
        {headers: {"Authorization": 'Bearer ' + getToken()}},
    ).then(res => {
      if (res.data.status === 'success') {

        this.setState({
          data: res.data.data,
          totalDataSize: res.data.meta.total,
          sizePerPage: res.data.meta.limit,
          currentPage: res.data.meta.page
        });

      } else {
        Swal.fire({html: '<p>' + res.data.message + '</p>', type: 'error', showConfirmButton: true});
      }
    }).catch(error => {
      Swal.fire({
        html: '<p>' + error.response.data.message + '</p>',
        type: 'error',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Fechar'
      });
    });
  }

  render() {
    return (
        <RemoteTable
            data={ this.state.data }
            onTableChange={ this.fetchCategories }
        />
    );
  }
}



export default Categorias;
