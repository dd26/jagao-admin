<template>
  <q-card style="min-width: 750px; border-radius: 12px" class="bg-primary">
    <q-card-section class="bg-primary text-white row">
      <div class="col-12 row justify-end">
        <q-btn
          rounded
          color="white"
          text-color="negative"
          v-close-popup
          dense
          icon="close"
        />
      </div>

      <div class="col-12 row justify-center" v-if="form">
        <div style="border: 4px solid white; border-radius: 50%">
          <q-avatar size="90px">
            <img
              :src="$api_url() + 'image/categories/' + form.category_id"
              style="width: 100%; height: 100%;"
            />
          </q-avatar>
        </div>
        <div v-if="form" class="col-12 text-center q-pt-sm" style="font-size: 16px; font-weight: 700;">{{ form.category_name }}</div>
      </div>
    </q-card-section>
    <q-card-section class="bg-white row">
      <div class="col-12 justify-between row text-primary" style="font-weight: 700; font-size: 16px;">
        <div>REF: #{{form.id}} </div>
        <div>Fecha: {{createdService}} </div>
      </div>
      <hr class="col-12" style="border-top: 1px solid #00A58D;" />

      <section class="col-12 row q-gutter-x-sm" style="position: relative">
        <section style="background-color: #D9F2EE; border-radius: 12px; max-width: 230px" class="q-pa-sm">
          <user-card
            v-bind="form.user"
            :rating="form.rating"
          />
        </section>
        <section style="background-color: #D9F2EE; border-radius: 12px; max-width: 230px" class="q-pa-sm" v-if="form.employee">
          <user-card
            v-bind="form.employee"
            :rating="form.rating"
          />
        </section>

        <section class="row items-end" style="position: absolute; bottom: 0; right: 0; width: 175px;">
          <section class="bg-primary row items-center justify-center col-12 q-pa-md" style="height: 70px; border-radius: 12px">
            <div class="text-white text-bold col-12 text-right" style="font-size: 13px">Estatus del Servicio</div>
            <div class="text-white text-bold text-right col-12" style="font-size: 20px">{{statusName}}</div>
          </section>
        </section>
      </section>

      <section class="col-12 row q-pt-md">
        <hr class="col-12" style="border-top: 1px solid #00A58D;" />
        <div class="text-bold text-primary text-h6">Detalles</div>
        <section class="col-12 row">
          <section class="q-px-xs col-6 column">
            <section
              class="q-pa-md"
              style="background-color: #D9F2EE; border-radius: 12px"
            >
              <q-item-label class="text-primary text-h6 text-bold">Servicios</q-item-label>
              <li v-for="n in form.detail_request_service" :key="n.id" class="q-pt-xs q-pl-md">
                {{n.service_name}}
              </li>
            </section>
          </section>

          <section class="q-px-xs col-6 column">
            <section
              class="q-pa-md"
              style="background-color: #D9F2EE; border-radius: 12px"
            >
              <section class="col-12 row justify-between items-center" v-if="form.discount">
                <div style="color: #5C5C5C; font-weight: 700; font-size: 16px">Amount <br>(- Comision)</div>
                <div class="text-primary" style="color: #5C5C5C; font-weight: 700; font-size: 25px">{{form.total}}$ - {{form.discount_amount}}$</div>
              </section>

              <section class="col-12 row justify-between items-center">
                <div style="color: #5C5C5C; font-weight: 700; font-size: 16px">Total</div>
                <div class="text-primary" style="color: #5C5C5C; font-weight: 700; font-size: 32px">{{totalAmount}}$</div>
              </section>
            </section>
          </section>

          <section class="q-px-xs col-12 q-pt-md column">
            <section
              style="background-color: #D9F2EE; border-radius: 12px"
              class="col-12 row q-pa-md"
            >
              <div class="text-bold text-primary text-h6">Observaciones</div>
              <div class="col-12">{{form.observations}}</div>
            </section>
          </section>
        </section>
      </section>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import UserCard from './UserCard.vue'
export default {
  components: {
    UserCard
  },
  props: ['id'],
  data () {
    return {
      form: null
    }
  },
  computed: {
    createdService () {
      return date.formatDate(this.form.created_at, 'DD/MM/YYYY')
    },
    totalAmount () {
      if (this.form.discount) {
        return this.form.total - this.form.discount_amount
      }
      return this.form.total
    },
    statusName () {
      switch (this.form.state) {
        case 0:
          return 'Pendiente'
        case 1:
          return 'En Proceso'
        case 2:
          return 'Finalizado'
        case 404:
          return 'Cancelado'
        default:
          return 'Pendiente'
      }
    }
  },
  mounted () {
    this.getRecord()
  },
  methods: {
    async getRecord () {
      this.$q.loading.show()
      const res = await this.$api.get(`/services/${this.id}`)
      this.$q.loading.hide()
      if (res) {
        this.form = res
      }
    }
  }
}
</script>

<style>

</style>
