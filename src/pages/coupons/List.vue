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
        @changeStatusCoupon="changeStatusCoupon"
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
import New from 'src/components/coupons/Form.vue'
export default {
  components: { Listable, New },
  data () {
    return {
      title: 'Cupones',
      route: 'coupons',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'code', label: 'Código', align: 'left', field: 'code', sortable: true },
        { name: 'discount', label: 'Descuento', align: 'left', field: 'discount', sortable: true },
        { name: 'limit', label: 'Límite', align: 'left', field: 'limit', sortable: true },
        { name: 'status', label: 'Estatus', align: 'left', field: row => row.status === 1 ? 'Activo' : 'Inactivo', sortable: true },
        { name: 'actionsNew', label: '', field: 'actionsNew' }
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
    changeStatusCoupon (id, statusOld) {
      const status = statusOld === 1 ? 0 : 1
      this.$q.loading.show()
      this.$api.put(`${this.route}/${id}/status/${status}`).then(res => {
        this.$q.loading.hide()
        this.$q.notify({
          color: 'positive',
          message: 'Se ha actualizado el estatus correctamente'
        })
        this.$refs.listableRef.getRecord()
      })
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
