<template>
  <div class="container" :key="componentKey">
    <h1>Latest Posts</h1>

    <form>
      <!--@submit="createPost"-->
      <div class="create-post">
        <label for="create-post">Wsup?</label>

        <input type="text" id="create-post" v-model="text" placeholder="Type your message here..." />
        <button v-on:click="createPost" @submit="forceRerender" type="submit">Send</button>
      </div>
    </form>

    <!--
     v-on:click="createPost"

     create post here
    v-on:click="deletePost(Post.id)" :key="componentKey"-->
    <hr />
    <div class="postlist" v-bind:key="componentKey">
      <div
        class="collection-item"
        v-for="Post in posts.slice().reverse()"
        v-bind:key="Post.id"
      >{{Post.text}} {{Post.time}}</div>
    </div>
    <!--


<div class="post"
  v-for="(post, index) in posts"
  v-bind:item="post"
  v-bind:key="post._id"
  >

   v-on:dblclick="deletePost(post._id)"
     v-bind:index="index"
    -->
  </div>
</template>

 

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
//Vue.use(require('vue-moment'));
//import moment from 'moment'
/*
import PostService from '../PostService';*/
export default {
  name: "dashboard",
  data() {
    return {
      text: null,
      id: null,
      posts: [],
      time: null,
      componentKey: 0,
      timestamp: null,
    };
  },
  computed: {
    //timestamp() {
   //   "1566716400";
   // }
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    createPost() {

      var currentDate = new Date();

            console.log(currentDate);



            
            var offset = new Date().getTimezoneOffset();
            console.log(offset);

            var newtime = currentDate - offset
            //var currentDateWithFormat = new Date()*1000

            var currentDateWithFormat = new Date().toJSON()
            //var currentDateWithFormat = currentDateWithFormat
            var currentDateWithFormat = currentDateWithFormat.toString()

           var date = new Date(currentDateWithFormat).toLocaleString()
           //var d = new Date("2019-03-15T22:32:04.9143842Z")
           //var newtime = date.toLocaleString()
           //var date = date.toJSON().slice(0,10).replace(/-/g,'/')

      db.collection("posts")
        .add({
          text: this.text,
          id: this.id,
          time: date, //currentDateWithFormat //Date.now() //moment(Date.now())... //Date.now()).toJSON().slice(0,10).replace(/-/g,'/');
          timestamp: Date.now()
        })
        .then(this.$router.push("")) //docRef => this.$router.push("/")  this.$router.go()
        .catch(error => console.log(error));
    }
  },
  created() {
    db.collection("posts")
      .orderBy("timestamp", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            text: doc.data().text,
            time: doc.data(Date.now()).time, //keep to show timestamp doc.data().time,
            timestamp: Date.now()
          };
          this.posts.push(data);
          console.log(doc.data());
          console.log(doc.data(Date.now()).time)
        });
      });
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>