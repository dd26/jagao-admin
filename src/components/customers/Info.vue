<template>
  <q-card style="min-width: 600px; border-radius: 12px">
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

      <div class="col-12 row justify-center">
        <div style="border: 4px solid white; border-radius: 50%">
          <q-avatar size="90px">
            <img
              :src="$api_url() + 'image/customers/' + id"
              style="width: 100%; height: 100%;"
            />
          </q-avatar>
        </div>
        <div v-if="form" class="col-12 text-center q-pt-sm" style="font-size: 16px; font-weight: 700;">{{ form.userName }}</div>
      </div>
    </q-card-section>

    <q-card-section class="row" v-if="form">
      <div class="col-12 justify-between row text-primary" style="font-weight: 500; font-size: 16px;">
        <div>Ultimo Servicio: {{lastServiceDate}}</div>
        <div>Miembro desde: {{memberDate}}</div>
      </div>
      <hr class="col-12" style="border-top: 1px solid #00A58D;" />

      <section class="col-12 row" v-if="form">
        <div class="col-8 row">
          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Nombre Completo:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">{{form.user.name}}</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Fecha de nacimiento:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">{{ formatDate(form.birthDate, 'DD/MM/YYYY') }}</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Identificacion:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">{{ form.identification }}</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Ciudad/ Pueblo:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">{{ form.city_id }}</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Direccion:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">{{ form.address }}</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Correo:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">{{ form.email }}</div>
          </div>
        </div>

        <div class="row items-end col-4">
          <section class="col-12">
            <q-card class="bg-primary row text-white q-pa-sm q-px-md" style="border-radius: 12px;">
              <div class="col-4 row items-center">
                <q-icon name="img:vectors/accept2.svg" size="lg" />
              </div>
              <div class="col-8 row">
                <section class="row col-12 items-between">
                  <div class="text-right col-12" style="font-weight: 600; font-size: 10px;">Servicios completados</div>
                  <br>
                  <div class="text-right col-12" style="font-size: 24px; font-weight: 600;">{{countServicesCompletes}}</div>
                </section>
              </div>
            </q-card>

            <q-card class="bg-secondary row text-white q-pa-sm q-px-md q-mt-sm" style="border-radius: 12px;">
              <div class="col-4 row items-center">
                <q-icon name="img:vectors/setting2.svg" size="lg" />
              </div>
              <div class="col-8 row">
                <section class="row col-12 items-between">
                  <div class="text-right col-12" style="font-weight: 600; font-size: 10px;">Servicios Activos</div>
                  <br>
                  <div class="text-right col-12" style="font-size: 24px; font-weight: 600;">{{countServicesWorking}}</div>
                </section>
              </div>
            </q-card>
          </section>
        </div>
      </section>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
export default {
  props: ['id'],
  computed: {
    memberDate () {
      return date.formatDate(this.form.created_at, 'YYYY')
    },
    countServicesCompletes () {
      return this.form.services.filter(service => service.state === 2).length
    },
    countServicesWorking () {
      return this.form.services.filter(service => service.state === 1).length
    },
    lastServiceDate () {
      if (this.form && this.form.services && this.form.services.length > 0) {
        return date.formatDate(this.form.services[this.form.services.length - 1].updated_at, 'DD/MM/YYYY')
      } else {
        return 'Ninguno'
      }
    }
  },
  data () {
    return {
      form: null
    }
  },
  mounted () {
    this.getRecord()
  },
  methods: {
    async getRecord () {
      this.$q.loading.show()
      const res = await this.$api.get(`/customers/${this.id}`)
      this.$q.loading.hide()
      if (res) {
        this.form = res
      }
    },
    formatDate (dateFormat, format) {
      return date.formatDate(dateFormat, format)
    }
  }
}
</script>

<style>

</style>
