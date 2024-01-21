import React from 'react';

const Comments = ({ comments }) => (
  <div>
    {comments.map((comment) => (
      <p key={comment._id}>{comment.text}</p>
    ))}
  </div>
);

export default Comments;
