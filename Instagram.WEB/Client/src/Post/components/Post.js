import React from 'react';
import DetailPostContainer from '../../common/post/containers/DetailPostContainer';
import Columns from 'react-bulma-components/lib/components/columns';
import { useParams } from 'react-router-dom';
import withDynamicStore from '../../common/dynamicStore/withDynamicStore';
import reducer from '../../store/detailPost/reducer';
import saga from '../../store/detailPost/saga';

const Post = () => {
    const { id } = useParams();

    return (
        <Columns centered>
            <Columns.Column size={10}>
                <DetailPostContainer postId={id} />
            </Columns.Column>
        </Columns>
    );
};

export default withDynamicStore(Post, {
    storeName: 'detailPost',
    reducer,
    saga,
});