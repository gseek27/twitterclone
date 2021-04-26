<template>
  <nav>
    <div class="nav-wrapper teal">
      <div class="container">
        <router-link to="/" class="brand-logo">It's Lit! 🔥</router-link>
        <div v-bind:value="username">
          <!--<h4>{{username}}</h4> //testing props in vue -->
        </div>
        <ul class="right">
          <li v-if="isLoggedIn">
            <span class="email black-text">
              {{currentEmail}} {{currentDisplay}}
              <!--{{currentHandle}}-->
            </span>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/employeelist">Profile</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="isLoggedIn">
            <button class="btn black" v-on:click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from "./Login";
import axios from "axios";
import firebase from "firebase/app";
import username from "./Login";
import "firebase/auth";
export default {
  name: "navbar",
  props: ["username"],
  components: {},

  data() {
    return {
      isLoggedIn: false,
      currentEmail: false,
      currentDisplay: false,
      currentHandle: ""
    };
  },
  created() {
    /*
    axios.get('https://api.twitter.com/1.1/users/show.json?user_id={dGcpjzT9XTZWdYw9EiciGwH0CiB3}')
        .then(res => this.currentId = res.data)
        .catch(err => console.log(err));
        console.log(this.currentHandle + 'YES'); */

    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentEmail = firebase.auth().currentUser.email;
      this.currentDisplay = firebase.auth().currentUser.displayName;
      //this.currentHandle = username;
      //console.log(username);}
    }
  },

  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 0px;
}
</style>