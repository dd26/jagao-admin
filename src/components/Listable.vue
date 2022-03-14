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
        row-key="_id"
        ref="tabla_listable"
        :pagination.sync="pagination"
        hide-pagination
        dense
        :selection="selectedItem ? 'single' : 'none'"
        :separator="true"
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
            <div v-if="props.col.category" style="width:100%" class="row justify-center">
              <div class="style-chip text-bold row justify-center items-center">
                {{ props.value }}
              </div>
            </div>
            <div v-else-if="props.col.avatar">
              <q-avatar size="lg" class="bg-primary">
                <img src="vectors/pet.png" alt="asd">
              </q-avatar>
            </div>
            <div v-else>
              {{props.value}}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props" v-if="checkIfActions">
          <q-td :props="props" class="row justify-center" style="border-bottom: 1px solid #e0e0e0; height: 60px">
            <div class="row no-wrap q-gutter-x-xs justify-around full-width">
              <q-btn
                v-for="n in props.row.actions"
                :key="n.title"
                :icon="n.icon"
                class="text-black"
                dense
                flat
                rounded
                size="11px"
                push
                :to="n.url ? n.url : null"
                @click="execute(n.action, props.row._id, props.row, n)"
                :color="n.color ? n.color : 'primary'"
              />
            </div>
          </q-td>
        </template>

      </q-table>
    </q-card-section>
    <q-card-section>
    <!--
      <div class="row justify-center">
        <div
          v-ripple
          clickble
          class="cursor-pointer"
          style="border: 1px solid #D9F2EE; box-sizing: border-box; border-radius: 4px 0px 0px 4px; padding: 12px 14px; position: relative"
        >Prev</div>
        <div
          class="text-white text-center cursor-pointer"
          v-ripple
          style="padding: 12px 14px; background: #00A58D; border: 1px solid #00A58D; box-sizing: border-box;"
        >1</div>
      </div>
     -->

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
      columnsView: []
    }
  },
  async mounted () {
    await this.getRecord()
    this.data = [
      { _id: '2', service: 'Juan', price: 'Perez', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative' }] },
      { _id: '3', service: 'Juan', price: 'Perez', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative' }] },
      { _id: '1', service: 'Juan', price: 'Perez', avatar: 'avatar', category: 'Insum', actions: [{ title: 'Editar', icon: 'img:vectors/edit4.png', color: 'primary' }, { title: 'Eliminar', icon: 'img:vectors/trash1.png', color: 'negative' }] }
    ]
  },
  methods: {
    newRegister () {
      this.$emit('newRegister')
    },
    async getRecord () {
      this.$q.loading.show()
      await this.$api.get(this.apiroute).then(res => {
        this.$q.loading.hide()
        if (res) {
          // data de prueba
        }
      })
    },
    execute (name, id, row, action) {
      console.log(name, 'name', id, 'id', row, 'row', action, 'action')
      if (typeof this[name] === 'function') {
        console.log('entra aqui')
        this[name](id, row, action)
      }
    },
    delete (id) {
      this.$q.dialog({
        title: '¡Atención!',
        message: '¿Eliminar el registro?',
        cancel: {
          label: 'Cancelar',
          outline: true
        },
        persistent: true,
        ok: {
          label: 'Eliminar',
          push: true
        }
      }).onOk(() => {
        this.confirmDelete(id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    async confirmDelete (id) {
      this.$q.loading.show()
      await this.$api.delete(this.apiroute + '/' + id).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.getRecord()
          this.$q.notify({
            message: 'Eliminado Correctamente',
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