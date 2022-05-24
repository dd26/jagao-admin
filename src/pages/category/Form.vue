<template>
  <q-page>
    <categories
      ref="listableRefCat"
      @deleteRecord="deleteRecord"
    />
    <SubCategories
      ref="listableRefSubCat"
      @deleteRecord="deleteRecord"
    />
  </q-page>
</template>

<script>
import Categories from './Categories.vue'
import SubCategories from './SubCategories.vue'
export default {
  components: { Categories, SubCategories },
  methods: {
    deleteRecord () {
      this.$refs.listableRefCat.updateData()
      this.$refs.listableRefSubCat.updateData()
    }
  }
}
</script>

<style>

</style>
