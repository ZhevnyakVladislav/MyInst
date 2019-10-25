import React from 'react';
import { connect } from 'react-redux';
import PrivacyAndSecurityTab from '../components/PrivacyAndSecurityTab';

class PrivacyAndSecurityTabContainer extends React.PureComponent {

    state = {
        isPrivateEnabled: false
    }

    handleIsPrivateChange = e => {
        this.setState({
            isPrivateEnabled: e.target.checked
            // }, () => this.props.setPrivate());
        }, console.log('set private'));

    }

    render() {
        const props = {
            onChangeIsPrivate: this.handleIsPrivateChange
        };
        return (
            <PrivacyAndSecurityTab {...props} {...this.state} />
        );
    }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyAndSecurityTabContainer);
