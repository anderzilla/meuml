import React from "react";
import ChooseAccBtn from './ChooseAccBtn';
import UnblockUser from './UnblockUser';
import Data, { DataContainer } from './DataContainer';
import { Card, CardHeader, CardBody } from "reactstrap";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const Main = () => {
  return (
    <DataContainer>
      <div className="animated">
        <Card>
          <CardHeader>
            <ChooseAccBtn />
          </CardHeader>
          <CardBody>
            <Data.Consumer>
              {(provider) => { return(
              <BootstrapTable
                version="4"
                striped
                hover
                pagination
                search
                data={provider.state.blacklist}
                paginationSize={provider.state.paginationSize}
                sortIndicator ={true}
                hideSizePerPage ={true}
                hidePageListOnlyOnePage ={true}
                clearSearch ={true}
                alwaysShowAllBtns ={false}
                withFirstAndLast ={false}
              >
                <TableHeaderColumn dataField="account_id" dataSort>
                  Bloqueado para
                </TableHeaderColumn>
                <TableHeaderColumn isKey dataField="customer_id">
                  Usuário bloqueado
                </TableHeaderColumn>
                <TableHeaderColumn dataField="motive_id" dataSort>
                  Tipo do Bloqueio
                </TableHeaderColumn>
                <TableHeaderColumn dataField="motive_description" dataSort>
                  Motivo
                </TableHeaderColumn>
                <TableHeaderColumn dataField="bids" dataSort>
                  P/ Compras
                </TableHeaderColumn>
                <TableHeaderColumn dataField="questions" dataSort>
                  P/ Perguntas
                </TableHeaderColumn>
              </BootstrapTable>
              )}}
            </Data.Consumer>
          </CardBody>
          <UnblockUser />
        </Card>
      </div>
    </DataContainer>
  );
}

export default Main;
