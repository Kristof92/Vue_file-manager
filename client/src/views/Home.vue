<template>
    <div class="home">
        <h2 style="text-align: center; margin: 4rem">Welcome to File Manager</h2>
        <Login/>
    </div>
</template>

<script>
import Login from '@/components/LoginOrSignup.vue'

export default {
    name: 'Home',
    components: {
        Login
    }
}
</script>
