<template>
  <section class="fit column">

    <div class="col-7 row items-center">
      <section class="row q-pt">
        <div class="col-12 row justify-center">
          <div class="container-icon">
            <q-icon name="img:vectors/mail1.svg" size="63px" />
          </div>
          <div class="text-primary col-12 text-center q-pt-lg" style="font-size: 20px; font-weight: 700;">Check your mail</div>
          <div class="col-7 text-center q-px-sm q-pt-md" style="font-size: 16px; font-weight: 400;">We have sent a verification link to your email.</div>
        </div>
      </section>
    </div>

    <div class="col-2 row items-center">
      <div class="col-12 text-center" style="font-weight: 400; font-size: 16px;" @click="nextStep">Skip, I’ll confirm later</div>
    </div>

    <div class="col-3 row items-end q-pb-xl">
      <div class="col-12 text-center q-px-lg" style="font-weight: 600; font-size: 12px;">
        Did not receive the email? Chek your spam filter, or <b class="text-primary"> try to send the mail again </b>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    nextStep () {
      this.$emit('nextStep')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-icon {
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 10px;
}
</style>
