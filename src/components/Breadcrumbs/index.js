import React, { Component } from 'react';

class Breadcrumbs extends Component {

    buildBreadcrumb() {
      let crumbs = this.props.crumbs.map(crumb => {
        let className = "breadcrumb-item";

        let link = crumb.link || '#';
        let title = crumb.title;
        
        if(link === '#') {
          className = `${className} active`;
        }

        if(link !== '#') return <li className={className} aria-current="page"><a href={link}>{title}</a></li>;
        else if(link === '#') return <li className={className}>{title}</li>;
      });

      return crumbs;
    }

    render() {
        return(
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  {this.buildBreadcrumb()}
                </ol>
            </nav>
        );
    }
}

export default Breadcrumbs;