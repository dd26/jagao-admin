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
        @see-detail="seeDetail"
        @openChangeDlg="openChangeDlg"
      />
    </div>

    <q-dialog v-model="newDlg">
      <NewSpecialist :id="id" />
    </q-dialog>

    <q-dialog v-model="seeDetailDlg">
      <SeeDetail
        :id="id"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
import NewSpecialist from 'src/components/specialist/Form.vue'
import SeeDetail from 'src/components/specialist/Info.vue'
export default {
  components: { Listable, NewSpecialist, SeeDetail },
  data () {
    return {
      title: 'Specialist',
      route: 'specialist',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'city', label: 'City', field: 'city', align: 'left' },
        { name: 'services', label: 'Services', field: 'services', align: 'left' },
        { name: 'scheduled', label: 'Scheduled', field: 'scheduled', align: 'center', chip: true },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      dataPrueba: [
        { _id: '2', name: 'Jhon doe', city: 'Los angeles', services: '0', scheduled: 'services', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary', action: 'edit' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }, { title: 'see details', seeDetails: true, color: 'primary', action: 'seeDetail' }] },
        { _id: '3', name: 'Jhon doe', city: 'Los angeles', services: '0', scheduled: 'services', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary', action: 'edit' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }, { title: 'see details', seeDetails: true, color: 'primary', action: 'seeDetail' }] },
        { _id: '1', name: 'Jhon doe', city: 'Los angeles', services: '0', scheduled: 'services', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary', action: 'edit' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative', action: 'delete' }, { title: 'see details', seeDetails: true, color: 'primary', action: 'seeDetail' }] }
      ],
      seeDetailDlg: false,
      id: null
    }
  },
  methods: {
    seeDetail (row) {
      console.log('see details general', row)
      this.seeDetailDlg = true
      this.id = row._id
    },
    newRegister () {
      this.newDlg = true
    },
    openChangeDlg (id) {
      console.log('open change dlg', id)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
