<template>
  <div class="message">
    <span v-if="!sender">{{ name }}</span>
    <div class="flex" :class="sender ? 'flex-row=reverse': ''">
      <ProfileAvatar class="mt-1" :src="photoUrl" />
      <div class="text w-3/4" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileAvatar from './ProfileAvatar.vue'
export default {
  components: { ProfileAvatar },
  props: {
    name: { type: String, default:''},
    photoUrl: { type: String, default: ''},
    sender: { type: Boolean, default: false},
  }
}
</script>