import React, { Component } from 'react';
import axios from "axios";
import {getToken} from "../../auth";
import Swal from "sweetalert2";

import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";


class CategoriasDataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            totalDataSize: 0,
            sizePerPage: 50,
            currentPage: 1,
            filter: ''
        };

        this.fetchCategorias();
    }

    fetchCategorias(limit = 50, offset = 1, filter = '', sortName = 'id', sortOrder = 'ASC') {

        let url = `https://api.app2.meuml.com/categories?offset=${offset}&limit=${limit}`

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

    filterText(targetVal, filterVal) {
        if (targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
            return false;
        }
        return true;
    }


    onFilterChange(filterObj) {
        if (filterObj.path !== undefined){

            this.state.filter = filterObj.path.value;
            this.fetchCategorias(this.state.sizePerPage, this.state.currentPage, filterObj.path.value)
        }else{
            this.state.filter = '';
            this.fetchCategorias(this.state.sizePerPage, this.state.currentPage)
        }

    }

    onPageChange(page, sizePerPage) {
        const currentIndex = (page - 1) * sizePerPage;
        this.page = page;
        this.sizePerPage = sizePerPage;
        this.fetchCategorias(sizePerPage, page)

    }

    onSortChange(sortName = 'id', sortOrder = 'ASC'){
        this.state.sortName = sortName;
        this.state.sortOrder = sortOrder;
        this.fetchCategorias(this.state.sizePerPage, this.state.currentPage, this.state.filter, sortName, sortOrder)

    }

    render() {
        return (
            <CategoriasTableComp
                onFilterChange={ this.onFilterChange.bind(this) }
                onPageChange={ this.onPageChange.bind(this) }
                onSortChange={ this.onSortChange.bind(this) }
                {...this.state}
            />
        );
    }
}

class CategoriasTableComp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BootstrapTable data={ this.props.data } remote={ true } pagination={ true }
                            fetchInfo={ { dataTotalSize: this.props.totalDataSize } }
                            options={ { sizePerPage: this.props.sizePerPage,
                                onPageChange: this.props.onPageChange,
                                sizePerPageList: [ 50],
                                page: this.props.currentPage,
                                onSizePerPageList: this.props.onSizePerPageList,
                                onFilterChange: this.props.onFilterChange,
                                onSortChange: this.props.onSortChange
                            } }>
                <TableHeaderColumn dataField='external_id' isKey={ true }>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='path' filter={ { type: 'TextFilter' } }>Descrição</TableHeaderColumn>
                <TableHeaderColumn dataField='weight' dataSort={ true }>Peso</TableHeaderColumn>
                <TableHeaderColumn dataField='cubage'  dataSort={ true }>Dimensão</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default CategoriasDataTable;
