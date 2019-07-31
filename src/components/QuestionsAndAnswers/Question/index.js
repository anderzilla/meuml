import React, { Component } from  'react';
import { fetchAccounts, fetchQuestions } from '../fetch';
import { ActionGroup, ActionLabel } from '../../ListGroup/ActionGroup';
import Answer from '../buttons/Answer';
import Delete from '../buttons/Delete';

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state ={
      accId: null,
      questionId: null,
      answer: '',
      sync: false,
      error: null
    };
  }

  resync = () => {
    fetchAccounts().then(()=> {
      fetchQuestions(this.state.accId);
      this.setState({ sync: true });
    }).catch(err => {
      this.setState({ sync: false, error: err });
    });
  }

  render() {
    return(
      <ActionGroup className="col-md-6">
        <ActionLabel key={this.props.key}
          title={this.props.title}
          smallTitle={this.props.smallTitle}
          label={this.props.label}
          smallLabel={this.props.smallLabel}
          accId={this.props.accId}
          userId={this.props.userId}
          questionId={this.props.questionId}
          >
          <div className="row">
            <Answer
              accId={this.props.accId}
              questionId={this.props.questionId}
              questText={this.props.label}
              id="answer"
            />
            <Delete
              question={this.props.questionId}
              account={this.props.accId}
              id="remove"
              onClick={()=>this.props.onClick()}
            />
          </div>
          </ActionLabel>
      </ActionGroup>
    );
  }
}
