import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Columns from 'react-bulma-components/lib/components/columns';
import Media from 'react-bulma-components/lib/components/media';
import { Label } from 'react-bulma-components/lib/components/form';
import FileInput from '../../common/inputs/FileInput';
import { loadProfileAvatar, updateProfileImage } from '../../store/profile/actions';

class AvatarFormContainer extends React.PureComponent {

    componentDidMount() {
        this.props.loadProfileAvatar();
    }

    handleImageChange = (e) => {
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('userName', this.props.userName);
        this.props.updateProfileImage(data);
    }

    render() {
        const { userName, imageUrl, isShowChange, } = this.props;
        return (
            <Columns>
                <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                    <Media>
                        <Media.Item position="right">
                            <figure className="image is-64x64">
                                <img className="is-rounded avatar" src={imageUrl} />
                            </figure>
                        </Media.Item>
                    </Media>
                </Columns.Column>
                <Columns.Column size={4}>
                    <Label>{userName}</Label>
                    {isShowChange && <FileInput label="Change Profile Photo" onChange={this.handleImageChange} />}
                </Columns.Column>
            </Columns>
        );
    }
}

AvatarFormContainer.propTypes = {
    userName: PropTypes.string,
    imageUrl: PropTypes.string,
    isShowChange: PropTypes.bool,

    updateProfileImage: PropTypes.func,
    loadProfileAvatar: PropTypes.func
};

const mapStateToProps = state => ({
    imageUrl: state.profile.avatar.imageUrl,
    userName: state.user.data.userName
});

const mapDispatchToProps = ({
    updateProfileImage,
    loadProfileAvatar
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarFormContainer);