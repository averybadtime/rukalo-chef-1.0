<template>
  <input type="file" class="upload" accept="image/*" @change="detectFiles($event.target.files)" multiple="multiple">
</template>
<script>
  import { DB, STORAGE } from "@/firebase"
  export default {
    props: {
      multiple: {
        type: Boolean,
        required: true
      },
      reference: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        file: File
      }
    },
    methods: {
      detectFiles(fileList) {
        Array.from(Array(fileList.length).keys()).map(x => {
          this.upload(fileList[x])
        })
      },
      upload(file) {
        const uploadTask = STORAGE.ref(this.reference).put(file)
        uploadTask.then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            DB.ref(this.reference)
            .set(downloadURL)
            .then(() => console.log("uploaded!"))
          })
        })
      }
    }
  }
</script>