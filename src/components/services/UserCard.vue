<template>
  <section class="row">
    <div class="col-12">
      <q-avatar size="65px">
        <img
          :src="$api_url() + `image/${folder}/${idImage}`"
        />
      </q-avatar>
    </div>
    <div class="col-12 q-pt-sm" style="font-size:10px; font-weight: 600; color: #B3B3B3;">{{roleName}}</div>

    <section class="column q-gutter-y-xs">
      <section class="column q-pt-xs">
        <div class="text-bold text-primary" style="line-height: 10px;font-weight: 700; font-size: 16px;">{{name}}</div>
        <hr class="full-width" style="border-top: 1px solid #00A58D;" />
      </section>

      <section class="column q-pt-xs">
        <div style="line-height:10px; font-weight: 600; font-size: 12px;color:#B3B3B3">Nombre de Usuario:</div>
        <div style="font-weight: 700; font-size: 16px;color:#5C5C5C">{{form.userName}}</div>
      </section>

      <section class="column q-pt-xs">
        <div style="line-height:10px; font-weight: 600; font-size: 12px;color:#B3B3B3">Identificacion:</div>
        <div style="font-weight: 700; font-size: 16px;color:#5C5C5C">{{form.identification}}</div>
      </section>

      <section class="column q-pt-xs">
        <div style="line-height:10px; font-weight: 600; font-size: 12px;color:#B3B3B3">Telefono:</div>
        <div style="font-weight: 700; font-size: 16px;color:#5C5C5C">{{form.phone}}</div>
      </section>

      <section class="column q-pt-xs" v-if="isRating">
        <div style="line-height:10px; font-weight: 600; font-size: 12px;color:#B3B3B3">Calificacion dada:</div>
        <q-rating
          :value="ratingRole"
          max="5"
          size="1.5em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          no-dimming
          class="q-mt-xs"
          :readonly="true"
        />
      </section>
    </section>
  </section>
</template>

<script>
export default {
  props: ['customer', 'specialist', 'name', 'rating', 'id'],
  data () {
    return {
      folder: this.customer ? 'customers' : 'specialists',
      idImage: this.customer ? this.customer.id : this.specialist.id,
      roleName: this.customer ? 'Cliente' : 'Especialista',
      form: this.customer ? this.customer : this.specialist,
      isRating: this.rating && this.rating.length > 0 ? 1 : 0
    }
  },
  computed: {
    ratingRole () {
      if (this.rating) {
        for (const j of this.rating) {
          if (j.user_id === this.id) {
            return j.rating
          }
        }
      }
      return 0
    }
  }
}
</script>

<style>

</style>
