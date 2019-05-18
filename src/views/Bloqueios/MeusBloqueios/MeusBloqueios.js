import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Table, Button} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import {getToken} from '../../../auth';
import Pagination from "react-js-pagination";



class MeusBloqueios extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: new Array(50).fill(false),
      blacklist: [],
      isLoading: true,
      data: [],
      totalDataSize: 0,
      sizePerPage: 50,
      offset: 1,
      filter: ''
    };
  }

  componentDidMount() {
    this.fetchBlacklist();
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    !pageNumber ? this.state = {offset : '1'} :
    this.state = {offset : pageNumber};
    //this.props.history.push('/meusbloqueios?offset='+this.state.offset+'&limit=50');
  }

  fetchBlacklist(limit = 50, offset = 1, filter = '', sortName = 'id', sortOrder = 'ASC') {
    axios.get(process.env.REACT_APP_API_URL + `/blacklist`,
        { headers: { "Authorization": 'Bearer ' + getToken() } })
        .then(res => {
          console.log(res.data);
          if (res.data.status === 'success') {
            const message = res.data.message;
            if (res.data.meta.total !== 0) {
              this.setState({
                blacklist: res.data.data,
                paginacao: res.data.meta,
                total: res.data.meta.total,
                isLoading: false,
                data: res.data.data,
                totalDataSize: res.data.meta.total,
                sizePerPage: res.data.meta.limit,
                currentPage: res.data.meta.page
              });
            } else {
              Swal.fire({html: '<p>' + message + '</p>', type: 'info', showConfirmButton: true,
              onClose: () => {
                this.setState({
                  blacklist: res.data.data,
                  isLoading: false,
                });
              }
            });
            }
          } else {
            Swal.fire({html: '<p>' + res.data.message + '</p>', type: 'error', showConfirmButton: true,
            onClose: () => {
              this.setState({
                blacklist: res.data.data,
                isLoading: false,
              });
            }
            });
          }
        });
  }

  render() {

    const { isLoading, blacklist, error } = this.state;

    let j=0;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <h5>Bloqueios - {this.state.total}</h5> 
          </CardHeader>
          <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>ID do Usuario</th>
                <th class="text-center">Compras</th>
                <th class="text-center">Perguntas</th>
                <th>Motivo</th>
                <th class="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
            {!isLoading ? (
            blacklist.map((bl, k)=> {
              const { customer_id, bids, questions, motive_description } = this.state;
              console.log(blacklist)
                return (      
                  <tr>
                    <td>{bl.customer_id}</td>
                <td class="text-center">{bl.bids ? <i class="fa fa-check text-success"></i> : <i class="fa fa-ban text-danger"></i>}</td>
                    <td class="text-center">{bl.questions ? <i class="fa fa-check text-success"></i> : <i class="fa fa-ban text-danger"></i>}</td>
                    <td>{bl.motive_description}</td>
                    <td>
                    <Button class="btn btn-danger btn-small "><i class="fa fa-unlock"></i> Desbloquear</Button>
                    </td>
                  </tr>
                );
              })
          ) : (
              <h3>Loading...</h3>
          )}
                  </tbody>
                </Table>
          </CardBody>
          <CardFooter className=" align-content-center ">
          <Pagination
          activePage={this.state.offset}
          itemsCountPerPage={this.state.sizePerPage}
          totalItemsCount={this.state.total}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange()}
          itemClass= "btn btn-md btn-outline-info"
          activeClass = "btn btn-md btn-info"
          innerClass = "btn-group"
          activeLinkClass = "text-white"
        />
              
          </CardFooter>

        </Card>

      </div>
    );
  }
}

export default MeusBloqueios;
