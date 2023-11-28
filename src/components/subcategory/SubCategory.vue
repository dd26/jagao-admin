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
        <div class="col-12 text-center text-primary q-pt-md" style="font-size: 28px; font-weight: 700;">
          <span v-if="id">Editar Servicio</span>
          <span v-else>Agregar Servicio</span>
        </div>
      </div>

      <div class="row q-px-lg">
        <section class="row col-12 q-pa-lg">
          <div class="col-12 row items-center justify-center">
            <section class="row items-center justify-center styled-avatar">
              <div class="styled-border row justify-center items-center">
                <q-icon
                  v-if="!image && !id"
                  name="img:vectors/gps1.svg"
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
          <div class="col-12 q-pt-md  row items-center justify-center">
            <q-select
                  v-model="form.category_id"
                  label="Categoría"
                  dense
                  outlined
                  bg-color="white"
                  class="col-12"
                  :options="opCategories"
                  option-value="id"
                  option-label="name"
                  map-options
                  emit-value
                  :error="$v.form.category_id.$error"
                  @blur="$v.form.category_id.$touch"
                />
          </div>

          <div class="col-6 q-pt-md row">
            <section>
              <div class="col-12">
                <q-input
                  v-model.number="form.price"
                  placeholder="Precio"
                  dense
                  :min="0"
                  type="number"
                  outlined
                  bg-color="white"
                  class="full-width"
                  :error="$v.form.price.$error"
                  @blur="$v.form.price.$touch"
                />
              </div>
            </section>
          </div>

          <div class="col-6 q-pl-md q-pt-md row">

            <div class="col-12">
              <q-input
                v-model="form.name"
                placeholder="Nombre del servicio"
                dense
                outlined
                bg-color="white"
                class="full-width"
                :error="$v.form.name.$error"
                @blur="$v.form.name.$touch"
              />
            </div>
          </div>

          <div class="col-12 q-pt-md row items-center justify-center">
            <div class="col-12">
              <q-input
                v-model="form.description"
                placeholder="Descripción"
                dense
                outlined
                bg-color="white"
                class="col-12"
                type="textarea"
              />
            </div>
          </div>

          <div class="col-12  q-pt-md">
            <section>

              <div class="col-12 row">
                  <q-checkbox
                    v-model="form.has_document"
                    dense
                    label="¿Necesitas documentación?"
                    keep-color
                    color="primary"
                    class="text-primary"
                  />

              </div>

              <div class="col-12 q-pt-md row items-center" >

                <span :class="typeComisionColor">Tipo de comisión:</span>
                <q-option-group
                  :options="optionsComisionType"
                  type="radio"
                  v-model="form.comision_is_porcentage"
                  inline
                  :class="typeComisionColor"
                  :error="$v.form.comision_is_porcentage.$error"
                  @blur="$v.form.comision_is_porcentage.$touch"
                  @input="showComisionInputs"
                />
              </div>
            </section>
          </div>
          <div class="col-12 row" v-if="showComisionSlider == false">
                <div class="col-6 q-pt-md">
                  <q-input
                    v-model.number="form.comision_app"
                    placeholder="Comisión de la Aplicación"
                    dense
                    type="number"
                    :min="0"
                    outlined
                    bg-color="white"
                    class="full-width"
                    :error="$v.form.comision_app.$error"
                    @blur="$v.form.comision_app.$touch"
                  />
                </div>
                <div class="col-6 q-pt-md q-pl-md">
                  <q-input
                    v-model.number="form.comision_espcialist"
                    placeholder="Comisión del especialista"
                    dense
                    type="number"
                    :min="0"
                    outlined
                    bg-color="white"
                    class="full-width"
                    :error="$v.form.comision_espcialist.$error"
                    @blur="$v.form.comision_espcialist.$touch"
                  />
                </div>
              </div>
              <div class="col-12 row" style="padding-top: 22px;" v-if="showComisionSlider == true">
                <div class="col-6 q-pr-md">
                  <q-slider
                    v-model="form.comision_app"
                    :min="0"
                    :max="100"
                    :step="1"
                    label
                    :label-value="'Comisión de app '+form.comision_app + ' %'"
                    label-always
                    color="primary"
                    @change="changeComision"
                  />
                </div>

                <div class="col-6  q-pl-md">
                  <q-slider
                    v-model="form.comision_espcialist"
                    :min="0"
                    :max="100"
                    :step="1"
                    label
                    :label-value="'Comisión del especialista '+form.comision_espcialist + ' %'"
                    label-always
                    color="primary"
                    @change="changeComisionApp"
                  />
                </div>
              </div>

        </section>

        <div class="col-12 q-px-lg q-pt-lg row q-pb-lg">
          <q-btn
            @click="saveForm"
            color="primary"
            :label="!id ? 'Agregar':'Editar'"
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
// importar vuelidate
import { required, minValue } from 'vuelidate/lib/validators'
import { FormMixin } from '../../mixins/Form'
export default {
  mixins: [FormMixin],
  props: ['id'],
  data () {
    return {
      route: 'subcategories',
      form: {
        name: null,
        description: '',
        has_document: false,
        comision_is_porcentage: null,
        category_id: null,
        price: null,
        comision_app: null,
        comision_espcialist: null
      },
      image: null,
      imageUrl: null,
      opCategories: [],
      showComisionSlider: null,
      typeComisionColor: 'text-primary',
      optionsComisionType: [
        { label: 'Porcentaje', value: true },
        { label: 'Absoluta', value: false }
      ]
    }
  },
  validations: {
    form: {
      name: { required },
      category_id: { required },
      price: { required, minValue: minValue(0) },
      comision_is_porcentage: { required },
      comision_app: { required, minValue: minValue(0) },
      comision_espcialist: { required, minValue: minValue(0) }
    }
  },
  async mounted () {
    if (this.id) {
      this.imageUrl = this.$api_url() + 'image/subcategories/' + this.id
      await this.$api.get(`${this.route}/${this.id}`).then(res => {
        this.form = res
        if (this.form.comision_is_porcentage) {
          this.showComisionSlider = true
        } else {
          this.showComisionSlider = false
        }
      })
    }
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$api.get('categories').then(res => {
        if (res) {
          this.opCategories = res
          this.opCategories = this.opCategories.filter(item => item.is_parent !== true)
        }
      })
    },
    onFileInput () {
      this.imageUrl = URL.createObjectURL(this.image)
      if (this.id) {
        const formData = new FormData()
        formData.append('image', this.image)
        this.$api.post(`image/${this.route}/${this.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.success) {
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              message: 'Image updated'
            })
          }
        })
      }
    },
    afterSave () {
      this.$emit('recordSave')
    },
    async saveTwo () {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch()
        return
      }
      const formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('description', this.form.description)
      formData.append('has_document', this.form.hasDocument ? 1 : 0)
      formData.append('comision_is_porcentage', this.form.comision_is_porcentage ? 1 : 0)
      formData.append('category_id', this.form.category_id)
      formData.append('price', this.form.price)
      formData.append('comision_app', this.form.comision_app)
      formData.append('comision_espcialist', this.form.comision_espcialist)
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
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            message: 'Category added successfully'
          })
          this.afterSave()
        }
      }).catch((err) => {
        console.log(err, 'error')
      })
    },
    changeComision () {
      this.form.comision_espcialist = 100 - this.form.comision_app
    },
    changeComisionApp () {
      this.form.comision_app = 100 - this.form.comision_espcialist
    },
    showComisionInputs (value, evt) {
      this.typeComisionColor = 'text-primary'
      if (this.showComisionSlider === null) {
        this.form.comision_app = 0
        this.form.comision_espcialist = 100
      }
      if (this.form.comision_is_porcentage) {
        this.form.comision_app = 0
        this.form.comision_espcialist = 100
        this.showComisionSlider = true
      } else {
        this.form.comision_app = null
        this.form.comision_espcialist = null
        this.showComisionSlider = false
      }
    },
    saveForm () {
      this.save()
      this.checkComisionIsPorcentage()
    },
    checkComisionIsPorcentage () {
      if (this.$v.form.comision_is_porcentage.$error) {
        this.typeComisionColor = 'text-negative'
      } else {
        this.typeComisionColor = 'text-primary'
      }
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

.description-field {
  height: 112px;
}

.category-top{
  padding-top: 20px;
}

:deep(.q-textarea.q-field--dense .q-field__control, .q-textarea.q-field--dense .q-field__native){
  height: 112px
}

:deep(.q-field--with-bottom){
  padding-bottom: 0px;
}
</style>
