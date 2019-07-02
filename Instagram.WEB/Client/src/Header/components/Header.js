import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bulma-components/lib/components/navbar';
import Columns from 'react-bulma-components/lib/components/columns';
import { faUserAlt, faHeart, faCompass, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bulma-components/lib/components/button';
import { Link } from 'react-router-dom';

const Header = ({ isUserAuth, userName }) => {
    return (
        <Navbar fixed="top" className="is-flex" style={{ height: '77px' }}>
            <Columns multiline={false} breakpoint="mobile" className="is-full-width is-vcentered is-marginless">
                <Columns.Column
                    className="has-padding-top-5"
                    mobile={{
                        size: 6,
                    }}
                    tablet={{
                        sile: 4,
                        offset: 1
                    }}
                    fullhd={{
                        size: 2,
                        offset: 3
                    }}>
                    <Link className="is-flex" to="/">
                        <div className="is-flex align-items-center">
                            <FontAwesomeIcon icon={faCameraRetro} size="2x" />
                        </div>
                        <h1 className="has-margin-left-20 has-padding-left-10" style={{
                            borderLeft: 'solid 1px'
                        }}>Instagram</h1>
                    </Link>
                </Columns.Column>
                <Columns.Column
                    className="has-text-centered"
                    mobile={{
                        size: 5,
                        offset: 1
                    }}
                    tablet={{
                        sile: 2,
                        offset: 5
                    }}
                    fullhd={{
                        size: 2,
                        offset: 3
                    }}>
                    {isUserAuth
                        ? <>

                            <Link to="/"><FontAwesomeIcon icon={faCompass} size="2x" /></Link>
                            <Link className="has-margin-left-20" to="/"><FontAwesomeIcon icon={faHeart} size="2x" /></Link>
                            <Link className="has-margin-left-20" to={`/users/${userName}`}><FontAwesomeIcon icon={faUserAlt} size="2x" /></Link>
                        </>
                        : <>
                            <Link to="/account/login" className="has-margin-right-5"><Button color="primary">Log in</Button></Link>
                            <Link to="/account/register"><Button>Sign up</Button></Link>

                        </>}
                </Columns.Column>
            </Columns>
        </Navbar >
    );
};

Header.propTypes = {
    userName: PropTypes.string,
    isUserAuth: PropTypes.bool
};

export default Header;