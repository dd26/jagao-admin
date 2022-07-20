<template>
  <q-page>
    <div class="q-ma-xl q-pa-xl" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12); border-radius: 8px;">
      <Listable
        :columns="columns"
        :apiroute="route"
        :title="title"
        :btnNewObject="btnNewObject"
        @newRegister="newRegister"
        @see-detail="seeDetail"
        @openChangeDlg="openChangeDlg"
        ref="listableRef"
      />
    </div>

    <q-dialog v-model="newDlg">
      <NewSpecialist :id="id" @recordSave="recordSave" />
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
      title: 'Especialistas',
      route: 'specialists',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true, folder: 'specialists' },
        { name: 'userName', label: 'Nombre', field: 'userName', align: 'left' },
        { name: 'city_id', label: 'Ciudad', field: 'city_id', align: 'left' },
        { name: 'services', label: 'Servicios', field: 'services', align: 'left' },
        { name: 'scheduled', label: 'Tareas', field: 'scheduled', align: 'center', chip: true },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      seeDetailDlg: false,
      id: null
    }
  },
  watch: {
    newDlg (newValue) {
      if (!newValue) {
        this.$refs.listableRef.getRecord()
        this.id = null
      }
    },
    seeDetailDlg (newValue) {
      if (!newValue) {
        this.$refs.listableRef.getRecord()
        this.id = null
      }
    }
  },
  methods: {
    seeDetail (row) {
      console.log('see details general', row)
      this.seeDetailDlg = true
      this.id = row.id
    },
    openChangeDlg (id) {
      console.log('openChangeDlg')
      this.id = id
      this.newDlg = true
    },
    recordSave () {
      console.log('recordSave')
      this.newDlg = false
      this.id = null
      this.$refs.listableRef.getRecord()
    },
    newRegister () {
      console.log('newnewRegister')
      this.newDlg = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
