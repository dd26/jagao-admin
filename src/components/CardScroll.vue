<template>
  <section class="row q-pl-xl q-pt-xl">
    <div class="col-12 text-primary" style="font-size: 20px; font-weight: 700;">Cards</div>
    <div class="col-12 row q-pt-lg">
      <q-btn
        icon="add"
        style="height: 123px; width:36px"
        color="primary"
        dense
        push
        to="/cards/form"
      />
      <q-scroll-area
        class="col-10"
        style="height:123px"
        :bar-style="barStyle"
        :thumb-style="thumbStyle"
      >
        <div class="row no-wrap q-gutter-x-md q-pl-md">
          <q-card
            v-for="n in 4"
            :key="n"
            class="style-card-item row q-pa-md"
          >
            <div class="row col-12">
              <div class="col-12 row" style="height:5px">
                <div class="skeleton-style col-5"></div>
                <q-space />
                <div class="skeleton-style col-2"></div>
              </div>
              <div class="bg-primary col-3" style="height:20px; border-radius: 5px;"></div>
              <div class="skeleton-style col-10" style="height:1px"></div>
              <div class="skeleton-style col-4" style="height:1px"></div>
            </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      barStyle: {
        right: '0px',
        borderRadius: '0px',
        width: '0px',
        opacity: 0
      },
      thumbStyle: {
        right: '0',
        borderRadius: '0',
        backgroundColor: '#027be3',
        width: '0',
        opacity: 0
      }
    }
  }
}
</script>

<style scoped lang="scss">

.skeleton-style {
  background-color: #C4DDD9;
  padding-top: 6px;
  border-radius: 20px;
}

.style-card-item {
  background-color: #D9F2EE;
  border-radius: 20px;
  margin-bottom: 10px;
  height: 121px;
  width: 171px;
}
</style>
