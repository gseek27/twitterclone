<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel teal white-text center">
            <h3>Login</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="text" id="email" v-model="email" />
                <label class="white-text" for="email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" id="password" v-model="password" />
                <label class="white-text" for="password">Password</label>
              </div>
              <button v-on:click="login" class="btn btn-large grey lighten-4 black-text">Login</button>
              <!--<div id="my-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>-->
            </form>
          </div>
          <div id="my-signin2" @click="googleLogin">
            <img class="googlelogo" alt="google logo" />
          </div>
          <!--< <div id="my-signin2" @click="phoneLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>
                    <div id="my-signin2" @click="facebookLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>  
          //src="../assets/googlebtn4.png-->
          <br />
          <div v-on:click="twitterLogin" @click="$emit('send-screenname', username)">
            <img class="twitterlogo" alt="google logo" src="../assets/twitterbtn.png" />
          </div>
          <!--<div id="my-signin2" @click="githubLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>
                    <div id="my-signin2" @click="yahooLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>
          <div id="my-signin2" @click="msoftLogin"><img class="logo" alt="google logo" src="../assets/googlebtn4.png"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase/app";
import axios from "axios";
export default {
  name: "login",
  components: {},
  data() {
    return {
      username: [
        {
          displayname: "",
          username: "moretesting",
          name: "",
          email: "",
          password: "",
          profile: ""
        }
      ]
    };
  },
  created() {
    /*axios.get('https://api.twitter.com/1.1/users/show.json?user_id={dGcpjzT9XTZWdYw9EiciGwH0CiB3}')
        .then(res => this.username = res.data)
        .catch(err => console.log(err));*/
    console.log(username + "YES");
  },

  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {
          this.$router.go({ path: this.$router.path });
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    twitterLogin() {
      firebase
        .auth()
        .signInWithRedirect(new firebase.auth.TwitterAuthProvider())
        .then(function(userCredential) {
          // All additional user info is available here.

          //console.log(username);

          console.log(userCredential.additionalUserInfo.profile.screen_name);
          console.log(userCredential.additionalUserInfo.profile.screen_name);
          const test = userCredential.additionalUserInfo.profile.screen_name;
          console.log(username);
          //console.log(this.username);
          this.$router.go({ path: this.$router.path });
        })
        .catch(function(error) {
          // Error occurred.
        });

      /*
            var provider = new firebase.auth.TwitterAuthProvider();

            firebase.auth().signInWithRedirect(provider).then((result) => {
                this.$router.go({path: this.$router.path});
            }).catch((err) => {
                alert('Oops. ' + err.message)
            });
            */

      /*
            firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
  .then(function(userCredential) {
    // All additional user info is available here.
    console.log(userCredential.additionalUserInfo.profile);
  })
  .catch(function(error) {
    // Error occurred.
  });
  */
    }
  },

  mounted() {
    gapi.signin2.render("my-signin2", {
      // this is the button "id"
      onsuccess: this.onSignIn, // note, no "()" here
      scope: "email",
      width: 365,
      height: 50,
      longtitle: true,
      theme: "light"
    });
  }
};
</script>

<style scoped>
.googlelogo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.twitterlogo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 54%;
}
</style>