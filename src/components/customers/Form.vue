<template>
  <q-card class="bg-accent" style="min-width: 600px; border-radius: 12px">
    <div class="row q-px-md q-pt-md">
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
      <div class="col-12 text-center text-primary q-pt-md" style="font-size: 28px; font-weight: 700;">Create Profile</div>
    </div>

    <div class="row q-px-lg q-pb-xl">
      <section class="row col-12 items-center q-pa-lg">
        <div class="col-6 row">
          <section class="col-12 row items-center justify-center styled-avatar">
            <div class="styled-border row justify-center items-center">
              <q-icon
                v-if="!image"
                name="bi-person-fill"
                size="120px"
                style="color: #97DDFD"
              />
              <q-avatar v-else style="width:100%; height:100%">
                <img
                  :src="imageUrl"
                  style="width: 100%; height: 100%;"
                />
              </q-avatar>
              <q-file
                v-model="image"
                accept="image/*"
                @input="onFileInput"
                style="display: none"
                ref="fileRF"
              />
              <div class="btn-edit-style">
                <q-btn
                  @click="$refs.fileRF.$el.click()"
                  icon="img:vectors/edit5.svg"
                  flat
                  dense
                  rounded
                  size="xl"
                />
              </div>
            </div>
          </section>
        </div>
        <div class="col-6 row">
          <div class="col-12 row">
            <div class="col-12"> User Name </div>
            <q-input
              v-model="form.userName"
              placeholder="yourusername01"
              dense
              outlined
              bg-color="white"
              class="col-12"
              :error="$v.form.userName.$error"
              @blur="$v.form.userName.$touch"
            />
          </div>
          <div class="col-12 q-pt-lg row">
            <div class="col-12"> Birth date </div>
            <q-input
              v-model="form.birthdate"
              mask="date"
              :rules="['date']"
              outlined
              bg-color="white"
              dense
              @focus="openProxy"
              @blur="$v.form.birthdate.$touch"
              :error="$v.form.birthdate.$error"
            >
              <template v-slot:append>
                <q-icon
                  name="keyboard_arrow_down"
                  class="cursor-pointer text-white bg-primary"
                  style="border-radius: 50%;"
                  size="17px"
                >
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.birthdate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </section>

      <div class="col-12 row">
        <div class="col-12 q-pl-md"> Password </div>
        <q-input
          v-model="form.password"
          placeholder="* * * * * * * * * * * *"
          dense
          outlined
          :type="isPwd ? 'password' : 'text'"
          bg-color="white"
          class="col-12"
          :error="$v.form.password.$error"
          @blur="$v.form.password.$touch"
        >
          <q-icon
            :name="isPwd ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            size="17px"
            slot="append"
            @click="isPwd = !isPwd"
          />
        </q-input>
      </div>

      <div class="col-12 row q-pt-lg">
        <div class="col-12 q-pl-md"> ID </div>
        <q-input
          v-model="form.identification"
          placeholder="123456789"
          dense
          outlined
          bg-color="white"
          class="col-12"
          :error="$v.form.identification.$error"
          @blur="$v.form.identification.$touch"
        />
      </div>

      <div class="col-12 row q-pt-lg">
        <div class="col-12 q-pl-md"> Mail </div>
        <q-input
          v-model="form.email"
          placeholder="example@gmail.com"
          dense
          type="email"
          outlined
          bg-color="white"
          class="col-12"
          :error="$v.form.email.$error"
          @blur="$v.form.email.$touch"
        />
      </div>

      <div class="col-12 row q-pt-lg">
        <div class="col-12 q-pl-md"> Country </div>
        <q-select
          v-model="form.country_id"
          dense
          :options="countries"
          outlined
          bg-color="white"
          class="col-12"
          :error="$v.form.country_id.$error"
          @blur="$v.form.country_id.$touch"
        />
      </div>

      <div class="col-12 row q-pt-lg">
        <div class="col-12 q-pl-md"> City / Town </div>
        <q-select
          v-model="form.city_id"
          dense
          :options="cities"
          outlined
          bg-color="white"
          class="col-12"
          :error="$v.form.city_id.$error"
          @blur="$v.form.city_id.$touch"
        />
      </div>

      <div class="col-12 row q-pt-lg">
        <div class="col-12 q-pl-md"> Address </div>
        <q-input
          v-model="form.address"
          dense
          outlined
          bg-color="white"
          class="col-12"
          type="textarea"
          placeholder="Your Adress #1-02"
          :error="$v.form.address.$error"
          @blur="$v.form.address.$touch"
        />
      </div>

      <div class="col-12 row justify-center q-pt-lg">
        <q-btn
          @click="save"
          label="Create"
          color="primary"
          class="col-6"
          rounded
        />
      </div>

    </div>
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
      form: {
        userName: null,
        birthdate: null,
        password: null,
        identification: null,
        email: null,
        country_id: null,
        city_id: null,
        address: null
      },
      image: null,
      imageUrl: null,
      isPwd: false,
      cities: [],
      countries: []
    }
  },
  validations () {
    return {
      form: {
        userName: { required },
        birthdate: { required },
        password: { required },
        identification: { required },
        email: { required },
        country_id: { required },
        city_id: { required },
        address: { required }
      }
    }
  },
  methods: {
    async saveTwo () {
      this.$v.$touch()
      if (this.$v.$invalid) return

      const formData = new FormData()
      formData.append('userName', this.form.userName)
      formData.append('birthdate', this.form.birthdate)
      formData.append('password', this.form.password)
      formData.append('identification', this.form.identification)
      formData.append('email', this.form.email)
      formData.append('country', this.form.country)
      formData.append('city', this.form.city)
      formData.append('address', this.form.address)
      formData.append('image', this.image)

      this.$q.loading.show()
      await this.$api.post('customers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.$q.loading.hide()
        console.log(res)
        if (res) {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            message: 'Customers added successfully'
          })
          this.afterSave()
        }
      }).catch((err) => {
        console.log(err, 'error')
      })
    },
    afterSave () {
      this.$emit('recordSave')
    },
    openProxy () {
      const pop = this.$refs.qDateProxy
      console.log(pop.target, 'openProxy')
      pop.show()
    },
    onFileInput () {
      this.imageUrl = URL.createObjectURL(this.image)
    }
  }

}
</script>

<style lang="scss" scoped>
.styled-border {
  border-radius: 50%;
  width: 93%;
  height: 93%;
  background-color: #ffffff;
}
.styled-avatar {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(245, 245, 245, 0.685);
  border: 1px solid #ffffff;
}

.btn-edit-style {
  position: absolute;
  bottom: 0;
  right: 0px;
}

</style>
