import React from 'react';
import DetailPostContainer from '../../common/post/containers/DetailPostContainer';
import Columns from 'react-bulma-components/lib/components/columns';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();

    return (
        <Columns centered>
            <Columns.Column size={10}>
                <DetailPostContainer id={id} />
            </Columns.Column>
        </Columns>
    );
};

export default Post;