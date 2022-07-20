<template>
  <q-page class="row">
    <section class="col-8 q-pa-lg">
      <Listable
        :columns="columns"
        :apiroute="route"
        :title="title"
        :dataList="dataPrueba"
      />
    </section>
    <section class="col-4 row q-pa-md">
      <div class="col-12 q-gutter-y-lg">
        <q-card class="col-12 q-pa-xs q-pl-lg row" style="background-color: #00A58D; height: 160px; border-radius: 8px;">
          <div class="col-3 row items-center">
            <q-icon name="img:vectors/gps2.svg" size="70px" />
          </div>
          <div class="col-9 column text-white items-end q-px-md">
            <div class="col-2" style="font-size: 24px; font-weight: 700;">Servicios</div>
            <div class="col-9 row items-end">
              <div class="row">
                <div class="col-12 text-right" style="font-size: 24px; font-weight: 700;">0.00</div>
                <div class="col-12 text-right" style="font-size: 14px; font-weight: 500;">Prestaciones / Mensual</div>
              </div>
            </div>
          </div>
        </q-card>

        <q-card class="col-12 q-pa-xs q-pl-lg row" style="background-color: #7DBA47; height: 160px; border-radius: 8px;">
          <div class="col-3 row items-center">
            <q-icon name="img:vectors/wallet1.svg" size="70px" />
          </div>
          <div class="col-9 column text-white items-end q-px-md">
            <div class="col-2" style="font-size: 24px; font-weight: 700;">Comisiones</div>
            <div class="col-9 row items-end">
              <div class="row">
                <div class="col-12 text-right" style="font-size: 24px; font-weight: 700;">0.00</div>
                <div class="col-12 text-right" style="font-size: 14px; font-weight: 500;">Ganancias / Mensual</div>
              </div>
            </div>
          </div>
        </q-card>

        <q-card class="col-12 q-pa-xs q-pl-lg row" style="background-color: #D9F2EE; height: 160px; border-radius: 8px;">
          <div class="col-3 row items-center">
            <q-icon name="img:vectors/calculator1.svg" size="70px" />
          </div>
          <div class="col-9 column text-primary items-end q-px-md">
            <div class="col-2" style="font-size: 24px; font-weight: 700;">Facturas</div>
            <div class="col-9 row items-end">
              <div class="row">
                <div class="col-12 text-right" style="font-size: 24px; font-weight: 700;">0.00</div>
                <div class="col-12 text-right" style="font-size: 14px; font-weight: 500;">Facturas a pagar / Mensual</div>
              </div>
            </div>
          </div>
        </q-card>

        <q-card class="col-12 list-styled-specialist q-px-md q-pt-lg row">
          <div class="col-12">
            <div class="row">
              <div class="text-primary col-12" style="font-size: 32px; font-weight: 700;">Espeialistas</div>
              <hr style="border-top: 1px solid #C4C4C4" class="col-12">
              <div class="col-12 row" style="font-size: 14px; font-weight: 500;">
                <div class="col-6 text-center">Nombre</div>
                <div class="col-6 text-right">Servicio</div>
              </div>
              <hr style="border-top: 1px solid #C4C4C4" class="col-12">

              <section class="col-12 row">
                <q-scroll-area class="col-12" dense style="height: 250px">
                  <q-item
                    v-for="(item, ind) in specialists"
                    :key="ind"
                    style="padding: 0 !important; padding-top: 6px;"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="`${$api_url()}image/specialists/${item.id}`">
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{ item.userName }}</q-item-section>
                    <q-item-section side center style="color: #B3B3B3">
                    0
                    </q-item-section>
                  </q-item>
                </q-scroll-area>
              </section>
            </div>
          </div>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script>
import Listable from 'src/components/Listable.vue'
export default {
  name: 'PageIndex',
  data () {
    return {
      title: 'Servicios',
      route: 'services',
      dataPrueba: [
        { name: 'Jhon Doe Summerton', date: '01/01/2022', location: 'Non-Street - Lorem ipsum Dolor' },
        { name: 'Jhon Doe Summerton', date: '01/01/2022', location: 'Non-Street - Lorem ipsum Dolor' },
        { name: 'Jhon Doe Summerton', date: '01/01/2022', location: 'Non-Street - Lorem ipsum Dolor' },
        { name: 'Jhon Doe Summerton', date: '01/01/2022', location: 'Non-Street - Lorem ipsum Dolor' }
      ],
      columns: [
        { name: 'avatar', label: '', align: 'center', field: 'avatar', avatar: true },
        { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
        { name: 'date', label: 'Fecha', field: 'date', align: 'left' },
        { name: 'location', label: 'Localizacion', field: 'location', align: 'center' }
      ],
      specialists: []
    }
  },
  components: { Listable },
  mounted () {
    this.getSpecialists()
  },
  methods: {
    async getSpecialists () {
      const res = await this.$api.get('specialists')
      if (res) {
        this.specialists = res
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.list-styled-specialist {
  height: 402px;
  background: #FBFBFB;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  color: #B3B3B3;
}

</style>
