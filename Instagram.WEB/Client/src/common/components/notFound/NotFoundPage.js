import React from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Section className="has--top-150">
            <Container>
                <Columns>
                    <Columns.Column className="has-text-centered" size={10} offset={1}>
                        <h1>Sorry, this page isn't available.</h1>
                        <p>The link you followe may be broken, or the page may have been removed. <Link to="/">Go back to Instagram.</Link></p>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
    );
};

export default NotFoundPage;