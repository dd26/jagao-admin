<template>
  <q-page class="q-pa-xl">
    <Listable
      :columns="columns"
      :apiroute="route"
      :title="title"
      :btnNewObject="btnNewObject"
      @newRegister="newRegister"
      @see-detail="seeDetail"
      @openChangeDlg="openChangeDlg"
      @changeStatusDynamic="changeStatusDynamic"
      :columnsFilter="columnsFilter"
      unique-column-filter
      @filterColumnFn="filterColumnFn"
      ref="listableRef"
    />

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
        { name: 'cityName', label: 'Ciudad', field: 'cityName', align: 'left' },
        { name: 'actions', label: '', field: 'actions' }
      ],
      newDlg: false,
      seeDetailDlg: false,
      id: null,
      columnsFilter: [
        { title: 'Verificados', field: 'verified', defaultValue: 1, id: 1 },
        { title: 'No verificados', field: 'verified', defaultValue: 0, id: 2 }
      ]
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
    filterColumnFn (columnsFilterSelect, dataListable) {
      console.log(columnsFilterSelect, 'columnsFilterSelect')
      // voy a recorrer el array de columnas seleccionadas y filtrar el array de datos dataListable
      // por cada columna seleccionada
      // si no hay columnas seleccionadas, entonces regreso el array de datos dataListable
      let dataFiltered = []
      if (columnsFilterSelect.length === 0) {
        dataFiltered = dataListable
      }

      columnsFilterSelect.forEach((column) => {
        if (column.field === 'verified') {
          if (column.defaultValue === 1) {
            dataFiltered = dataListable.filter((item) => {
              return item.verified === 1
            })
          } else {
            dataFiltered = dataListable.filter((item) => {
              return item.verified === 0
            })
          }
        }
      })

      this.$refs.listableRef.filterColumnFn(dataFiltered)
    },
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
    },
    changeStatusDynamic (id, row, action) {
      console.log(action.field, 'changeStatusDynamic')
      this.$q.dialog({
        title: 'Confirmación',
        message: '¿Está seguro de cambiar el estado?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put(`/specialists/status/blocked/${row.user.id}`, {
          isBlocked: row.user.isBlocked === 1 ? 0 : 1
        }).then((response) => {
          console.log(response, 'response.data')
          this.$refs.listableRef.getRecord()
        })
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
  }
}
</script>

<style scoped lang="scss">
</style>
