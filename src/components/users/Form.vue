<template>
  <q-card style="background-color: #D9F2EE; min-width: 500px; border-radius: 12px;">
    <q-card-section>
      <div class="row">
        <q-space />
        <q-btn
          rounded
          color="white"
          text-color="negative"
          v-close-popup
          dense
          icon="close"
        />
      </div>

      <div class="q-px-xl row">
        <div class="col-12 text-center text-primary q-pt-md" style="font-size: 28px; font-weight: 700;">Crear Usuario Soporte</div>
      </div>

      <div class="row q-px-lg">
        <section class="row col-12 items-center q-pa-lg q-gutter-y-md">
          <div class="col-12 row">
            <div class="q-pl-sm" style="color: #3C3C3C; font-weight: 400; font-size: 16px;">Nombre</div>
            <div class="col-12 row">
              <q-input
                v-model="form.name"
                placeholder="Isabel Summerton"
                dense
                borderless
                bg-color="white"
                class="col-12 no-border-inputs"
                :error="$v.form.name.$error"
                @blur="$v.form.name.$touch"
              />
            </div>
          </div>

          <div class="col-12 row">
            <div class="q-pl-sm" style="color: #3C3C3C; font-weight: 400; font-size: 16px;">Email</div>
            <div class="col-12 row">
              <q-input
                v-model="form.email"
                placeholder="soporte@example.com"
                dense
                borderless
                bg-color="white"
                type="email"
                class="col-12 no-border-inputs"
                :error="$v.form.email.$error"
                @blur="$v.form.email.$touch"
              />
            </div>
          </div>

          <div class="col-12 row">
            <div class="q-pl-sm" style="color: #3C3C3C; font-weight: 400; font-size: 16px;">Password</div>
            <div class="col-12 row">
              <q-input
                v-model="form.password"
                placeholder="soporte@example.com"
                dense
                borderless
                :type="isPwd ? 'password' : 'text'"
                bg-color="white"
                class="col-12 no-border-inputs"
                :error="$v.form.password.$error"
                @blur="$v.form.password.$touch"
              />
            </div>
          </div>
        </section>

        <div class="col-12 q-px-lg q-pt-lg row q-pb-lg">
          <q-btn
            @click="save"
            color="primary"
            label="Crear"
            dense
            outlined
            class="col-12"
            rounded
            no-caps
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { FormMixin } from '../../mixins/Form'
export default {
  mixins: [FormMixin],
  props: ['id'],
  data () {
    return {
      route: 'users_admin',
      form: {
        name: null,
        email: null,
        password: null
      },
      isPwd: true
    }
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    afterSave () {
      this.$emit('recordSave')
    }
  }
}
</script>

<style lang="scss" scoped>
.styled-border {
  border-radius: 50%;
  width: 93%;
  height: 93%;
  background-color: #7DBA47;
}
.styled-avatar {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  border: 1px solid #ffffff;
}

.btn-edit-style {
  position: absolute;
  bottom: 0;
  right: 0px;
}

.container-discount {
  height: 40px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid $primary;
  overflow: hidden;
  cursor: pointer;
}

.discount-values-container {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: $primary;
  height: 100%;
}

.discount-active {
  background-color: $primary;
  color: white;
}

</style>
