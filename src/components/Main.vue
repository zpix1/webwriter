<template>
    <div class="login-wrapper">
      <div class="login">
        <div>
          Hello <b>{{ email }}</b>!
        </div>
        <div v-if="userTexts">
          Select an existing document:
          <div class="list-wrapper">
            <ol>
              <li v-for="text in userTexts" v-bind:key="text.id">
                {{ crop(text.title) }} <router-link :to="'/editor/'+text.id">Edit</router-link>  <a @click="removeText(text.id)">Remove</a> <a @click="downloadFile(text.title, text.value)">Download</a>
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
    crop: function (str) {
      if (str.length > 15) {
        return str.slice(0, 15) + '...'
      }
      return str
    },
    logout: function () {
      // console.log(firebase.auth().currentUser.uid)
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    newDocument: function () {
      db.collection('texts').add({
        title: this.newTextTitle,
        value: '',
        author: firebase.auth().currentUser.uid,
        fontSize: 20
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
    },
    downloadFile (filename, text) {
      filename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()

      var element = document.createElement('a')
      element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    }
  }
}
</script>
