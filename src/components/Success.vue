<template>
  <section class="column">
    <div class="col-7 container-img-2"></div>
    <div class="col- column">
      <div class="q-pt-lg window-width row justify-center col-1">
        <div class="text-bold text-center col-12 text-primary q-pt-lg q-px-xl" style="font-weight: 700; font-size: 20px;">{{message ? message : $route.query.message}}</div>

        <div class="btn-progress-container row justify-center items-center col-12 q-pt-md">
          <q-btn
            to="/home"
            icon="arrow_forward"
            round
            class="btn-progress"
            size="lg"
            color="primary"
          />
          <q-circular-progress
            size="80px"
            :value="100"
            color="primary"
            :thickness="0.07"
          />
        </div>
      </div>
    </div>
</section>
</template>

<script>
export default {
  props: ['message'],
  data () {
    return {
      progressVal: 0
    }
  },
  methods: {
    nextStep () {
      console.log('nextStep')
    }
  }
}
</script>

<style style="scss" scoped>
img {
  border-radius: 0 0 40px 40px;
  box-shadow: inset 0 -103px 0  rgb(255, 0, 0);
}

.btn-progress {
  position: absolute;
  z-index: 1;
}

.container-buttom {
  position: relative;
  width: 100vw;
}

.container-img-2 {
  position: relative;
  background-image: url("../../public/illustrations/2.svg");
  background-size: countain;
  background-position: center;
  box-shadow: inset 0 -9px 0  rgb(255, 255, 255);
  border-radius: 0 0 100% 100%;
  width: 140%;
  left: -20%;
}

.q-tab-panel {
  background-color: #D9F2EE;
}

</style>
