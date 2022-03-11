<template>
  <section class="column fit">

    <div class="col-9 row justify-center items-center">
        <section class="row q-pt">
          <div class="col-12 row justify-center">
            <div class="container-icon">
              <q-icon name="img:vectors/mail1.svg" size="63px" />
            </div>
            <div class="text-primary col-12 text-center q-pt-sm" style="font-size: 20px; font-weight: 700;">Check your mail</div>
            <div class="col-7 text-center q-px-sm" style="font-size: 16px; font-weight: 400;">We have sent a verification link to your email.</div>
          </div>
        </section>
    </div>

    <div class="col-3 column items-center justify-start">
      <div class="btn-progress-container row justify-center items-center">
        <q-btn
          icon="arrow_forward"
          round
          class="btn-progress"
          size="lg"
          color="primary"
          @click="nextStep"
        />
        <q-circular-progress
          size="80px"
          :value="progressValue"
          color="primary"
          :thickness="0.07"
        />
      </div>
      <div class="text-center q-pt-sm" style="font-weight: 400; font-size: 12px">Skip, I’ll confirm later</div>
      <section class="text-center q-pt-lg items-start row">
        <div class="col-12 row justify-center" style="font-size: 12px;">
          Did not receive the email?  Chek your spam filter, or <b class="text-primary" style="font-size: 12px;"> try to send the mail again </b>
        </div>
      </section>
    </div>

  </section>
</template>

<script>
export default {
  props: ['progressValue'],
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
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped lang="scss">
.btn-progress {
  position: absolute;
  z-index: 1;
}

.btn-progress-container {
  position: relative;
}

.container-icon {
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 10px;
}

</style>
