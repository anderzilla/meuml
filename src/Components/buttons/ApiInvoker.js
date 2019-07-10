import React, { Component } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from './api-lexicon';
import swalShout from '../../swalShout';

class ApiInvoker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            data: null,
            http: '',
            onSuccess: '',
            hasChanged: false
        }
    }

    callback(props) {
        if(props.http === 'get' || props.http === 'delete') {
            this.setState({
                url: props.url, // Delete parameters must be passed through URL
                data: null,
                http: props.http,
                onSuccess: props.onSuccess,
                hasChanged: true
            });

            this.apiHandler(props.http);

        }

        else if(props.http === 'post') {
            this.setState({
                url: props.url,
                data: props.data,
                http: props.http,
                onSuccess: props.onSuccess,
                hasChanged: true
            });

            this.apiHandler('post');

        }

        else if(props.http === 'put') {
            this.setState({
                url: props.url,
                data: props.data,
                http: props.http,
                onSuccess: props.onSuccess,
                hasChanged: true
            });

            this.apiHandler('put');

        } else {
            swalShout(`Método HTTP (${props.http}) inválido`);
        }
    };

    async apiHandler(req) {
        const { url, data, onSuccess, hasChanged } = this.state;
        if(hasChanged) {
            if(req === 'get') {
                apiGet(url, onSuccess);
            }

            else if(req === 'post') {
                apiPost(url, data, onSuccess);
            }

            else if(req === 'put') {
                apiPut(url, data, onSuccess);
            }

            else if(req === 'delete') {
                apiDelete(url, onSuccess)
            }
        }
    };

  render() {
    return(
        <button type="button"
          className={this.props.className}
          url={this.props.url}
          data={this.props.data}
          http={this.props.http}
          onSuccess={this.props.onSuccess}
          question={this.props.question}
          onClick={ ()=> this.callback(this.props) }
          >{this.props.children}
        </button>
    );
  }
}

export default ApiInvoker;
