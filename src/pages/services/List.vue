<template>
  <q-page class="q-pa-xl">
    <Listable
      v-model="data"
      :columns="columns"
      :apiroute="route"
      :title="title"
      @see-detail="seeDetail"
      @onClickFilter="onClickFilter"
      ref="listableRef"
    />

    <q-dialog v-model="seeDetailDlg">
      <SeeDetail
        :id="id"
      />
    </q-dialog>

    <q-dialog
      v-model="filterDlg"
    >
      <FiltersService
        @filter="filter"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
import FiltersService from 'src/components/services/FiltersService.vue'
import SeeDetail from 'src/components/services/Info.vue'
export default {
  components: { Listable, SeeDetail, FiltersService },
  data () {
    return {
      title: 'Servicios contratados',
      route: 'services',
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatarTwo: true, folder: 'categories' },
        { name: 'category_name', label: 'Servicio', field: 'category_name', align: 'left' },
        { name: 'total', label: 'Precio', field: 'total', align: 'left' },
        { name: 'addressName', label: 'Direccion', field: 'addressName', align: 'center' },
        { name: 'stateName', label: 'Estatus', field: 'stateName', align: 'center', chip: true },
        { name: 'rating', label: 'Calificacion', field: 'rating', align: 'center', rating: true },
        { name: 'actions', label: '', field: 'actions' }
      ],
      id: null,
      seeDetailDlg: false,
      filterDlg: false,
      data: []
    }
  },
  methods: {
    onClickFilter () {
      this.filterDlg = true
      console.log('click filter')
    },
    seeDetail (row) {
      this.id = row.id
      this.seeDetailDlg = true
    },
    filter (form) {
      console.log('filter', form)
      const columnFilter = []
      if (form.status >= 0 && form.status !== 'all') {
        console.log('status', form.status)
        columnFilter.push({ column: 'state', value: form.status })
      }

      if (form.category && form.category !== 'all') {
        columnFilter.push({ column: 'category_id', value: form.category })
      }

      if (form.date) {
        columnFilter.push({ column: 'created_at', value: form.date, type: 'date' })
      }

      this.$refs.listableRef.avanzedFilter(columnFilter)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
