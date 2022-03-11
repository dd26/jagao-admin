<template>
  <q-card class="row no-shadow">
    <section class="col-12 bg-primary" style="height:150px; position: relative">
      <q-btn
        to="/home"
        dense
        flat
        size="11px"
        icon="arrow_back_ios"
        style="position: absolute; top: 15px; left: 15px"
        color="white"
      />
      <img :src="service.posterImg" width="100%" height="100%" style="border-radius: 12px 12px 0 0; object-fit: cover;">
    </section>

    <section class="col-12 q-pt-lg">
      <div class="text-primary col-12 q-pl-lg" style="font-size: 25px; font-weight: 700;"> {{service.title}} </div>
      <div class="q-pl-lg" style="font-size: 16px; font-weight: 400;"> {{service.subtitle}} </div>
    </section>

    <section class="row col-12 q-pt-lg">
      <q-list class="col-12 q-gutter-y-md" separator>
        <q-item clickable v-ripple v-for="(item, index) in services" :key="index">
          <q-item-section avatar>
            <q-avatar rounded text-color="white" size="55px">
              <img src="vectors/clean1.svg" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-primary" style="font-size: 20px; font-weight: 700;"> {{ item.title }} </q-item-label>
            <q-item-section style="font-size: 16px; font-weight: 400;">{{ item.subtitle }}</q-item-section>
          </q-item-section>

          <q-item-section side center>
            <q-checkbox v-model="item.select" keep-color color="secondary" />
          </q-item-section>

        </q-item>
      </q-list>
    </section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      servicesType: [
        { posterImg: 'vectors/poster1.svg', title: 'Clean Services', subtitle: 'Check the services you offer', value: 'clean' },
        { posterImg: 'vectors/poster2.svg', title: 'House service', subtitle: 'Check the services you offer', value: 'house' },
        { posterImg: 'vectors/poster3.svg', title: 'Road Service', subtitle: 'Check the services you offer', value: 'road' },
        { posterImg: 'vectors/poster4.svg', title: 'Escort service', subtitle: 'Check the services you offer', value: 'escort' }
      ],
      serviceSelect: false,
      services: [
        { title: 'Kitchen cleaning', subtitle: 'Lorem Ipsum dolor', select: false },
        { title: 'Room cleaning', subtitle: 'Lorem Ipsum dolor', select: false },
        { title: 'Bathroom cleaning', subtitle: 'Lorem Ipsum dolor', select: false },
        { title: 'Garage Cleaning', subtitle: 'Lorem Ipsum dolor', select: false }
      ]
    }
  },
  computed: {
    service () {
      const service = this.$route.query.service
      if (service) {
        return this.servicesType.find(item => item.value === this.$route.query.service)
      } else {
        return this.servicesType[0]
      }
    }
  }
}
</script>

<style>

</style>
