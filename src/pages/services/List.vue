<template>
  <q-page>
    <div class="q-ma-xl q-pa-xl" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12); border-radius: 8px;">
      <Listable
        :columns="columns"
        :apiroute="route"
        :title="title"
        :btnNewObject="btnNewObject"
        @newRegister="newRegister"
        ref="listableRef"
      />
    </div>

    <q-dialog v-model="newDlg">
      <NewService @recordSave="recordSave" />
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
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true },
        { name: 'name', label: 'Service', field: 'name', align: 'left' },
        { name: 'price', label: 'Price', field: 'price', align: 'left' },
        { name: 'category_id', label: 'Category', field: 'category_id', align: 'center', chip: true },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      dataPrueba: [
        { _id: '2', service: 'Juan', price: 'Perez', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }] },
        { _id: '3', service: 'Juan', price: 'Perez', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }] },
        { _id: '1', service: 'Juan', price: 'Perez', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }] }
      ]
    }
  },
  methods: {
    newRegister () {
      console.log('newnewRegister')
      this.newDlg = true
    },
    recordSave () {
      console.log('recordSave')
      this.newDlg = false
      this.$refs.listableRef.getRecord()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
