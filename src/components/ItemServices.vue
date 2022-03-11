<template>
  <div class="column">
    <q-card
      class="card-style-items flex flex-center"
    >
      <div class="row justify-center">
        <div class="col-6 style-icon row items-center justify-center">
          <q-icon :name="itm.icon" size="44px" />
        </div>
        <div class="col-12 text-center q-pt-sm text-primary" style="font-size:20px; font-weight: 700; line-height: 18px;"> {{itm.title}} </div>
      </div>
    </q-card>
    <div class="text-center q-pt-xs"> {{ itm.progress }} </div>
  </div>
</template>

<script>
export default {
  props: ['itm']

}
</script>

<style lang="scss" scoped>
.card-style-items {
  background: #D9F2EE;
  height: 180px;
  border-radius: 16px
}
.style-icon {
  border-radius: 50%;
  background-color: #FFF;
  padding: 15px;
}

</style>
