import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Pagination from "react-js-pagination";
import { data } from './_data';

export default class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thead: ['id', 'conta', 'tipo', 'motivo', 'descricao'],
      tbody: [],
      total: 1,
      activePage: 1,
      sizePerPage: 10,
      isLoading: true
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({
      tbody: data,
      isLoading: false
    });
  }

  unblockUser () {
    return <button className="btn btn-success btn-sm ">Desbloquear</button>
  }

  headBuilder = () => {
    if(this.state.thead !== undefined &&
      this.state.thead !== null &&
      this.state.thead !== '') {
        return this.state.thead.map(col => {
          return (
            <th>{col}</th>
          );
        });
      }
      else return <div />
  }

  bodyBuilder = () => {
    if(this.state.tbody !== undefined &&
      this.state.tbody !== null &&
      this.state.tbody !== '') {
        return this.state.tbody.rows.map(user => {
          return(
            <tr key={user.idusuario}>
              <td>{user.idusuario}</td>
              <td>{user.conta}</td>
              <td>{user.tipo}</td>
              <td>{user.motivo}</td>
              <td>{user.descricao}</td>
              <td>{this.unblockUser(user.idusuario)}</td>
            </tr>
          );
      });
      }
      else return <div />
  }

  footerBuilder = () => {
    return(
      <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={this.state.sizePerPage}
        totalItemsCount={this.state.total - 1}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
        itemClass="btn btn-md btn-outline-info"
        activeClass="btn btn-md btn-info"
        innerClass="btn-group"
        activeLinkClass="text-white"
      />
    );
  }

  handlePageChange = () => {

  }

  render() {
    return(
      <div className="container-fluid">
        {this.state.isLoading ? <p>Carregando ...</p> : (
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <select>
                      <option>Escolha uma conta</option>
                    </select>
                  </div>
                  <div className="card-body">
                    <table className="table table-responsive-sm" >
                      <thead>
                        <tr>{this.headBuilder()}</tr>
                      </thead>
                      <tbody>
                        {this.bodyBuilder()}
                      </tbody>
                      <tfooter>
                        {this.footerBuilder()}
                      </tfooter>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
