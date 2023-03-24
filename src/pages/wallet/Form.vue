<template>
  <q-page class="q-pa-xl">
    <div class="text-h6 text-primary text-bold"> {{title}} </div>

    <section class="row q-pt-xl">
      <section
        class="row col-xs-12"
        style="max-width: 360px; width: 100%;"
      >

        <section class="col-12 row">
          <balance class="col-12" />
        </section>

      </section>

      <section class="col row q-px-lg">

        <section class="col-12 row">
          <section class="row col-12 items-center">
            <div class="col text-primary" style="font-size: 20px; font-weight: 600;">Movimientos</div>
            <section class="col-8 section-filter">
              <q-input
                v-model="filter"
                placeholder="Buscar"
                class="col-12"
                borderless
                clearable
                @keyup.enter="search"
                dense
              >
                <q-icon
                  name="bi-search"
                  class="q-ml-sm bg-primary q-pa-sm q-ma-xs"
                  slot="prepend"
                  size="xs"
                  color="white"
                  style="border-radius: 100%;"
                />
              </q-input>
            </section>
          </section>

          <section class="q-pt-lg col-12 row justify-center">
            <div
              class="col-6 q-px-xs"
            >
              <movements
                :columns="tableColumns"
                tableTitle="Ingresos"
                :rowData="tableData"
                titleColor="#7DBA47"
              />
            </div>
            <div
              class="col-6 q-px-xs"
            >
              <movements
                :columns="tableColumns"
                tableTitle="Egresos"
                titleColor="#EB5757"
              />
            </div>
          </section>
        </section>

      </section>
    </section>

  </q-page>
</template>

<script>
import Balance from '../../components/wallet/balance/Balance.vue'
import Movements from '../../components/wallet/movements/Movements.vue'
export default {
  components: { Balance, Movements },
  data () {
    return {
      title: 'Wallet',
      filter: '',
      tableColumns: [
        { name: 'banco', label: 'Banco', field: 'banco', sortable: true },
        { name: 'fecha', label: 'Fecha', field: 'fecha', sortable: true },
        { name: 'valor', label: 'Valor', field: 'valor', sortable: true },
        { name: 'saldoFinal', label: 'Saldo Final', field: 'saldoFinal', sortable: true }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.section-filter {
  background-color: #D9F2EE;
  height: 40px;
  border-radius: 8px;
}

</style>
