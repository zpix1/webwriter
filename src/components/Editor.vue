<template>
    <div>
        <h1 contenteditable="true" @input="syncText">{{ text.title }}</h1>
        <textarea v-model="text.value" @change="syncText">
        </textarea>
        <p>
            {{ new Date() }}
        </p>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'Editor',
  props: ['id'],
  data () {
    return {
        text: null,
        lastSave: new Date()
    }
  },
  firestore () {
    return {
      text: db.collection('texts').doc(this.id)
    }
  },
  methods: {
    syncText () {
        db.collection('texts').doc(this.id).set(this.text).then(() => {
            this.lastSave = new Date()
        })
    }
  }
}
</script>
