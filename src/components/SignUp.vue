<template>
  <div class="login-wrapper">
    <div class="login">
      <h3>Sign Up</h3>
      <input v-model="email" type="text" placeholder="email"><br>
      <input v-model="password" type="password" placeholder="password"><br>
      <button @click="signUp">Sign Up</button>
      <p class="error">{{ error }}</p>
      <p class="success">{{ success }}</p>
      <p>Already have an account? Log in <router-link to="/login">here</router-link>!</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      error: '',
      success: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.error = ''
          this.success = 'Successfully registered. Log in now'
          this.$router.replace('menu')
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
