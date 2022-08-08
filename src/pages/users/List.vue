<template>
  <q-page>
    <div class="q-pa-xl">
      <Listable
        :columns="columns"
        :apiroute="route"
        :title="title"
        :btnNewObject="btnNewObject"
        @newRegister="newRegister"
        @openChangeDlg="openChangeDlg"
        @changeStatusUserAdm="changeStatusUserAdm"
        ref="listableRef"
      />
    </div>

    <q-dialog v-model="newDlg">
      <New :id="id" @recordSave="recordSave" />
    </q-dialog>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
import New from 'src/components/users/Form.vue'
export default {
  components: { Listable, New },
  data () {
    return {
      title: 'Usuarios de soporte',
      route: 'users_admin',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true, folder: 'users_admin' },
        { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
        { name: 'email', label: 'Email', field: 'email', align: 'left' },
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
    },
    changeStatusUserAdm (id, row) {
      console.log('changeStatusUserAdm', id, row)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
