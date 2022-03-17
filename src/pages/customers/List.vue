<template>
  <q-page>
    <div class="q-ma-xl q-pa-xl" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12); border-radius: 8px;">
      <Listable
        :columns="columns"
        :apiroute="route"
        :title="title"
        :btnNewObject="btnNewObject"
        :dataList="dataPrueba"
        @newRegister="newRegister"
        @openChangeDlg="openChangeDlg"
      />
    </div>

    <q-dialog v-model="newDlg">
      <New :id="id" />
    </q-dialog>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
import New from 'src/components/customers/Form.vue'
export default {
  components: { Listable, New },
  data () {
    return {
      title: 'Customers',
      route: 'customers',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'email', label: 'Mail', field: 'email', align: 'left' },
        { name: 'identification', label: 'DNI', field: 'identification', align: 'left' },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      dataPrueba: [
        { _id: '2', name: 'Juan', email: 'example123@gmail.com', avatar: 'avatar', identification: '123456789', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }] },
        { _id: '3', name: 'Juan', email: 'example123@gmail.com', avatar: 'avatar', identification: '123456789', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }] },
        { _id: '1', name: 'Juan', email: 'example123@gmail.com', avatar: 'avatar', identification: '123456789', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }] }
      ],
      id: null
    }
  },
  methods: {
    newRegister () {
      console.log('newnewRegister')
      this.newDlg = true
    },
    openChangeDlg (id) {
      console.log('openChangeDlg')
      this.changeDlg = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
