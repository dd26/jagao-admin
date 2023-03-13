<template>
  <div class="q-px-xl q-pb-xl">
    <listable
      :apiroute="route"
      :columns="columns"
      :title="title"
      :btnNewObject="btnNewObject"
      @newRegister="newRegister"
      @openChangeDlg="openChangeDlg"
      ref="listableRefSubCategories"
      @deleteRecord="deleteRecord"
      @filterColumnFn="filterColumnFn"
      :columnsFilter="columnsFilter"
      unique-column-filter
    />

    <q-dialog v-model="newDlg">
      <sub-category
        :id="id"
        @recordSave="recordSave"
      />
    </q-dialog>
  </div>
</template>

<script>
import SubCategory from '../../components/subcategory/SubCategory.vue'
import Listable from '../../components/Listable.vue'

export default {
  components: { Listable, SubCategory },
  data () {
    return {
      route: 'subcategories',
      title: 'Sub-Categorias',
      btnNewObject: {
        icon: 'add',
        action: 'newRegister'
      },
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true, folder: 'subcategories' },
        { name: 'name', label: 'Nombre', sortable: true, field: 'name', align: 'left' },
        { name: 'description', label: 'Descripcion', sortable: true, field: 'description', align: 'left' },
        { name: 'category_name', label: 'Nombre Categoria', sortable: true, field: 'category_name', align: 'left' },
        { name: 'has_document', label: 'Documento Requerido', sortable: true, field: row => row.has_document === 1 ? 'YES' : 'NO', align: 'center', chip: true },
        { name: 'actions', label: '', field: 'actions' }
      ],
      columnsFilter: [
        { title: 'Documento Requerido', field: 'has_document', defaultValue: 1, id: 1 },
        { title: 'Documento No Requerido', field: 'has_document', defaultValue: 0, id: 2 }
      ],
      newDlg: false,
      id: null
    }
  },
  watch: {
    newDlg (newValue) {
      if (!newValue) {
        this.$refs.listableRefSubCategories.getRecord()
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
        if (column.field === 'has_document') {
          if (column.defaultValue === 1) {
            dataFiltered = dataListable.filter((item) => {
              return item.has_document === 1
            })
          } else {
            dataFiltered = dataListable.filter((item) => {
              return item.has_document === 0
            })
          }
        }
      })

      this.$refs.listableRefSubCategories.filterColumnFn(dataFiltered)
    },
    updateData () {
      this.$refs.listableRefSubCategories.getRecord()
    },
    deleteRecord () {
      this.$emit('deleteRecord')
    },
    newRegister () {
      this.newDlg = true
    },
    openChangeDlg (id) {
      this.id = id
      this.newDlg = true
    },
    recordSave () {
      this.newDlg = false
      this.id = null
      this.$refs.listableRefSubCategories.getRecord()
    }
  }
}
</script>

<style>

</style>
