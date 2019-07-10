import React from 'react';
import ReactNotifications from 'react-browser-notifications';

class Notifications extends React.Component {
    constructor() {
        super();
        this.showNotifications = this.showNotifications.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    showNotifications() {
        if(this.n.supported()) this.n.show();
    }

    handleClick(event) {
        this.n.close(event.target.tag);
    }

    render() {
        return (
            <div>

                <ReactNotifications
                    onRef={ref => (this.n = ref)}
                    title="Hey There!"
                    body="This is the body"
                    icon="icon.png"
                    tag="abcdef"
                    timeout="2000"
                    onClick={event => this.handleClick(event)}
                />

                <button onClick={this.showNotifications}>
                    Notify Me!
                </button>
            </div>
        )
    }
}

export default Notifications;