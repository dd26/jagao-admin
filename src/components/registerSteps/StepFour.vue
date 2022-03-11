<template>
  <section class="column fit" style="overflow: hidden">
    <div class="col-6 container-img-2"></div>
    <div class="col-6 column">
      <div class="q-pt-lg window-width row justify-center col-1">
        <div class="text-bold text-center col-12 text-primary q-pt-lg" style="font-weight: 700; font-size: 20px;">Success</div>
        <div class="col-12 text-center" style="font-weight: 400; font-size: 16px">Lorem Ipsum dolor sit amet</div>
        <div class="col-12 text-center text-primary q-pt-md" style="font-weight: 700; font-size: 25px">Welcome to Jagao {{name}}!</div>

        <div class="btn-progress-container row justify-center items-center col-12 q-pt-md">
          <q-btn
            to="/login"
            icon="arrow_forward"
            round
            class="btn-progress"
            size="lg"
            color="primary"
          />
          <q-circular-progress
            size="80px"
            :value="progressVal"
            color="primary"
            :thickness="0.07"
          />
        </div>
        <div class="col-12 text-center text-primary q-pt-sm" style="font-weight: 700; font-size: 20px;">Continue</div>

      </div>
    </div>
</section>
</template>

<script>
export default {
  props: ['name', 'progressValue'],
  data () {
    return {
      progressVal: 0
    }
  },
  mounted () {
    this.progressVal = this.progressValue
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
  background-image: url("../../../public/illustrations/2.svg");
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
