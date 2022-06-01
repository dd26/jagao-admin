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
        <div class="col-12 text-center text-primary q-pt-md" style="font-size: 28px; font-weight: 700;">Add Sub-Category</div>
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
                placeholder="Sub-Category name"
                dense
                outlined
                bg-color="white"
                class="full-width"
                :error="$v.form.name.$error"
                @blur="$v.form.name.$touch"
              />
            </div>
            <div class="col-12 row">
              <q-input
                v-model="form.description"
                placeholder="Sub-Category description"
                dense
                outlined
                bg-color="white"
                class="col-12"
                type="textarea"
              />
            </div>

            <div class="col-12 row q-pt-md">
              <q-select
                v-model="form.category_id"
                label="Category"
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

            <div class="col-12">
              <q-input
                v-model.number="form.price"
                placeholder="Price"
                dense
                type="number"
                outlined
                bg-color="white"
                class="full-width"
                :error="$v.form.price.$error"
                @blur="$v.form.price.$touch"
              />
            </div>

            <div class="col-12 row q-pt-md">
              <q-checkbox
                v-model="form.hasDocument"
                dense
                label="do you need documentation?"
                keep-color
                color="primary"
                class="text-primary"
              />
            </div>
          </div>
        </section>

        <div class="col-12 q-px-lg q-pt-lg row q-pb-lg">
          <q-btn
            @click="!id ? saveTwo() : save()"
            color="primary"
            label="Add"
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
        hasDocument: false,
        category_id: null,
        price: 0
      },
      image: null,
      imageUrl: null,
      opCategories: []
    }
  },
  validations: {
    form: {
      name: { required },
      category_id: { required },
      price: { required, minValue: minValue(0) }
    }
  },
  mounted () {
    if (this.id) {
      this.imageUrl = this.$api_url() + 'image/subcategories/' + this.id
    }
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$api.get('categories').then(res => {
        if (res) {
          this.opCategories = res
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
      formData.append('category_id', this.form.category_id)
      formData.append('price', this.form.price)
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
