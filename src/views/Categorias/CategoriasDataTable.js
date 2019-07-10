import React from 'react';
import {
    Card,
    CardBody,
    Input,
    CardHeader
} from "reactstrap";
import axios from "axios";
import { getToken } from "../../auth";
import Swal from "sweetalert2";

// import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';


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
            lastUpdate: '',
            last_page: 0
        };

        this.fetchCategorias();
    }

    fetchCategorias(limit = 50, page = 1, filter = '', sortName = 'id', sortOrder = 'ASC') {

        if (page >= this.state.last_page && this.state.last_page != 0) {
            page = this.state.last_page
        }

        let url = process.env.REACT_APP_API_URL + `/categories?page=${page}&limit=${limit}`

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
    }

    filterText(targetVal, filterVal) {
        if (targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
            return false;
        }
        return true;
    }


    onFilterChange(value) {

        var filter = value
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
        const columns = [{
            dataField: 'external_id',
            text: 'ID',
            sort: true
        }, {
            dataField: 'path',
            text: 'Descrição',
            sort: true
        }, {
            dataField: 'weight',
            text: 'Peso',
            sort: true,
            style: { width: '80px' }
        }, {
            dataField: 'cubage',
            text: 'Dimensão',
            sort: true,
            style: { width: '210px' }

        }];




        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                Mostrando {from} em {to} de {size} resultados
            </span>
        );

        // const options = {
        //     custom:true,
        //     paginationSize: 50,
        //     pageStartIndex: 0,
        //     // alwaysShowAllBtns: true, // Always show next and previous button
        //     // withFirstAndLast: false, // Hide the going to First and Last page button
        //      hideSizePerPage: true, // Hide the sizePerPage dropdown always
        //     // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        //     firstPageText: 'First',
        //     prePageText: 'Back',
        //     nextPageText: 'Next',
        //     lastPageText: 'Last',
        //     nextPageTitle: 'First page',
        //     prePageTitle: 'Pre page',
        //     firstPageTitle: 'Next page',
        //     lastPageTitle: 'Last page',
        //     showTotal: true,
        //     paginationTotalRenderer: customTotal,

        // };
        const options = {

            hideSizePerPage: true,
            defaultSortName: 'name',
            defaultSortOrder: 'desc',
            sizePerPage: this.props.sizePerPage,
            //   onPageChange: this.props.onPageChange,
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

        const MySearch = (props) => {
            let input;
            const handleClick = () => {
                props.onSearch(input.value);
                this.props.onFilterChange(input.value);
            };

            return (

                <div className='input-group filtro'>
                    <input
                        className="col-md"
                        ref={n => input = n}
                        type="text"
                        placeholder={'Pesquisar por descrição...'}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                handleClick()
                            }
                        }}
                    />

                    <span className='it-group-btn'>
                        <button
                            className='btn btn-primary'
                            type='button'

                            onClick={handleClick}>
                            Buscar
                    </button>
                    </span>
                </div>
            );
        };

        return (

            <Card>
                {/* <CardHeader className='cad-header'>
             
                </CardHeader> */}
                <div>
                    <h6 className={"labelAtualiza"}> Atualizado em {Moment(this.props.lastUpdate).format('DD/MM/YYYY HH:MM')} </h6>

                    <CardBody className='table-content'>

                        {/* <BootstrapTable data={this.props.data} remote={true} pagination={true} search={true} searchPlaceholder={'Filtrar por descrição...'}
                            columns={columns} fetchInfo={{ dataTotalSize: this.props.totalDataSize }}

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
                                noDataText: <ReactLoading type={'spinningBubbles'} color={'#054785'} height={100} width={100} className='spinnerStyle' />

                            }} striped hover>

                            {/* <TableHeaderColumn width='120' dataField='external_id' isKey={true} dataSort={true}>ID </TableHeaderColumn>
                            <TableHeaderColumn width='320' dataField='path' dataSort={true}>Descrição</TableHeaderColumn>
                            <TableHeaderColumn width='120' dataField='weight' dataSort={true}>Peso</TableHeaderColumn>
                            <TableHeaderColumn width='120' dataField='cubage' dataSort={true}>Dimensão</TableHeaderColumn> 

                        </BootstrapTable> */}


                        <ToolkitProvider
                            keyField="id"
                            data={this.props.data}
                            columns={columns}
                            search
                        >
                            {
                                props => (
                                    <div>

                                        <MySearch {...props.searchProps} />
                                        <br />
                                        <BootstrapTable
                                            keyField="id"
                                            data={this.props.data}
                                            columns={columns}
                                            striped
                                            hover
                                            condensed
                                            //noDataIndication={<ReactLoading type={'spinningBubbles'} color={'#054785'} height={100} width={100} className='spinnerStyle' />}
                                            pagination={paginationFactory(options)}
                                            remote={true}
                                            fetchInfo={{ dataTotalSize: this.props.totalDataSize }}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>



                    </CardBody>
                </div>
            </Card>
        );
    }
}

export default CategoriasDataTable;
