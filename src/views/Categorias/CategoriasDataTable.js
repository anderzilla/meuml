
import React, { Component } from 'react';
import axios from "axios";
import {getToken} from "../../auth";
import Swal from "sweetalert2";
import {Card, CardBody, CardHeader, } from "reactstrap";



import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
// ...

const columns = [{
    dataField: 'external_id',
    text: 'ID',
    sort: true
}, {
    dataField: 'path',
    text: 'Categoria',
    filter: textFilter(),
    sort: true
}, {
    dataField: 'weight',
    text: 'Peso',
    sort: true
}, {
    dataField: 'cubage',
    text: 'Dimensão',
    sort: true
}];


const defaultSorted = [{
    dataField: 'external_id',
    order: 'desc'
}];

const cellEditProps = {
    mode: 'click'
};

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
    <div>
        <BootstrapTable
            remote
            keyField="id"
            data={ data }
            columns={ columns }
            defaultSorted={ defaultSorted }
            filter={ filterFactory() }
            pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
            onTableChange={ onTableChange }
        />
    </div>
);
/*
RemoteAll.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    onTableChange: PropTypes.func.isRequired
};
*/

class Categorias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: [],
            totalSize: 0,
            sizePerPage: 50
        };
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
        console.log('filters',filters);

        if(page < 0){
            page -= 1;
        }

        if(this.isEmpty(filters)){
            filters = ''
        }else{
            if(filters.path !== undefined){
                filters = filters.path.filterVal;
            }else{
                filters = ''
            }
        }

        if (page >= this.state.last_page && this.state.last_page != 0) {
            page = this.state.last_page
        }

        let url = process.env.REACT_APP_API_URL + `/categories?page=${page}&limit=${sizePerPage}`
        /*
                if (this.state.filter !== '') {
                    url += `&filter=` + this.state.filter
                }*/

        if (filters !== '') {
            url += `&filter=` + filters
        }

        if (this.state.sortName !== 'id' && this.state.sortName !== undefined) {
            sortField = this.state.sortName;
        }

        if (this.state.sortOrder !== 'ASC' && this.state.sortOrder !== undefined) {
            sortOrder = this.state.sortOrder
        }

        url += '&sortOrder=' + sortOrder + '&sortName=' + sortField

        axios.get(url,
            { headers: { "Authorization": 'Bearer ' + getToken() } },
        ).then(res => {
            if (res.data.status === 'success') {

                let total = res.data.meta.total;
                let limit = res.data.meta.limit;
                let diss = total / limit;
                let spl = diss.toString().split('.');
                if(spl.length > 1){

                    var restoDivisao = (((res.data.meta.total) * 100) % res.data.meta.pages) / 100

                    var meta_total = res.data.meta.total - restoDivisao

                }


                this.setState({
                    data: res.data.data,
                    totalSize: meta_total,
                    sizePerPage: res.data.meta.limit,
                    page: res.data.meta.page,
                    lastUpdate: res.data.meta.last_update,
                    last_page: res.data.meta.last_page
                });

                if (page >= this.state.last_page) {
                    this.setState({
                        totalDataSize: res.data.meta.total - res.data.meta.limit
                    });
                }

            } else {
                Swal.fire({ html: '<p>' + res.data.message + '</p>', type: 'error', showConfirmButton: true });
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
        return true;
    }

    render() {
        const { data, sizePerPage, page, totalSize} = this.state;
        return (
            <RemoteAll
                data={ data }
                page={ page }
                sizePerPage={ sizePerPage }
                totalSize={ totalSize }
                onTableChange={ this.handleTableChange }
            />
        );
    }
}

export default Categorias;
