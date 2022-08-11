<template>
  <q-card style="min-width: 700px; border-radius: 12px" class="bg-primary">
    <q-card-section class="row" style="position: relative">
      <q-btn
        rounded
        color="white"
        v-close-popup
        text-color="negative"
        dense
        icon="close"
        style="position: absolute; top: 10px; right: 10px; z-index: 1"
      />

      <div class="row col-12 justify-center">
        <div class="col-12 row justify-center">
          <section class="bg-white q-pa-lg style-person">
            <img src="vectors/person4.svg" alt="" width="50px" height="50px">
          </section>
          <div class="col-12 text-center text-white q-pt-sm" style="font-size: 16px; font-weight: 700;">Detalle de usuario</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="row bg-white justify-center q-py-xl">
      <section class="col-2 row justify-end items-center">

        <section class="row justify-center">
          <q-avatar size="106px">
            <img :src="$api_url() + 'image/users_admin/' + id" alt="">
          </q-avatar>
          <section class="col-12 row q-pt-sm">
            <label class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3;">Usuario de soporte</label>
          </section>
          <section class="col-12 row">
            <label class="col-12 text-primary" style="font-size: 16px; font-weight: 700;">{{form.name}}</label>
            <q-separator class="bg-primary col-12" style="height: 1px" />
          </section>
        </section>

      </section>
      <section class="col-6 row q-pl-xl items-center">
        <section class="row col-12 q-gutter-y-sm">
          <section class="col-12 row">
            <label class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3;">E-mail:</label>
            <label class="col-12" style="font-size: 16px; font-weight: 500;">{{form.email}}</label>
          </section>

          <section class="col-12 row">
            <label class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3;">Fecha de creación de usuario:</label>
            <label class="col-12" style="font-size: 16px; font-weight: 500;">{{$formatDate(form.created_at, 'DD/MM/YYYY')}}</label>
          </section>
        </section>
      </section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      form: null,
      route: 'users_admin'
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      this.$q.loading.show()
      const response = await this.$api.get(`${this.route}/${this.id}`)
      this.$q.loading.hide()
      this.form = response
    }
  }
}
</script>

<style scoped lang="scss">

.style-person {
  clip-path: circle();
}

</style>
