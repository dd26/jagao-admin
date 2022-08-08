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
        <div class="col-12 text-center text-primary q-pt-md" style="font-size: 28px; font-weight: 700;">Usuario Soporte</div>
      </div>

      <section class="col-12 row">
        <div class="row col-4 justify-center items-center q-pt-md">
          <section class="col-12 row items-center justify-center styled-avatar">
            <div class="styled-border row justify-center items-center">
              <q-icon
                v-if="!image && !id"
                name="img:vectors/person3.svg"
                size="70px"
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
        <div class="row col q-px-lg">
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
                  placeholder="*******"
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
        </div>

        <div class="col-12 q-px-lg q-pt-lg row q-pb-lg">
          <q-btn
            @click="!id ? saveTwo() : save()"
            color="primary"
            label="Guardar cambios"
            dense
            outlined
            class="col-12"
            rounded
            no-caps
          />
        </div>
      </section>
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
      isPwd: true,
      image: null,
      imageUrl: null
    }
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required }
    }
  },
  mounted () {
    if (this.id) {
      this.imageUrl = this.$api_url() + 'image/users_admin/' + this.id
    }
  },
  methods: {
    onFileInput () {
      this.imageUrl = URL.createObjectURL(this.image)
      if (this.id) {
        const formData = new FormData()
        formData.append('image', this.image)
        this.$api.post(`image/users_admin/${this.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res, 'res')
          if (res.success) {
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              message: 'Imagen actualizada'
            })
          }
        })
      }
    },
    afterSave () {
      this.$emit('recordSave')
    },
    async saveTwo () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('email', this.form.email)
      formData.append('password', this.form.password)
      formData.append('image', this.image)
      this.$q.loading.show()
      await this.$api.post(this.route, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.$q.loading.hide()
        console.log(res)
        if (res) {
          this.afterSave()
        }
      }).catch((err) => {
        console.log(err, 'error')
      })
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
