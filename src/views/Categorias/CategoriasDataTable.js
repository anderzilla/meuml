import React from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Input,
    CardHeader,
    Table
} from "reactstrap";
import axios from "axios";
import { getToken } from "../../auth";
import Swal from "sweetalert2";

import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading';
import Moment from 'moment';

class CategoriasDataTable extends React.Component {
    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);

        this.compareBy.bind(this);
        this.sortBy.bind(this);

        this.state = {
            data: [],
            sizePerPage: 50,
            totalSize: 0,
            sizePerPage: 50,
            page: '',
            filter: '',
            filtro: '',
            first: '',
            lastUpdate: '',
            last_page: 0,
            isLoading: true,
            total: '',
            sortName: 'id',
            sortOrder: 'ASC',
        };

        this.getStorage();
        // this.fetchCategorias();
    }

    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    fetchCategorias(page = 1) {
        let url = process.env.REACT_APP_API_URL + `/categories?page=${page}&limit=${this.state.sizePerPage}`
        if (this.state.filter !== '') {
            url += `&filter=` + this.state.filter
        }
        url += '&sortOrder=' + this.state.sortOrder + '&sortName=' + this.state.sortName
        axios.get(url,
            { headers: { "Authorization": 'Bearer ' + getToken() } },
        ).then(res => {
            if (res.data.status === 'success') {

                let total = res.data.meta.total;
                let limit = res.data.meta.limit;

                this.setState({
                    data: res.data.data,
                    totalSize: total,
                    sizePerPage: res.data.meta.limit,
                    page: res.data.meta.page,
                    lastUpdate: res.data.meta.last_update,
                    last_page: res.data.meta.last_page
                });

                this.saveStorage(res.data.meta.page);

                if (this.state.page >= this.state.last_page) {
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

    filterText(targetVal, filterVal) {
        if (targetVal.toString().toLowerCase().indexOf(filterVal) === -1) {
            return false;
        }
        return true;
    }

    onFilterChange() {
        var page = this.state.page
        this.saveStorage(1);
        this.fetchCategorias(1)

    }

    onPageChange(page) {
        this.setState({
            page: page
        });
        this.saveStorage(page);
        this.fetchCategorias(page);


    }

    handleChange(event) {

        var pesquisa = {}
        pesquisa = event.target.value
        this.setState({
            filter: pesquisa
        });
        console.log('filtro', this.state.filter)
    }

    saveStorage(page) {
        var data = {
            page: page,
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            filter: this.state.filter
        }
        localStorage.setItem('filtro-categorias', JSON.stringify(data));
    }

    getStorage() {
        console.log(localStorage.getItem('filtro-categorias'));
        var data = JSON.parse(localStorage.getItem('filtro-categorias'))
        console.log(data);

        // this.setState({
        if (localStorage.getItem('filtro-categorias') != null) {
            this.state.page = data.page;
            this.state.sortName = data.sortName;
            this.state.sortOrder = data.sortOrder;
            this.state.filter = data.filter;
            this.fetchCategorias(data.page);
        }else{
            this.fetchCategorias(1);
        }

        // });
        //this.forceUpdate();
        console.log('page', this.state.page)
        console.log('sortName', this.state.sortName)
        console.log('sortOrder', this.state.sortOrder)
        console.log('filter', this.state.filter)
       
    }

    handlePageChange(pageNumber) {

        this.onPageChange(pageNumber);
    }

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {

        var sortOrder_ = this.state.sortOrder;

        if (sortOrder_ === 'ASC') {
            this.state.sortOrder = 'DESC'
        } else {
            this.state.sortOrder = 'ASC'
        }
        this.state.sortName = key;
        // this.setState({
        //     sortName: key,
        //     sortOrder: sortOrder_
        // });

        var page = this.state.page

        this.fetchCategorias(page);
        this.saveStorage(page);


    }

    render() {
        const { isLoading } = this.state.data;

        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader>
                        <h6 className={"labelAtualiza"}> Atualizado em {Moment.utc(this.state.last_update).format('ddd MMM DD h:mm:ss YYYY')} </h6>
                        <div className='input-group filtro'>
                            <Input type={'text'} className={"col-md"} ref='seachInput' id="inputPesquisa" value={this.state.filter} placeholder={'Pesquisar por descrição...'} onChange={this.handleChange} onClick={this.onFilterChange} />
                            <span className='it-group-btn'>
                                <button
                                    className='btn btn-primary'
                                    type='button'
                                    onClick={this.onFilterChange}>
                                    Buscar
                                </button>
                            </span>
                        </div>
                    </CardHeader>
                    <CardBody className='table-content'>
                        <Table responsive className="table table-responsive-sm table-bordered table-striped table-sm">
                            <thead>
                                <tr>
                                    <th className="tbcol-10 text-center order-column" onClick={() => this.sortBy('id')} >ID<span className="order"><span className="dropdown"><span className="caret"></span></span><span className="dropup"><span className="caret"></span></span></span></th>
                                    <th className="tbcol-50 text-center order-column" onClick={() => this.sortBy('path')} >Descrição<span className="order"><span className="dropdown"><span className="caret"></span></span><span className="dropup"><span className="caret"></span></span></span></th>
                                    <th className="tbcol-20 text-center order-column" onClick={() => this.sortBy('weight')} >Peso<span className="order"><span className="dropdown"><span className="caret"></span></span><span className="dropup"><span className="caret"></span></span></span></th>
                                    <th className="tbcol-20 text-center order-column" onClick={() => this.sortBy('cubage')} >Dimensão<span className="order"><span className="dropdown"><span className="caret"></span></span><span className="dropup"><span className="caret"></span></span></span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (
                                        !isLoading ? (
                                            this.state.data.map((cat) => {
                                                return (
                                                    <tr key={cat.id}>
                                                        <td> {cat.external_id}</td>
                                                        <td className="text-center">
                                                            {cat.path}
                                                        </td>
                                                        <td className="text-center">
                                                            {cat.weight}
                                                        </td>
                                                        <td className="text-center">
                                                            {cat.cubage}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                                <ReactLoading type={'spinningBubbles'} color={'#054785'} height={50} width={50} className='spinnerStyle' />
                                            )
                                    )
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={this.state.sizePerPage}
                            totalItemsCount={(this.state.totalSize)}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemClass="btn btn-md btn-outline-info"
                            activeClass="btn btn-md btn-info"
                            innerClass="btn-group"
                            activeLinkClass="text-white"
                        />
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default CategoriasDataTable;
