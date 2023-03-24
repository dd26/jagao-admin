<template>
  <div>
    <section class="balance-container row">
      <div class="col-12 text-balance">Balance</div>

      <div class="col-12 text-primary text-balance-amount q-pt-md">$0,00</div>

      <section class="col-12 row q-pt-md">
        <q-btn
          class="q-px-md"
          color="white"
          text-color="primary"
          label="Recargar"
          style="border-radius: 10px;"
          size="sm"
          icon="bi-arrow-up"
          dense
          no-caps
        />
        <q-space />
        <q-btn
          class="q-px-md"
          color="white"
          text-color="primary"
          label="Desembolsar"
          style="border-radius: 10px;"
          size="sm"
          icon="bi-arrow-down"
          dense
          no-caps
        />
      </section>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import url('./Balance.scss');
</style>
