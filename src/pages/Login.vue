<template>
  <section class="absolute-full row" style="background-color:#D9F2EE; overflow: hidden">
    <div class="col-5 column justify-center window-height">
      <section class="row q-pa-md q-px-xl justify-center">
        <img src="logos/logo2.svg" alt="logo_jagao" width="150px" height="241px">
        <div class="col-12 text-center text-primary q-pb-lg" style="font-weight: 700; font-size: 28px;">WELCOME TO JAGAO</div>
        <q-input
          v-model="form.email"
          placeholder="User Name/Email"
          :error="$v.form.email.$error"
          @blur="$v.form.email.$touch()"
          class="col-12"
          outlined
          bg-color="white"
          dense
        >
          <q-icon name="person" slot="prepend" />
        </q-input>

        <q-input
          v-model="form.password"
          placeholder="**************"
          :error="$v.form.password.$error"
          @blur="$v.form.password.$touch()"
          class="col-12"
          outlined
          bg-color="white"
          dense
          :type="isPwd ? 'password' : 'text'"
        >
          <q-icon name="lock" slot="prepend" />
          <q-icon
            @click="isPwd = !isPwd"
            :name="isPwd ? 'visibility' : 'visibility_off'"
            slot="append"
          />
        </q-input>

        <q-btn
          to="/home"
          class="col-12 q-mt-sm q-py-xs"
          color="primary"
          label="SIGN IN"
          outlined
          rounded
          dense
        />

        <div class="q-pt-md text-center col-12" style="font-size: 12px; font-weight: 400;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
      </section>
    </div>
    <div class="col-7 column items-center justify-center" style="position: relative;">
      <div class="container-img col-12">
      </div>
    </div>
  </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      isPwd: true
    }
  },
  validations () {
    return {
      form: {
        email: {
          required
        },
        password: {
          required
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container-img {
  position: relative;
  background-image: url("../../public/illustrations/4.svg");
  background-size: 120% 84%;
  background-repeat: no-repeat;
  background-position: right;
  box-shadow: inset 20px 0 0  rgb(255, 255, 255);
  border-radius: 100% 0 0 100%;
  width: 150%;
  height: 140vh;
  top: -140px;
  left: 0;
}

</style>
