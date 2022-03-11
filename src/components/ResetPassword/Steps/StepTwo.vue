<template>
  <section class="row q-pa-lg">
    <div class="text-primary q-pt-xl" style="font-weight: 700; font-size: 20px">Create new password</div>
    <div class="q-pr-xl" style="font-size: 12px; font-weight: 400; color: #838383">Your new password must be different from previous used passwords.</div>

    <section class="col-12 row q-pt-xl">
      <div class="col-12 row q-pa-md q-col-gutter-y-sm">
        <div class="col-12 row q-gutter-x-sm q-pl-lg">
          <div>New password</div>
          <div
            v-for="ic in errorConfirmIcons"
            :key="ic.value"
          >
            <q-icon
              v-if="(ic.value === 'n' && $v.form.newPassword.$error) || (ic.value === 'p' && !$v.form.newPassword.$error)"
              :name="ic.name"
              :color="ic.color"
              size="xs"
            />
          </div>
        </div>
        <q-input
          v-model="form.newPassword"
          placeholder="Yourpassword"
          @blur="$v.form.newPassword.$touch()"
          class="col-12"
          outlined
          bg-color="white"
          :type="!isPwd ? 'password' : 'text'"
          dense
          hint="Your password should be 8 or more characters"
        >
          <q-icon
            @click="isPwd = !isPwd"
            :name="!isPwd ? 'img:vectors/eye1.svg' : 'bi-eye-slash'"
            slot="append"
          />
        </q-input>
      </div>

      <div class="col-12 row q-pa-md q-col-gutter-y-sm">
        <div class="col-12 row q-gutter-x-sm q-pl-lg">
          <div>Confirm password</div>
          <div
            v-for="ic in errorConfirmIcons"
            :key="ic.value"
          >
            <q-icon
              v-if="(ic.value === 'n' && $v.confirmPassword.$error) || (ic.value === 'p' && !$v.confirmPassword.$error)"
              :name="ic.name"
              :color="ic.color"
              size="xs"
            />
          </div>
        </div>
        <q-input
          v-model="confirmPassword"
          placeholder="Yourpassword"
          @blur="$v.confirmPassword.$touch()"
          class="col-12"
          :type="!isPwd ? 'password' : 'text'"
          outlined
          bg-color="white"
          dense
        >
          <q-icon
            @click="isPwd = !isPwd"
            :name="!isPwd ? 'img:vectors/eye1.svg' : 'bi-eye-slash'"
            slot="append"
          />
        </q-input>
      </div>

      <div class="col-12 row q-px-md q-pt-xl">
        <q-btn
          to="/login"
          color="primary"
          label="Reset Password"
          class="col-12"
          rounded
        />
      </div>
    </section>
  </section>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        newPassword: ''
      },
      confirmPassword: '',
      errorConfirmIcons: [
        { name: 'check_circle', color: 'positive', value: 'p' },
        { name: 'cancel', color: 'negative', value: 'n' }
      ],
      isPwd: false
    }
  },
  validations () {
    return {
      form: {
        newPassword: {
          required,
          minLength: minLength(8)
        }
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(() => this.form.newPassword)
      }
    }
  }
}
</script>

<style>

</style>
