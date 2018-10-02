<template>
    <div class="login">
        <h3>Sign In</h3>
        <input v-model="email" type="text" placeholder="email"><br>
        <input v-model="password" type="password" placeholder="password"><br>
        <button @click="signIn">Log in</button>
        <p class="error">{{ error }}</p>
        <p class="success">{{ success }}</p>
        <p>No account? Create it <router-link to="/sign-up">here</router-link>!</p>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: '',
      success: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.error = ''
          this.success = 'Successfully logged in'
          this.$router.replace('writer')
        },
        (err) => {
          this.success = ''
          this.error = err.message
        }
      )
    }
  }
}
</script>
