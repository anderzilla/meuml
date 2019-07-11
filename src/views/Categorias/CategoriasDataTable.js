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


        this.state = {
            data: [],
            sizePerPage: 50,
            totalDataSize: 0,
            sizePerPage: 50,
            activePage: 1,
            filter: '',
            filtro: '',
            first: '',
            lastUpdate: '',
            last_page: 0,
            isLoading: true,
            total: ''
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
                console.log("data", res.data.data)
                this.setState({
                    data: res.data.data,
                    totalDataSize: res.data.meta.total - 1,
                    sizePerPage: res.data.meta.limit,
                    currentPage: res.data.meta.page,
                    lastUpdate: res.data.meta.last_update,
                    last_page: res.data.meta.last_page -1,
                    isLoading: false,
                });

                if (page >= this.state.last_page) {
                    this.setState({
                        totalDataSize: res.data.meta.total - res.data.meta.limit,
                        isLoading: false
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



    handlePageChange(pageNumber) {
        !pageNumber ? this.setState({ activePage: '1' }) : this.setState({ activePage: pageNumber });
        this.onPageChange(pageNumber, 50);
    }

    render() {
        const { isLoading, accounts, selectedOption, contas, arrayValue, contasMarcadas, offset } = this.state.data;
        const lista = this.state.data
        const dados = this.state

        return (
            // <CategoriasTableComp
            //     onFilterChange={this.onFilterChange.bind(this)}
            //     onSearchChange={this.onFilterChange.bind(this)}
            //     onPageChange={this.onPageChange.bind(this)}
            //     onSortChange={this.onSortChange.bind(this)}
            //     onHandleChange={this.handleChange.bind(this)}
            //     {...this.state}
            // />
            <div className="animated fadeIn">
                <Card>
                    {/* <div> */}

                    <h6 className={"labelAtualiza"}> Atualizado em {Moment(this.state.lastUpdate).format('DD/MM/YYYY HH:MM')} </h6>
                    <CardBody className='table-content'>

                        <Table responsive className="table table-responsive-sm table-bordered table-striped table-sm">
                            <thead>
                                <tr>
                                    <th className="tbcol-10 text-center" >ID</th>
                                    <th className="tbcol-50 text-center">Descrição</th>
                                    <th className="tbcol-20 text-center">Peso</th>
                                    <th className="tbcol-20 text-center">Dimensão</th>
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
                    <CardFooter className=" align-content-center ">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.sizePerPage}
                            totalItemsCount={(this.state.totalDataSize)}
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
