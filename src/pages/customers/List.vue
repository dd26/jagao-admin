<template>
  <q-page class="q-pa-xl">
    <Listable
      :columns="columns"
      :apiroute="route"
      :title="title"
      :btnNewObject="btnNewObject"
      @newRegister="newRegister"
      @openChangeDlg="openChangeDlg"
      @see-detail="seeDetail"
      ref="listableRef"
    />

    <q-dialog v-model="newDlg">
      <New :id="id" @recordSave="recordSave" />
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
import New from 'src/components/customers/Form.vue'
import SeeDetail from 'src/components/customers/Info.vue'
export default {
  components: { Listable, New, SeeDetail },
  data () {
    return {
      title: 'Clientes',
      route: 'customers',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true, folder: 'customers' },
        { name: 'userName', label: 'Nombre de Usuario', field: 'userName', align: 'left' },
        { name: 'email', label: 'Correo', field: 'email', align: 'left' },
        { name: 'identification', label: 'Identificacion', field: 'identification', align: 'left' },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      id: null,
      seeDetailDlg: false
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
    seeDetail (row) {
      console.log(row, 'rowww')
      this.id = row.id
      this.seeDetailDlg = true
    },
    newRegister () {
      console.log('newnewRegister')
      this.newDlg = true
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>
