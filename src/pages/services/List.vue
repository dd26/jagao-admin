<template>
  <q-page>
    <div class="q-ma-xl q-pa-xl" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12); border-radius: 8px;">
      <Listable
        :columns="columns"
        :apiroute="route"
        :title="title"
        :btnNewObject="btnNewObject"
        @newRegister="newRegister"
      />
    </div>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
export default {
  components: { Listable },
  data () {
    return {
      title: 'Services',
      route: 'services',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true },
        { name: 'service', label: 'Service', field: 'service', align: 'left' },
        { name: 'price', label: 'Price', field: 'price', align: 'left' },
        { name: 'category', label: 'Category', field: 'category', align: 'center', category: true },
        { name: 'actions', label: '', field: 'actions' }
      ]
    }
  },
  methods: {
    newRegister () {
      console.log('newnewRegister')
    }
  }
}
</script>

<style>

</style>
