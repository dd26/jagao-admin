<template>
  <div>
    <div
      class="q-ma-xl q-pa-xl"
      style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12); border-radius: 8px;"
    >
      <listable
        :apiroute="route"
        :columns="columns"
        :title="title"
        :btnNewObject="btnNewObject"
        @newRegister="newRegister"
        @openChangeDlg="openChangeDlg"
        @deleteRecord="deleteRecord"
        ref="listableRef"
      />
    </div>

    <q-dialog v-model="newDlg">
      <category
        :id="id"
        @recordSave="recordSave"
      />
    </q-dialog>
  </div>
</template>

<script>
import Category from '../../components/category/Category.vue'
import Listable from '../../components/Listable.vue'

export default {
  components: { Listable, Category },
  data () {
    return {
      route: 'categories',
      title: 'Categorias',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true, folder: 'categories' },
        { name: 'name', label: 'Nombre', sortable: true, field: 'name', align: 'left' },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      id: null
    }
  },
  watch: {
    newDlg (newValue) {
      if (!newValue) {
        this.$refs.listableRef.getRecord()
        this.id = null
      }
    }
  },
  methods: {
    updateData () {
      this.$refs.listableRef.getRecord()
    },
    deleteRecord () {
      this.$emit('deleteRecord')
    },
    newRegister () {
      this.newDlg = true
    },
    openChangeDlg (id) {
      this.id = id
      this.newDlg = true
    },
    recordSave () {
      this.newDlg = false
      this.id = null
      this.$refs.listableRef.getRecord()
    }
  }
}
</script>

<style>

</style>
