<template>
 <div class="container"> 
  <h1>Latest Posts</h1>
    <div class="create-post">
    <label for="create-post">Say Something...</label>

    <input type="text" id="create-post" v-model="text" placeholder="Create a post">
    <button v-on:click="createPost">Post</button>
    </div>

 <!--create post here -->
<hr>
<p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
  <!--
<div class="post"
  v-for="(post, index) in posts"
  v-bind:item="post"
  v-bind:index="index"
  v-bind:key="post._id"
  v-on:dblclick-bind:key="employee.id"ck="deletePost(post._id)"
  >
   -->
  {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
  <p class="text">{{ post.text }}</p>
    </div>
</div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
        createPost () {
            db.collection('PostComponent').add({
                PostComponent_id: this.PostComponent_id,
                text: this.text
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
    
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
