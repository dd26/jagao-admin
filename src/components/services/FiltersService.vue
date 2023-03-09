<template>
  <q-card class="card-container">
    <q-card-section class="row q-pa-lg ">
      <q-btn
        color="negative"
        icon="close"
        flat
        dense
        round
        v-close-popup
        style="position: absolute; top: 5px; right: 5px"
      />

      <div class="text-bold text-primary text-h6">
        Filtrar por:
      </div>

      <section class="col-12 row q-pt-lg">
        <section class="col-12 row items-center q-gutter-x-sm">
          <div class="text-bold text-primary text-subtitle1 col-3">
            Fecha:
          </div>
          <q-input
            bg-color="white"
            v-model="form.date"
            dense
            outlined
            class="col"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.date">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Cerrar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </section>

        <!-- Estatus -->
        <section class="col-12 row items-center q-gutter-x-sm q-pt-md">
          <div class="text-bold text-primary text-subtitle1 col-3">
            Estatus:
          </div>
          <q-select
            v-model="form.status"
            :options="statusOptions"
            placeholder="Estatus"
            dense
            outlined
            class="col"
            bg-color="white"
            emit-value
            map-options
          />
        </section>

        <!-- Categoria -->
        <section class="col-12 row items-center q-gutter-x-sm q-pt-md">
          <div class="text-bold text-primary text-subtitle1 col-3">
            Categoria:
          </div>
          <q-select
            v-model="form.category"
            :options="categories"
            placeholder="Categoria"
            dense
            outlined
            class="col"
            bg-color="white"
            emit-value
            map-options
            option-value="id"
            option-label="name"
          />
        </section>
      </section>
    </q-card-section>
    <q-card-actions align="center" class="q-py-lg">
      <q-btn
        @click="$emit('filter', form)"
        color="primary"
        label="Aplicar filtros"
        class="q-px-md text-bold"
        style="border-radius: 12px;"
        no-caps
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        date: null,
        status: 'all',
        category: null
      },
      statusOptions: [
        { label: 'Todos', value: 'all' },
        { label: 'Pendiente', value: 0 },
        { label: 'En proceso', value: 1 },
        { label: 'Finalizado', value: 2 },
        { label: 'Cancelado', value: 404 }
      ],
      categories: []
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      try {
        this.$q.loading.show()
        await this.$api.get('categories')
          .then((res) => {
            this.categories = res
            // agregar en la primera posicion el valor de todos
            this.categories.unshift({ id: 'all', name: 'Todos' })
            this.form.category = this.categories[0].id
          })
      } catch (error) {
        console.log(error)
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card-container {
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  background-color: #D9F2EE;
}
</style>
