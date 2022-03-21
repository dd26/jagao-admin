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
        <div class="col-12 text-center text-primary q-pt-md" style="font-size: 28px; font-weight: 700;">Add Service</div>
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
                placeholder="Service"
                dense
                outlined
                bg-color="white"
                class="full-width"
                :error="$v.form.name.$error"
                @blur="$v.form.name.$touch"
              />
            </div>
            <div class="col-12 q-pt-lg">
              <q-input
                v-model.number="form.price"
                placeholder="Price"
                type="number"
                dense
                outlined
                bg-color="white"
                class="full-width"
                :error="$v.form.price.$error"
                @blur="$v.form.price.$touch"
              />
            </div>
          </div>
        </section>

        <div class="col-12 q-px-lg">
          <q-input
            v-model="form.description"
            placeholder="Description"
            dense
            outlined
            type="textarea"
            bg-color="white"
            class="full-width"
            :error="$v.form.description.$error"
            @blur="$v.form.description.$touch"
            />
        </div>

        <div class="col-12 q-px-lg q-pt-lg">
          <q-select
            v-model="form.category_id"
            label="Category"
            dense
            :options="categories"
            outlined
            emit-value
            map-options
            bg-color="white"
            class="full-width"
            :error="$v.form.category_id.$error"
            @blur="$v.form.category_id.$touch"
          />
        </div>

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
import { required } from 'vuelidate/lib/validators'
import { FormMixin } from '../../mixins/Form'
export default {
  mixins: [FormMixin],
  props: ['id'],
  data () {
    return {
      route: 'services',
      form: {
        name: null,
        price: null,
        description: null,
        category_id: null
      },
      categories: [
        { label: 'Categoria 1', value: 1 },
        { label: 'Categoria 2', value: 2 }
      ],
      image: null,
      imageUrl: null
    }
  },
  validations: {
    form: {
      name: { required },
      price: { required },
      description: { required },
      category_id: { required }
    }
  },
  mounted () {
    if (this.id) {
      this.imageUrl = this.$api_url() + 'image/services/' + this.id
    }
  },
  methods: {
    onFileInput () {
      this.imageUrl = URL.createObjectURL(this.image)
      if (this.id) {
        const formData = new FormData()
        formData.append('image', this.image)
        this.$api.post(`image/services/${this.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res, 'res')
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
      const formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('price', this.form.price)
      formData.append('description', this.form.description)
      formData.append('category_id', this.form.category_id)
      formData.append('image', this.image)
      this.$q.loading.show()
      await this.$api.post('services', formData, {
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
            message: 'Service added successfully'
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
