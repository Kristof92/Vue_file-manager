<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    methods: {
        ...mapActions('User', ['refreshProfile']),
    },
    created() {
        if (sessionStorage.getItem('_id') !== null) {
            this.refreshProfile()
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 4rem 8rem 2rem 8rem;
}
</style>
