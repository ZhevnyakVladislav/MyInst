import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Columns from 'react-bulma-components/lib/components/columns';
import { faUserAlt, faHeart, faCompass, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bulma-components/lib/components/button';
import { Link } from 'react-router-dom';

class Header extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { userName } = this.props;
        return (
            <Navbar active={true} fixed="top" transparent={false}>
                <Columns.Column offset={3} size={6}>
                    <Navbar.Menu >
                        <Navbar.Container position="start">
                            <Link to="/">
                                <FontAwesomeIcon icon={faCameraRetro} size="2x" />
                                <h1 className="has-margin-left-20">Instagram</h1>
                            </Link>
                        </Navbar.Container>
                        <Navbar.Container position="end">
                            {this.props.isUserAuth ?
                                <>
                                    <Navbar.Item href="/explore">
                                        <FontAwesomeIcon icon={faCompass} size="2x" />
                                    </Navbar.Item>
                                    <Navbar.Item href="">
                                        <FontAwesomeIcon icon={faHeart} size="2x" />
                                    </Navbar.Item>
                                    <Navbar.Item href={`/${userName}`}>
                                        <FontAwesomeIcon icon={faUserAlt} size="2x" />
                                    </Navbar.Item>
                                </>
                                :
                                <>
                                    <Link to="/account/login"><Button>Log in</Button></Link>
                                    <Link to="/account/register"><Button>Sign up</Button></Link>
                                </>
                            }
                        </Navbar.Container>
                    </Navbar.Menu>
                </Columns.Column>
            </Navbar>
        );
    }
}

Header.propTypes = {
    userName: PropTypes.string,
    isUserAuth: PropTypes.bool
};

export default Header;