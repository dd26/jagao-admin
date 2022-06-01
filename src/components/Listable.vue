<template>
  <q-card class="bg-white no-shadow" style="border: none !important">
    <q-card-section class="row">
      <div class="text-primary" style="font-weight: 700; font-size: 32px;" v-if="title"> {{ title }} </div>
      <q-space />
      <div v-if="btnNewObject">
        <q-btn
          icon="add"
          color="primary"
          push
          :to="btnNewObject.route"
          class="q-px-lg"
          @click="btnNewObject.action === 'newRegister' ? newRegister() : null"
        />
      </div>
    </q-card-section>
    <q-separator style="background-color: #e0e0e0;" />
    <q-card-section class="q-pa-none">
      <q-table
        :data="data"
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
            <div v-else class="ellipsis">
              {{props.value}}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props" v-if="checkIfActions">
          <q-td :props="props" class="row justify-center" style="border-bottom: 1px solid #e0e0e0; height: 60px">
            <div class="row no-wrap q-gutter-x-xs justify-around full-width items-center">
              <div v-for="n in props.row.actions" :key="n.title">
                <div v-if="!n.seeDetails">
                  <q-btn
                    :icon="n.icon"
                    class="text-black"
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
                    label="see details"
                  />
                </div>
              </div>
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
</template>

<script>
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
      console.log(this.columns.find((element) => element.name === 'actions'), 'VERIFICANDO SI EXISTEN ACCIONES')
      return this.columns.find((element) => element.name === 'actions')
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
      selected: [],
      visibleColumns: [],
      columnsView: [],
      deleteId: null,
      deleteDlg: false
    }
  },
  async mounted () {
    if (this.dataList) {
      this.data = this.dataList
    } else {
      // this.data = []
      await this.getRecord()
    }
  },
  methods: {
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
        }
      })
    },
    execute (name, id, row, action) {
      console.log(name, 'name', id, 'id', row, 'row', action, 'action')
      if (typeof this[name] === 'function') {
        this[name](id, row, action)
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
            message: 'Removed successfully!',
            color: 'positive'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

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
