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
          <span v-if="!id">Agregar categoria de servicio</span>
          <span v-else>Editar categoria de servicio</span>
        </div>
      </div>

      <div class="row q-px-lg">
        <section class="row col-12 items-center q-pa-lg">
          <div class="col-6 row">
            <section class="col-12 row items-center justify-center styled-avatar">
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
          <div class="col-6 row">
            <div class="col-12">
              <q-input
                v-model="form.name"
                placeholder="Nombre Categoria"
                dense
                outlined
                bg-color="white"
                class="full-width"
                :error="$v.form.name.$error"
                @blur="$v.form.name.$touch"
              />
            </div>
            <div v-if="showSelectCategories()"
              class="col-12 q-pt-md  row items-center justify-center">
              <q-select
                    v-model="form.parent_id"
                    label="Categoría"
                    dense
                    outlined
                    bg-color="white"
                    class="col-12"
                    :options="categories"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                  />
            </div>
          </div>
        </section>

        <div class="col-12 q-px-lg q-pt-lg row q-pb-lg">
          <q-btn
            @click="!id ? saveTwo() : save()"
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
import { required } from 'vuelidate/lib/validators'
import { FormMixin } from '../../mixins/Form'
export default {
  mixins: [FormMixin],
  props: ['id'],
  data () {
    return {
      route: 'categories',
      form: {
        name: null,
        parent_id: null
      },
      image: null,
      imageUrl: null,
      opCategories: [],
      categories: [],
      category: {
        name: null,
        is_parent: true
      }
    }
  },
  validations: {
    form: {
      name: { required }
    }
  },
  async mounted () {
    if (this.id) {
      this.imageUrl = this.$api_url() + 'image/categories/' + this.id
      await this.getCategory()
    }
    await this.getCategories()
  },
  methods: {
    getCategory () {
      this.$api.get('categories/' + this.id).then(res => {
        if (res) {
          this.category = res
          console.log(this.category)
        }
      })
    },
    getCategories () {
      this.$api.get('categories').then(res => {
        if (res) {
          this.opCategories = res
          this.opCategories.unshift({
            id: null,
            name: 'Sin categoría padre',
            isParent: null
          })
          if (this.id) {
            this.categories = this.opCategories.filter(item => item.id !== this.id)
          }
          this.categories = this.opCategories.filter(item => item.is_child !== true)
        }
      })
    },
    showSelectCategories () {
      if (!this.id) {
        return true
      } else {
        if (this.category.is_parent) {
          return false
        } else {
          return true
        }
      }
    },
    onFileInput () {
      this.imageUrl = URL.createObjectURL(this.image)
      if (this.id) {
        const formData = new FormData()
        formData.append('image', this.image)
        this.$api.post(`image/categories/${this.id}`, formData, {
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
      formData.append('parent_id', this.form.parent_id)
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

</style>
