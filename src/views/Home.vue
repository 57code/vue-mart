<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){
    axios.get('/api/userinfo').then(res=>console.log(res.data))
  }
}
</script>
