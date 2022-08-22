<template>
  <q-card class="q-pa-lg">
    <q-card-section>
      <div class="text-uppercase text-h6 text-primary text-bold">Reset your password</div>
        <section class="row">
          <div class="col-12 row q-pt-sm">
            <div class="col-12 q-pb-xs">Email</div>
            <q-input
              v-model="form.email"
              placeholder="youremail@mail.com"
              :error="$v.form.email.$error"
              @blur="$v.form.email.$touch()"
              class="col-12"
              outlined
              dense
            />
            <q-btn
              @click="submit"
              label="Reset"
              color="primary"
              rounded
              unelevated
              class="col-12 q-mt-sm"
            />
          </div>
        </section>
    </q-card-section>
  </q-card>
</template>

<script>
// importar vuelidate
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        email: 'denilsson.d.sousa@gmail.com'
      }
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      await this.$api.post('recuperate_pass', this.form).then(res => {
        if (res && !res.error) {
          this.$q.notify({
            color: 'positive',
            message: 'Se envio un correo para recuperar la contraseña'
          })
          this.$router.push('/reset-password')
        } else if (res && res.error) {
          this.$q.notify({
            color: 'negative',
            message: res.error
          })
        }
      })
    }
  },
  validations () {
    return {
      form: {
        email: {
          required
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.q-card {
  border-radius: 10px;
}
</style>
