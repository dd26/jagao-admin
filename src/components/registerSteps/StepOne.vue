<template>
  <section class="column fit">

    <div class="col-9">

      <section class="column items-start q-px-lg q-pt-lg">
        <q-btn
          icon="arrow_back_ios"
          to="/login"
          flat
          rounded
          dense
          color="secondary"
        />
        <div class="text-bold text-primary text-subtitle1">Sign Up</div>
      </section>

      <section class="row q-pt-xl q-px-md">
        <div class="col-12 row q-pa-md q-col-gutter-y-sm">
          <div class="col-12 row q-gutter-x-sm q-pl-lg">
            <div>Email</div>
            <div
              v-for="ic in errorConfirmIcons"
              :key="ic.value"
            >
              <q-icon
                v-if="(ic.value === 'n' && $v.stateForm.email.$error) || (ic.value === 'p' && !$v.stateForm.email.$error)"
                :name="ic.name"
                :color="ic.color"
                size="xs"
              />
            </div>
          </div>
          <q-input
            v-model="stateForm.email"
            placeholder="User Name/Email"
            @blur="$v.stateForm.email.$touch()"
            class="col-12"
            outlined
            bg-color="white"
            dense
          />
        </div>

        <div class="col-12 row q-pa-md q-col-gutter-y-sm">
          <div class="col-12 row q-gutter-x-sm q-pl-lg">
            <div>Password</div>
            <div
              v-for="ic in errorConfirmIcons"
              :key="ic.value"
            >
              <q-icon
                v-if="(ic.value === 'n' && $v.stateForm.password.$error) || (ic.value === 'p' && !$v.stateForm.password.$error)"
                :name="ic.name"
                :color="ic.color"
                size="xs"
              />
            </div>
          </div>
          <q-input
            v-model="stateForm.password"
            @blur="$v.stateForm.password.$touch()"
            @input="$v.stateForm.password.$touch()"
            :type="!isPwd ? 'password' : 'text'"
            placeholder="Yourpassword"
            class="col-12"
            outlined
            bg-color="white"
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
            <div>Confirm Password</div>
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
            @blur="$v.confirmPassword.$touch()"
            :type="!isPwd ? 'password' : 'text'"
            placeholder="Yourpassword"
            class="col-12"
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
      </section>

    </div>

    <div class="col-3 column items-center">
      <div class="btn-progress-container row justify-center items-center">
        <q-btn
          @click="nextStep"
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
    </div>

  </section>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  props: ['progressValue'],
  data () {
    return {
      stateForm: {
        email: '',
        password: ''
      },
      confirmPassword: '',
      errorConfirmIcons: [
        { name: 'check_circle', color: 'positive', value: 'p' },
        { name: 'cancel', color: 'negative', value: 'n' }
      ],
      isPwd: false,
      progressVal: 0
    }
  },
  mounted () {
    this.$v.$touch()
    this.progressVal = this.progressValue
  },
  methods: {
    nextStep () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.$emit('nextStep', this.stateForm)
    }
  },
  validations () {
    return {
      stateForm: {
        email: { required, email },
        password: { required, minLength: minLength(8) }
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(() => this.stateForm.password)
      }
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

</style>
