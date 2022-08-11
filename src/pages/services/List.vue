<template>
  <q-page class="q-pa-xl">
    <Listable
      :columns="columns"
      :apiroute="route"
      :title="title"
      @see-detail="seeDetail"
      ref="listableRef"
    />

    <q-dialog v-model="seeDetailDlg">
      <SeeDetail
        :id="id"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
import SeeDetail from 'src/components/services/Info.vue'
export default {
  components: { Listable, SeeDetail },
  data () {
    return {
      title: 'Servicios',
      route: 'services',
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatarTwo: true, folder: 'categories' },
        { name: 'category_name', label: 'Servicio', field: 'category_name', align: 'left' },
        { name: 'total', label: 'Precio', field: 'total', align: 'left' },
        { name: 'addressName', label: 'Direccion', field: 'addressName', align: 'center' },
        { name: 'stateName', label: 'Estatus', field: 'stateName', align: 'center', chip: true },
        { name: 'actions', label: '', field: 'actions' }
      ],
      id: null,
      seeDetailDlg: false
    }
  },
  methods: {
    seeDetail (row) {
      this.id = row.id
      this.seeDetailDlg = true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
