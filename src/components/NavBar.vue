<template>
  <nav>
    <div>
      <h1><strong>Vue</strong> Chat App</h1>
      <div v-if="isLogin" class="login">
        <ProfileAvatar :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOutUser">
          Sign Out
        </button>
      </div>
      <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn" >
        Sign in
      </button>
    </div>
  </nav>

</template>

<script>
import ProfileAvatar from './ProfileAvatar.vue'
import { useAuth } from '@/firebase'
export default {
  components: { ProfileAvatar },
  setup() {
    const { user, isLogin, signOutUser, signIn} = useAuth()
    return { user, isLogin, signOutUser, signIn}
  }
}

</script>