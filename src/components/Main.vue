<template>
    <div>
      <div class="login">
        <div>
          Hello <b>{{ email }}</b>!
        </div>
        <div v-if="userTexts && userTexts.length > 0">
          Select an existing document:
          <div class="list-wrapper">
            <ol>
              <li v-for="text in userTexts" v-bind:key="text.id">
                {{ text.title }} <a @click="editText(text.id)">Edit</a>  <a @click="removeText(text.id)">Remove</a>
              </li>
            </ol>
          </div>
          Or create a new one:
          <input v-model="newTextTitle">
          <button @click="newDocument">Create</button>
        </div>
        <div v-else><br>Loading</div>
        <br>

        <button @click="logout">Log out</button>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  name: 'Main',
  data () {
    return {
      userTexts: null,
      email: firebase.auth().currentUser.email,
      newTextTitle: ''
    }
  },
  firestore () {
    return {
      userTexts: db.collection('texts').where('author', '==', firebase.auth().currentUser.uid)
    }
  },
  methods: {
    logout: function () {
      console.log(firebase.auth().currentUser.uid)
      // firebase.auth().signOut().then(() => {
      //   this.$router.replace('login')
      // })
    },
    newDocument: function () {
      db.collection('texts').add({
        title: this.newTextTitle,
        value: '',
        author: firebase.auth().currentUser.uid
      })
      this.newTextTitle = ''
    },
    removeText: function (id) {
      if (confirm('Are you sure?')) {
        db.collection('texts').doc(id).delete()
      }
    },
    editText: function (id) {
      console.log(id)
    }
  }
}
</script>
