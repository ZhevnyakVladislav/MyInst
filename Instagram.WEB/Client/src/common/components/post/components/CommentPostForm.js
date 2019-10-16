import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import TextInput from '../../inputs/TextInput';
import Button from 'react-bulma-components/lib/components/button';

const CommentPostForm = ({
    onPostComment
}) => {

    const [comment, onChange] = useState('');
    const handleChangeComment = useCallback(
        () => e => onChange(e.target.value),
        [onChange]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onPostComment(comment);

            onChange('');
        },
        [comment, onChange]
    );

    return (
        <form onSubmit={handleSubmit}>
            <Columns gapless>
                <Columns.Column size={8}>
                    <TextInput
                        isTextarea
                        name="comment"
                        placeholder="Add a comment..."
                        value={comment}
                        handleChange={handleChangeComment}
                        className="is-borderless"
                        styles={{
                            borderRadius: 0,
                            boxShadow: 'none',
                            resize: 'none',
                            height: '53px'
                        }}
                    />
                </Columns.Column>
                <Columns.Column size={4} className="align-self-center">
                    <Button
                        className="is-full-width"
                        color="white"
                        onClick={handleSubmit}
                    >
                        Post
                    </Button>
                </Columns.Column>
            </Columns>
        </form>
    );
};

CommentPostForm.propTypes = {
    onPostComment: PropTypes.func
};

export default CommentPostForm;