<template>
  <NavBar />
  <UserChat />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import UserChat from '@/components/UserChat.vue'

export default {
  name: 'App',
  components: { NavBar, UserChat }
}
</script>