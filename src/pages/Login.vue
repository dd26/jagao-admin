<template>
  <section class="absolute-full row" style="background-color:#D9F2EE; overflow: hidden">
    <div class="col-5 column justify-center window-height">
      <section class="row q-pa-md q-px-xl justify-center">
        <img src="logos/logo2.svg" alt="logo_jagao" width="150px" height="241px">
        <div class="col-12 text-center text-primary q-pb-lg" style="font-weight: 700; font-size: 28px;">BIENVENIDO A JAGAO</div>
        <q-input
          v-model="form.email"
          placeholder="Correo electronico"
          :error="$v.form.email.$error"
          @blur="$v.form.email.$touch()"
          class="col-10 no-border-inputs q-mb-md"
          borderless
          dense
        >
          <q-icon name="person" slot="prepend" style="color: #B3B3B3" />
        </q-input>

        <q-input
          v-model="form.password"
          placeholder="**************"
          :error="$v.form.password.$error"
          @blur="$v.form.password.$touch()"
          class="col-10 no-border-inputs q-mb-md"
          borderless
          bg-color="white"
          dense
          :type="isPwd ? 'password' : 'text'"
        >
          <q-icon name="lock" slot="prepend" style="color: #B3B3B3" />
          <q-icon
            style="color: #B3B3B3"
            @click="isPwd = !isPwd"
            :name="isPwd ? 'visibility' : 'visibility_off'"
            slot="append"
          />
        </q-input>

        <q-btn
          @click="recuperatePassDlg = true"
          label="¿Olvidaste tu contraseña?"
          flat
          style="color: #838383; font-size: 14px; font-weight: 400; text-decoration: underline;"
          no-caps
          dense
        />

        <q-btn
          @click="signIn"
          class="col-10 q-mt-sm q-py-xs"
          color="primary"
          label="Iniciar Sesion"
          outlined
          rounded
          dense
        />

        <div class="q-pt-md text-center col-12" style="font-size: 12px; font-weight: 400; color: #838383">Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit, sed do eiusmod tempor</div>
      </section>
    </div>
    <div class="col-7 column items-center justify-center" style="position: relative;">
      <div class="container-img col-12">
      </div>
    </div>

    <q-dialog v-model="recuperatePassDlg">
      <recuperate-password />
    </q-dialog>
  </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import RecuperatePassword from '../components/recuperate-password/Form.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    RecuperatePassword
  },
  data () {
    return {
      form: {},
      isPwd: true,
      recuperatePassDlg: false
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
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async signIn () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) return

      this.$q.loading.show()
      await this.$api.post('login', this.form).then(res => {
        this.$q.loading.hide()
        if (res) {
          if (res.status === 1) {
            this.login(res)
            this.$router.push('/home')
          } else {
            this.$q.notify({
              color: 'negative',
              message: 'Usuario temporalmente deshabilitado, contacte al administrador'
            })
          }
        }
      })
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
