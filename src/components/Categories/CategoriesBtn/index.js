import React, { Component } from 'react';
import DataTable from '../DataTable';
import './index.css'

export default class CategoriesBtn extends Component {
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
    return(
      <>
        <button className="btn btn-secondary btn-sm float-right"
          onClick={()=>this.handleCategories()}
          value={this.state.categoriesDataTableIs}
          onChange={()=>this.props.onChange()}
          >Categorias
        </button>
          {this.state.categoriesDataTableIs === 'closed' ? <div /> : (
            <div className="popup">
              <div className="popup_inner" >
                <button onClick={()=>this.handleCategories()} className="btn btn-danger btn-sm">X</button>
                <DataTable />
              </div>
            </div>
          )}
      </>
    );
  }
}