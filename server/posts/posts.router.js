const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios')

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const fetchImagesForPosts = async (posts) => {
    return await Promise.all(
      posts.map(async (post) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`)
        const images = response.data.map(photo => ({ url: photo.url }))
        return {
          ...post,
          images,
        }
      })
    )
  }
  
  const postsWithImages = await fetchImagesForPosts(posts)

  res.json(postsWithImages);
});

module.exports = router;
