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
              :src="$api_url() + 'image/specialists/' + id"
              style="width: 100%; height: 100%;"
            />
          </q-avatar>
        </div>
        <div class="col-12 text-center q-pt-sm" style="font-size: 16px; font-weight: 700;">{{ form.userName }}</div>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 justify-between row text-primary" style="font-weight: 500; font-size: 16px;">
        <div>Ultimo Servicio: {{lastServiceDate}}</div>
        <div>Miembro desde: {{memberDate}}</div>
      </div>
      <hr class="col-12" style="border-top: 1px solid #00A58D;" />

      <section class="col-12 row">
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
            <div class="col-12" style="font-size: 12px; font-weight: 500;">{{ form.city.name }}</div>
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

            <q-card
              @click="downloadCv"
              class="bg-accent row text-white q-pa-sm q-px-md q-py-md q-mt-sm cursor-pointer"
              style="border-radius: 12px;"
              clickable
              v-ripple
            >
              <div class="col-4 row items-center">
                <q-icon name="img:vectors/down1.svg" size="lg" />
              </div>
              <div class="col-8 row">
                <section class="row col-12 items-center">
                  <div class="text-primary col-12 text-right">Descargar CV</div>
                </section>
              </div>
            </q-card>

            <q-card
              @click="verified"
              class="bg-positive row text-white q-pa-sm q-px-md q-py-md q-mt-sm cursor-pointer"
              style="border-radius: 12px;"
              clickable
              v-ripple
              v-if="!form.user.verified"
            >
              <div class="col-4 row items-center">
                <q-icon name="bi-person-check-fill" size="lg" />
              </div>
              <div class="col-8 row">
                <section class="row col-12 items-center">
                  <div class="text-primary col-12 text-right text-white text-bold">Verificar Especialista</div>
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
  data () {
    return {
      form: {}
    }
  },
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
  mounted () {
    this.getRecord()
  },
  methods: {
    async verified () {
      this.$q.loading.show()
      await this.$api.put('users/verified/user/' + this.form.user.id).then(res => {
        if (res) {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            message: 'Especialista verificado correctamente'
          })
          this.getRecord()
        }
      })
    },
    async getRecord () {
      this.$q.loading.show()
      const res = await this.$api.get(`/specialists/${this.id}`)
      this.$q.loading.hide()
      if (res) {
        this.form = res
      }
    },
    formatDate (dateFormat, format) {
      return date.formatDate(dateFormat, format)
    },
    async downloadCv () {
      this.$q.loading.show()
      await this.$api.post(`download_cv/${this.id}`, {}, { responseType: 'blob' }).then(res => {
        this.$q.loading.hide()
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'cv.pdf')
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>

<style>

</style>
