<template>
    <div class="editor">
        <input hidden @keyup.19="syncText">
        <input hidden @keyup.enter="syncText">
        <div class="wrapper">
          <div>
            <textarea id="header" class="header" rows="1" v-model="text.title" v-on:input="preSyncText" @change="syncText">
            </textarea>
            <div class="save-info">
              <button @click="text.fontSize+=5">
                +
              </button>
              {{ text.fontSize }}
              <button @click="text.fontSize >= 10 ? text.fontSize-=5 : ''">
                -
              </button>
              {{ status === "saved" ? "Saved." : status === "saving" ? "Saving.." : "Not saved." }}
            </div>
          </div>
          <textarea v-model="text.value" v-bind:style="{ fontSize: text.fontSize + 'px' }" class="value-text" v-on:input="preSyncText"  @change="syncText">
          </textarea>
        </div>
    </div>
</template>

<script>
import { db } from '../main'
export default {
  name: 'Editor',
  props: ['id'],
  data () {
    return {
      text: {
        title: '',
        value: '',
        fontSize: 20
      },
      lastTextChange: new Date(),
      status: 'saved'
    }
  },
  mounted () {
    setInterval(() => {
      if (this.status === 'not-saved') {
        this.syncText()
      }
    }, 10000)
    setInterval(() => {
      if (this.status === 'not-saved') {
        if ((new Date()) - this.lastTextChange > 500) {
          this.syncText()
        }
      }
    }, 500)
  },
  firestore () {
    return {
      text: db.collection('texts').doc(this.id)
    }
  },
  methods: {
    preSyncText () {
      this.lastTextChange = new Date()
      this.status = 'not-saved'
    },
    syncText () {
      this.status = 'saving'
      db.collection('texts').doc(this.id).set(this.text).then(() => {
        this.status = 'saved'
      }).catch(() => {
        this.status = 'not-saved'
      })
    }
  }
}
</script>
