import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, styled } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const posts = [
    { src: 'path-to-image-2.jpg', text: 'Description for Image 2' },
    { src: '/img/Rigs_of_Vienna.jpg', text: 'This is the special meal in the popular Vienna resturant: Rigs of Vienna' },
    { src: '/img/swiss.jpg', text: 'This is the special meal in the popular Vienna resturant: Rigs of Vienna' },
    // ...more posts
];

const PostContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const PostImage = styled('img')({
    maxWidth: '80%',
    maxHeight: '60vh',
});

const NextButton = styled(Button)({
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
});

const Post = () => {
    let { id } = useParams();
    const [currentIndex, setCurrentIndex] = useState(parseInt(id));

    const nextPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    };

    const post = posts[currentIndex];

    return (
        <PostContainer>
            <PostImage src={post.src} alt={`Post ${currentIndex}`} />
            <Typography variant="body1">{post.text}</Typography>
            <NextButton onClick={nextPost}>
                <ArrowForwardIosIcon />
            </NextButton>
        </PostContainer>
    );
};

export default Post;
