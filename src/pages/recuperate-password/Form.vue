<template>
  <section class="absolute-full flex flex-center" style="background-color: #D9F2EE;">
    <section class="row">
      <section class="flex flex-center col-12">
        <img src="logos/logo2.svg" alt="logo_jagao" width="150px" height="241px">
      </section>
      <div class="col-12 text-center text-primary q-pb-sm" style="font-weight: 700; font-size: 28px;">¿Olvidaste tu contraseña?</div>
      <div class="col-12 text-center" style="font-weight: 400; font-size: 12px; color: #838383">Revisa tu e-mail, te enviamos un código de verificación</div>

      <q-form
        @submit="changePassword"
        class="col-12 flex flex-center q-pt-md column"
      >
        <section class="column">
          <div class="text-center q-pb-xs" style="color: #B3B3B3; font-weight: 400; font-size: 16px;">Ingresa el código de verificación</div>
          <q-input
            v-model="form.code"
            placeholder="*********"
            :error="$v.form.code.$error"
            @blur="$v.form.code.$touch()"
            class="no-border-inputs q-mb-md"
            borderless
            dense
            style="min-width: 320px"
          >
            <q-icon
              name="img:vectors/lock1.svg"
              slot="prepend"
              color="primary"
            />
          </q-input>
        </section>

        <section class="column">
          <div class="text-center q-pb-xs" style="color: #B3B3B3; font-weight: 400; font-size: 16px;">Ingresa tu nueva contraseña</div>
          <q-input
            v-model="form.password"
            placeholder="*********"
            :error="$v.form.password.$error"
            @blur="$v.form.password.$touch()"
            class="no-border-inputs q-mb-md"
            borderless
            dense
            style="min-width: 320px"
            :type="isPwd ? 'password' : 'text'"
          >
            <q-icon
              name="img:vectors/lock1.svg"
              slot="prepend"
              color="primary"
            />

            <q-icon
              style="color: #B3B3B3"
              @click="isPwd = !isPwd"
              :name="isPwd ? 'visibility' : 'visibility_off'"
              slot="append"
            />
          </q-input>
        </section>

        <section class="row">
          <q-btn
            class="col-12 q-py-xs q-px-xl"
            color="primary"
            label="Cambiar contraseña"
            outlined
            rounded
            dense
            no-caps
            type="submit"
          />
        </section>

      </q-form>
    </section>
  </section>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        code: '',
        password: ''
      },
      isPwd: true
    }
  },
  methods: {
    async changePassword () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      await this.$api.post('change_password', this.form).then(res => {
        if (res && !res.error) {
          this.$q.notify({
            color: 'positive',
            message: 'Se actualizo su contraseña'
          })
          this.$router.push('/login')
        } else {
          this.$q.notify({
            color: 'negative',
            message: res.error
          })
        }
      })
    }
  },
  validations: {
    form: {
      code: {
        required
      },
      password: {
        required
      }
    }
  }
}
</script>

<style>

</style>
