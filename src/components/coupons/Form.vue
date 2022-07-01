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
        <div class="col-12 text-center text-primary q-pt-md" style="font-size: 28px; font-weight: 700;">Crear Cupón</div>
      </div>

      <div class="row q-px-lg">
        <section class="row col-12 items-center q-pa-lg">
          <div class="col-12 row">
            <div class="q-pl-sm" style="color: #3C3C3C; font-weight: 400; font-size: 16px;">Código</div>
            <div class="col-12 row">
              <q-input
                v-model="form.code"
                placeholder="CLEAN_CLEAN"
                dense
                borderless
                bg-color="white"
                class="col-12 no-border-inputs"
                :error="$v.form.code.$error"
                @blur="$v.form.code.$touch"
              />
            </div>
          </div>

          <section class="col-12 row q-pt-md items-end">
            <div class="col-3 q-pr-sm">
              <div class="container-discount col-12 row justify-around items-center">
                <div
                  v-for="(discount, index) in discountTypes"
                  :key="index"
                  class="discount-values-container col-6 row items-center justify-center"
                  :class="form.type === discount.value ? 'discount-active' : ''"
                  @click="form.type = discount.value"
                >{{discount.name}}</div>
              </div>
            </div>
            <div class="col-4 row q-px-xs">
              <div class="col-12 row">
                <div class="col-12 row">
                  <q-input
                    v-model.number="form.value"
                    placeholder="20$"
                    dense
                    borderless
                    bg-color="white"
                    class="col-12 no-border-inputs"
                    :error="$v.form.value.$error"
                    @blur="$v.form.value.$touch"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div class="col-5 row q-px-xs">
              <div class="col-12 row">
                <div class="col-12 row">
                  <div class="col-12 q-pl-sm">Límite</div>
                  <q-input
                    v-model.number="form.limit"
                    placeholder="200$"
                    dense
                    borderless
                    bg-color="white"
                    class="col-12 no-border-inputs"
                    :error="$v.form.limit.$error"
                    @blur="$v.form.limit.$touch"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </section>

          <div class="col-6 row q-pt-md">
            <div class="q-pl-sm" style="color: #3C3C3C; font-weight: 400; font-size: 16px;">Fecha expiración</div>
            <div class="col-12 row">
              <q-input
                v-model="form.expiry_date"
                placeholder="26/09/2030"
                dense
                borderless
                bg-color="white"
                class="col-12 no-border-inputs"
                :error="$v.form.expiry_date.$error"
                @blur="$v.form.expiry_date.$touch"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.expiry_date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Cerrar"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
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
import { required } from 'vuelidate/lib/validators'
import { FormMixin } from '../../mixins/Form'
export default {
  mixins: [FormMixin],
  props: ['id'],
  data () {
    return {
      route: 'coupons',
      form: {
        code: null,
        type: 1
      },
      discountTypes: [
        {
          name: '%',
          value: 1
        },
        {
          name: '$',
          value: 2
        }
      ]
    }
  },
  validations: {
    form: {
      code: { required },
      value: { required },
      limit: { required },
      expiry_date: { required }
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
