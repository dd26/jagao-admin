<template>
  <section class="row" style="height: 80vh">
    <section class="col row q-px-sm">
      <q-card class="bg-white col" style="border: none !important; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12); border-radius: 8px;">
        <q-card-section class="row">
          <div class="text-primary" style="font-weight: 700; font-size: 32px;" v-if="title"> {{ title }} </div>
          <q-space />
          <div v-if="btnNewObject">
            <q-btn
              icon="add"
              color="primary"
              unelevated
              dense
              style="border-radius: 8px; height: 35px; width: 100px"
              :to="btnNewObject.route"
              class="q-px-lg"
              @click="btnNewObject.action === 'newRegister' ? newRegister() : null"
            />
          </div>
        </q-card-section>

        <q-card-section v-if="!isFilter">
          <section class="row">
            <div class="col-12 row section-filter items-center">
              <section
                class="row items-center q-px-md cursor-pointer"
                @click="onClickFilter"
              >
                <div
                  class="q-pl-sm"
                  style="color: #B3B3B3"
                >Filtros</div>
                <q-icon
                  name="img:vectors/arrow1.svg"
                  class="q-ml-sm"
                />
                <q-menu v-if="columnsFilter && !btnFilter">
                  <q-list
                    style="background-color: #D9F2EE;overflow: hidden; min-width: 150px"
                  >
                    <q-item
                      @click="filterColumn(n)"
                      v-for="n in columnsFilter"
                      :key="n.title"
                      clickable
                      :style="{
                        backgroundColor: checkColumn(n) ? '#00A58D' : '#D9F2EE',
                        color: checkColumn(n) ? '#FFF' : '#00A58D'
                      }"
                      v-ripple
                    >
                      <q-item-section>
                        <q-item-label class="text-bold"> {{ n.title }} </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </section>
              <q-separator vertical class="q-my-sm" style="background-color: #e0e0e0;" />
              <section class="row col-9 q-pl-md" style="min-width: 300px">
                <q-input
                  v-model="filter"
                  placeholder="Buscar"
                  class="col-12"
                  borderless
                  clearable
                  @keyup.enter="search"
                  dense
                >
                  <q-icon
                    name="bi-search"
                    class="q-ml-sm bg-primary q-pa-sm q-ma-xs"
                    slot="prepend"
                    size="xs"
                    color="white"
                    style="border-radius: 100%;"
                  />
                </q-input>
              </section>
            </div>
          </section>
        </q-card-section>
        <q-separator style="background-color: #e0e0e0;" />
        <q-card-section class="q-pa-none">
          <q-table
            :data="dataFilter"
            :columns="columns"
            flat
            hide-bottom
            row-key="id"
            ref="tabla_listable"
            :pagination.sync="pagination"
            hide-pagination
            dense
            :selection="selectedItem ? 'single' : 'none'"
            :selected.sync="selected"
            :filter="filter"
          >

            <template v-slot:header-cell="props">
              <q-th :props="props" style="border-bottom: 1px solid #e0e0e0">
                <div class="column justify-center">
                  <div class="text-subtitle2">{{props.col.label}}</div>
                </div>
              </q-th>
            </template>

            <template v-slot:body-cell="props">
              <q-td :props="props" style="width: auto; max-width: 100px; border-bottom: 1px solid #e0e0e0; height: 60px">
                <div v-if="props.col.chip" style="width:100%" class="row justify-center">
                  <div class="style-chip text-bold row justify-center items-center">
                    {{ props.value }}
                  </div>
                </div>
                <div v-else-if="props.col.avatar">
                  <q-avatar size="lg" class="bg-primary">
                    <img :src="`${$api_url()}image/${props.col.folder}/${props.row.id}`" alt="asd">
                  </q-avatar>
                </div>
                <div v-else-if="props.col.avatarTwo">
                  <q-avatar size="lg" class="bg-primary">
                    <img :src="`${$api_url()}image/${props.col.folder}/${props.row.category_id}`" alt="asd">
                  </q-avatar>
                </div>
                <div v-else-if="props.col.rating">
                  <q-rating
                    :value="countRating(props.value)"
                    dense
                    size="sm"
                    color="yellow"
                    readonly
                  />
                </div>
                <div v-else class="ellipsis">
                  {{props.value}}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props" v-if="checkIfActions">
              <q-td :props="props" class="row justify-center" style="border-bottom: 1px solid #e0e0e0; height: 60px">
                <div class="row no-wrap q-gutter-x-xs justify-around full-width items-center">
                  <div v-for="n in props.row.actions" :key="n.title">
                    <div v-if="n.type && n.type === 'toggle'">
                      <q-toggle
                        :value="props.row.status ? true : false"
                        @input="execute(n.action, props.row.id, props.row, n)"
                      />
                    </div>
                    <div v-else-if="!n.seeDetails">
                      <q-btn
                        :icon="n.icon"
                        dense
                        flat
                        rounded
                        size="11px"
                        push
                        :to="n.url ? n.url : null"
                        @click="execute(n.action, props.row.id, props.row, n)"
                        :color="n.color ? n.color : 'primary'"
                      />
                    </div>
                    <div v-else>
                      <q-btn
                        @click="execute(n.action, props.row.id, props.row, n)"
                        flat
                        rounded
                        dense
                        color="primary"
                        size="md"
                        no-caps
                        :label="n.title"
                      />
                    </div>
                  </div>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-actionsNew="props" v-if="checkIfActionsNew">
              <q-td :props="props" class="row justify-center" style="border-bottom: 1px solid #e0e0e0; height: 60px">
                <div class="row no-wrap q-gutter-x-xs justify-around full-width items-center">
                  <q-btn
                    flat
                    rounded
                    dense
                    color="primary"
                    size="md"
                    no-caps
                    icon="more_vert"
                  >
                    <q-menu>
                      <q-list style="background-color: #D9F2EE;overflow: hidden">
                        <q-item
                          @click="execute(n.action, props.row.id, props.row, n)"
                          v-for="n in props.row.actionsNew"
                          :key="n.title"
                          clickable
                          class="text-primary"
                          v-ripple
                        >
                          <q-item-section>
                            <q-item-label class="text-bold"> {{ n.title }} </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-td>
            </template>

          </q-table>
        </q-card-section>
        <q-card-section>

          <div class="row q-mt-md justify-center">
          <q-pagination
            v-model="pagination.page"
            color="primary"
            :max="pagesNumber"
            size="sm"
            direction-links
            boundary-links
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
            active-color="primary"
            active-text-color="white"
          />
        </div>
        </q-card-section>

        <q-dialog v-model="deleteDlg">
          <q-card class="row justify-center q-pa-xl">
            <div class="row justify-center col-12">
              <div class="q-pa-sm" style="border-radius: 50%; background-color: #D16A6A;">
                <q-icon name="img:vectors/trash2.svg" size="md" />
              </div>
            </div>

            <div class="row col-12 text-center justify-center" style="font-size: 28px; font-weight: 700;">
              Are you sure?
            </div>

            <div class="row col-12 text-center justify-center">
              Lorem ipsum dolor sit amet
            </div>

            <div class="row justify-around col-12 q-pt-md">
              <div class="col-5">
                <q-btn
                  color="grey-5"
                  label="Cancel"
                  rounded
                  v-close-popup
                  no-caps
                  class="full-width"
                />
              </div>
              <div class="col-5">
                <q-btn
                  style="background-color: #D16A6A; color: white"
                  label="Delete"
                  rounded
                  no-caps
                  class="full-width"
                  @click="confirmDelete"
                />
              </div>
            </div>
          </q-card>
        </q-dialog>
      </q-card>
    </section>
  </section>
</template>

<script>
// import { date } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  name: 'TableActions',
  computed: {
    ...mapGetters('generals', ['can']),
    dataMostrar () {
      return this.data
    },
    pagesNumber () {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    },
    checkIfActions () {
      return this.columns.find((element) => element.name === 'actions')
    },
    checkIfActionsNew () {
      return this.columns.find((element) => element.name === 'actionsNew')
    }
  },
  props: {
    btnNewObject: {
      default: null
    },
    apiroute: {
      type: String,
      default: ''
    },
    columns: {
      type: Array
    },
    selectedItem: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: null
    },
    isFilter: {
      type: Boolean,
      default: false
    },
    columnsFilter: {
      type: Array,
      default: null
    },
    uniqueColumnFilter: {
      type: Boolean,
      default: false
    },
    btnFilter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 25
      },
      data: [],
      dataFilter: [],
      selected: [],
      visibleColumns: [],
      columnsView: [],
      deleteId: null,
      deleteDlg: false,
      filter: null,
      columnsFilterSelect: []
    }
  },
  async mounted () {
    if (this.dataList) {
      this.data = this.dataList
    } else {
      await this.getRecord()
    }
  },
  methods: {
    avanzedFilter (columnFilter) {
      console.log(columnFilter)
      // filtrar por los campos que recibo
      // se recibe por ejemplo [{ column: 'category_id', value: 1 }]
      // entonces tengo que buscar en la columna category_id si tiene el valor 1
      // y si lo tiene devolver true
      // y retonar el array con los elementos que cumplan con la condicion
      if (columnFilter.length === 0) {
        this.dataFilter = this.data
        return
      }

      // necesito hacer un filtro por cada columna que recibo
      // ejemplo [{ column: 'category_id', value: 1 }, { column: 'name', value: 'hola' }]
      // entonces tengo que buscar en la columna category_id si tiene el valor 1
      // y si lo tiene devolver true y a su vez como son dos columnas tengo que buscar
      // al primer filtro que se hizo se le tiene que aplicar el segundo filtro
      // y asi sucesivamente si hay mas de dos columnas
      // para retornar la data que sea igual al cada filtro
      // y asi devolver la data que cumpla con todos los filtros
      const dataFilter = []
      this.data.forEach((element) => {
        let count = 0
        columnFilter.forEach((column) => {
          // debo ver si la columna tiene el type === date
          // si es asi debo convertir el valor de la columna a date
          if (column.type === 'date') {
            const date = new Date(element[column.column])
            const dateFilter = new Date(column.value)
            if (date.getDate() === dateFilter.getDate() && date.getMonth() === dateFilter.getMonth() && date.getFullYear() === dateFilter.getFullYear()) {
              count++
            }
          } else if (element[column.column] === column.value) {
            count++
          }
        })
        if (count === columnFilter.length) {
          dataFilter.push(element)
        }
      })
      this.dataFilter = dataFilter


      console.log(this.dataFilter)
    },
    onClickFilter () {
      this.$emit('onClickFilter')
    },
    // metodo para buscar en las columnas seleccionadas
    // y devolver true o false si esta seleccionada para asi mostrar de color
    // el icono de la columna para identificar que esta seleccionada
    checkColumn (column) {
      const index = this.columnsFilterSelect.findIndex((element) => element.id === column.id)
      if (index === -1) {
        return false
      } else {
        return true
      }
    },
    filterColumn (column) {
      // buscar si la columna esta en el array de columnas a filtrar
      if (!this.uniqueColumnFilter) {
        const index = this.columnsFilterSelect.findIndex((element) => element.id === column.id)
        if (index === -1) {
          this.columnsFilterSelect.push(column)
        } else {
          this.columnsFilterSelect.splice(index, 1)
        }
      } else {
        // si ya esta seleccionada la columna, se elimina del array
        // siempre y cuando la que esta seleccionada sea diferente a la que se esta clickeando
        if (this.columnsFilterSelect.length > 0) {
          if (this.columnsFilterSelect[0].id !== column.id) {
            this.columnsFilterSelect = []
            this.columnsFilterSelect.push(column)
          } else {
            this.columnsFilterSelect = []
          }
        } else {
          this.columnsFilterSelect.push(column)
        }
      }
      this.$emit('filterColumnFn', this.columnsFilterSelect, this.data)
    },
    filterColumnFn (data) {
      console.log(data, 'data')
      this.dataFilter = data
    },
    countRating (ratings) {
      if (ratings.length > 0) {
        let count = 0
        ratings.forEach((element) => {
          count += element.rating
        })
        return count / 2
      } else {
        return 0
      }
    },
    changeStatusUserAdm (id, row) {
      this.$emit('changeStatusUserAdm', id, row)
    },
    changeStatusCoupon (id, row) {
      this.$emit('changeStatusCoupon', id, row.status)
    },
    seeDetail (id, row) {
      this.$emit('see-detail', row)
    },
    edit (id) {
      this.$emit('openChangeDlg', id)
    },
    newRegister () {
      this.$emit('newRegister')
    },
    async getRecord () {
      this.$q.loading.show()
      await this.$api.get(this.apiroute).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.data = res
          this.dataFilter = res
        }
      })
    },
    execute (name, id, row, action) {
      console.log(name, 'name', id, 'id', row, 'row', action, 'action')
      if (!action.vueEmit) {
        if (typeof this[name] === 'function') {
          this[name](id, row, action)
        }
      } else {
        this.$emit(action.action, id, row, action)
      }
    },
    delete (id) {
      this.deleteId = id
      this.deleteDlg = true
    },
    async confirmDelete (id) {
      this.deleteDlg = false
      id = this.deleteId
      this.$q.loading.show()
      await this.$api.delete(this.apiroute + '/' + id).then(res => {
        this.$q.loading.hide()
        this.$emit('deleteRecord')
        if (res) {
          this.getRecord()
          this.$q.notify({
            message: 'Eliminado correctamente',
            color: 'positive'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.section-filter {
  background-color: #D9F2EE;
  height: 40px;
  border-radius: 8px;
}

.style-chip {
  background-color: $primary;
  border-radius: 12px;
  text-align: center;
  color: #FFF;
  width: 100px;
}
.style-btn-actions {
  border-radius: 10px
}

.container {
  width: auto;
  position: relative;
}

.border {
  margin-left: 15px;
  margin-right: 15px;
}

.input-filters {
  min-width: 100px;
  border-radius: 12px;
  border: 0;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  height:40px;
  background: $red-1;
}

.input-filters ~ .border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: $secondary;
}

.input-filters:focus {
  outline: none;
}

.input-filters:focus ~ .border {
  width: calc(100% - 35px);
  transition: 0.4s;
  left: 0;
}
</style>
