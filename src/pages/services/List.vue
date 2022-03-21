<template>
  <q-page>
    <div class="q-ma-xl q-pa-xl" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12); border-radius: 8px;">
      <Listable
        :columns="columns"
        :apiroute="route"
        :title="title"
        :btnNewObject="btnNewObject"
        @newRegister="newRegister"
        @openChangeDlg="openChangeDlg"
        ref="listableRef"
      />
    </div>

    <q-dialog v-model="newDlg">
      <NewService @recordSave="recordSave" :id="id" />
    </q-dialog>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
import NewService from 'src/components/services/Form.vue'
export default {
  components: { Listable, NewService },
  data () {
    return {
      title: 'Services',
      route: 'services',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true, folder: 'services' },
        { name: 'name', label: 'Service', field: 'name', align: 'left' },
        { name: 'price', label: 'Price', field: 'price', align: 'left' },
        { name: 'category_id', label: 'Category', field: 'category_id', align: 'center', chip: true },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      id: null
    }
  },
  methods: {
    newRegister () {
      console.log('newnewRegister')
      this.id = null
      this.newDlg = true
    },
    recordSave () {
      console.log('recordSave')
      this.newDlg = false
      this.id = null
      this.$refs.listableRef.getRecord()
    },
    openChangeDlg (id) {
      console.log('openChangeDlg', id)
      this.id = id
      this.newDlg = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
