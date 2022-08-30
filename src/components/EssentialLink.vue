<template>
  <q-item
    clickable
    :to="link"
    v-ripple
    class="text-primary"

  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" :color="!hasVector ? 'white' : ''" class="q-pa-sm bg-primary" style="border-radius: 50%" />
    </q-item-section>

    <q-item-section>
      <q-item-label style="font-size: 20px; font-weight: 600;">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },
    hasVector: {
      type: Boolean,
      default: true
    },
    permission: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('generals', ['can'])
  }
}
</script>
