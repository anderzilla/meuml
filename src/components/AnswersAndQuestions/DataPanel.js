import React, { Component } from 'react';
import SelectAccount from './SelectAccount';
import DataTable from '../Categories/DataTable';
import { InfoGroup, InfoLabel } from '../ListGroup/InfoGroup';

export default class DataPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesDataTableIs: 'closed'
    }
  }

  handleCategories = () => {
    if (this.state.categoriesDataTableIs === 'closed') {
      this.setState({ categoriesDataTableIs: 'opened'});
    } else this.setState({categoriesDataTableIs: 'closed'});
  }

  render() {
    return (
      <>
        <InfoGroup className="col-md-4">
          <InfoLabel span="">Contas Sincronizadas</InfoLabel>
          <InfoLabel span="">Perguntas não respondidas</InfoLabel>
          <InfoLabel span="">
            <SelectAccount accounts={this.state.accounts}/>
            <button className="btn btn-secondary btn-sm"
              onClick={()=>this.handleCategories()}
              >Categorias
            </button>
          </InfoLabel>
        </InfoGroup>
        <hr />
        {this.state.categoriesDataTableIs === 'closed' ? <div /> : (<DataTable />)}
      </>
    );
  }
}