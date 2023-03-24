<template>
  <div
    class="q-pa-md"
    style="background-color: #D9F2EE; border-radius: 10px;"
  >
    <h2
      :style="{
        color: titleColor,
        fontSize: '20px',
        lineHeight: '2px',
        fontWeight: '600'
      }"
    >{{ tableTitle }}</h2>
    <q-table
      :data="tableData"
      :columns="columns"
      :pagination.sync="pagination"
      :rows-per-page-options="[5]"
      row-key="id"
      card-class="bg-transparent"
      class="no-shadow"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>

      <template v-slot:no-data>
        <div
          class="text-center text-grey-8"
          style="font-size: 12px;"
        >
          Por el momento no hay datos para mostrar
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'DynamicTable',
  props: {
    columns: Array,
    tableTitle: String,
    rowData: Array,
    titleColor: String
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 5
      },
      tableData: []
    }
  },
  created () {
    this.tableData = this.rowData
  }
}
</script>

<style lang="scss" scoped>
// importar css
@import url('./Movements.scss');
</style>
