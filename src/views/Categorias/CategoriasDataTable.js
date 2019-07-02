import React from 'react';
import {
    Card,
    CardBody,
    Input
} from "reactstrap";
import axios from "axios";
import { getToken } from "../../auth";
import Swal from "sweetalert2";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ReactLoading from 'react-loading';
import Moment from 'moment';

class CategoriasDataTable extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            data: [],
            totalDataSize: 0,
            sizePerPage: 50,
            currentPage: 1,
            filter: '',
            filtro: '',
            first: '',
            lastUpdate:''
        };

        this.fetchCategorias();
    }

    fetchCategorias(limit = 50, offset = 1, filter = '', sortName = 'id', sortOrder = 'ASC') {

        let url = process.env.REACT_APP_API_URL + `/categories?offset=${(offset * limit)}&limit=${limit}`

        if (this.state.filter !== '') {
            url += `&filter=` + this.state.filter
        }

        if (filter !== '') {
            url += `&filter=` + filter
        }

        if (this.state.sortName !== 'id' && this.state.sortName !== undefined) {
            sortName = this.state.sortName;
        }

        if (this.state.sortOrder !== 'ASC' && this.state.sortOrder !== undefined) {
            sortOrder = this.state.sortOrder
        }

        url += '&sortOrder=' + sortOrder + '&sortName=' + sortName

        axios.get(url,
            { headers: { "Authorization": 'Bearer ' + getToken() } },
        ).then(res => {
            if (res.data.status === 'success') {

                this.setState({
                    data: res.data.data,
                    totalDataSize: res.data.meta.total,
                    sizePerPage: res.data.meta.limit,
                    currentPage: res.data.meta.page,
                    lastUpdate:res.data.meta.last_update
                });

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
    }

    filterText(targetVal, filterVal) {
        if (targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
            return false;
        }
        return true;
    }


    onFilterChange() {
        var filter = this.state.filtro;

        if (filter !== undefined) {

            this.state.filter = filter;
            this.fetchCategorias(this.state.sizePerPage, this.state.currentPage, filter)
        } else {
            this.state.filter = '';
            this.fetchCategorias(this.state.sizePerPage, this.state.currentPage)
        }

    }

    onPageChange(page, sizePerPage) {
        this.page = page;
        this.sizePerPage = sizePerPage;
        this.fetchCategorias(sizePerPage, page)

    }

    onSortChange(sortName = 'id', sortOrder = 'ASC') {
        this.state.sortName = sortName;
        this.state.sortOrder = sortOrder;
        this.fetchCategorias(this.state.sizePerPage, this.state.currentPage, this.state.filter, sortName, sortOrder)

    }

    handleChange(event) {

        var pesquisa = {}
        pesquisa = event.target.value
        this.setState({
            filtro: pesquisa
        });
    }



    render() {
        return (
            <CategoriasTableComp
                onFilterChange={this.onFilterChange.bind(this)}
                onSearchChange={this.onFilterChange.bind(this)}
                onPageChange={this.onPageChange.bind(this)}
                onSortChange={this.onSortChange.bind(this)}
                onHandleChange={this.handleChange.bind(this)}
                {...this.state}
            />



        );
    }


}

class CategoriasTableComp extends React.Component {


    customFilter = () => {
        return (
            <div className='input-group filtro'>
                <Input type={'text'} className={"col-md"} ref='seachInput' id="inputPesquisa" placeholder={'Pesquisar por descrição...'} onChange={this.props.onHandleChange} />
                <span className='it-group-btn'>
                    <button
                        className='btn btn-primary'
                        type='button'
                        onClick={this.props.onSearchChange}>
                        Buscar
                    </button>
                </span>
            </div>
        );
    }
    render() {


        return (

            <Card>
                {/* <CardHeader>
F
                </CardHeader> */}
                <div>

               
                    <CardBody>
                        <h6 className={"labelAtualiza"}> Atualizado em {Moment(this.props.lastUpdate).format('DD/MM/YYYY HH:MM')} </h6>
                        <BootstrapTable data={this.props.data} remote={true} pagination={true} search={true} searchPlaceholder={'Filtrar por descrição...'}
                            fetchInfo={{ dataTotalSize: this.props.totalDataSize }}

                            options={{
                                defaultSortName: 'name',
                                defaultSortOrder: 'desc',
                                sizePerPage: this.props.sizePerPage,
                                onPageChange: this.props.onPageChange,
                                sizePerPageList: [50],
                                page: this.props.currentPage,
                                onSizePerPageList: this.props.onSizePerPageList,
                                onSortChange: this.props.onSortChange,
                                searchField: this.createCustomSearchField,
                                searchPanel: this.customFilter,
                                noDataText:   <ReactLoading type={'spinningBubbles'} color={'#054785'} height={100} width={100}  className='spinnerStyle'/>

                            }} striped hover>

                            <TableHeaderColumn width='120' dataField='external_id' isKey={true} dataSort={true}>ID </TableHeaderColumn>
                            <TableHeaderColumn width='320' dataField='path' dataSort={true}>Descrição</TableHeaderColumn>
                            <TableHeaderColumn width='120' dataField='weight' dataSort={true}>Peso</TableHeaderColumn>
                            <TableHeaderColumn width='120' dataField='cubage' dataSort={true}>Dimensão</TableHeaderColumn>

                        </BootstrapTable>
                    </CardBody>
                </div>
            </Card>
        );
    }
}

export default CategoriasDataTable;
