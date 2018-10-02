<template>
    <div class="login">
      <p>Hey!</p>
      <button @click="logout">Log out</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
