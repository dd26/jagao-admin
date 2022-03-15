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
                  v-if="!image"
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
              />
            </div>
            <div class="col-12 q-pt-lg">
              <q-input
                v-model.number="form.price"
                placeholder="Service"
                type="number"
                dense
                outlined
                bg-color="white"
                class="full-width"
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
            />
        </div>

        <div class="col-12 q-px-lg q-pt-lg">
          <q-select
            v-model="form.category"
            label="Category"
            dense
            outlined
            bg-color="white"
            class="full-width"
          />
        </div>

        <div class="col-12 q-px-lg q-pt-lg row q-pb-lg">
          <q-btn
            @click="save"
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
export default {
  props: ['id'],
  data () {
    return {
      form: {
        name: null,
        price: null,
        description: null,
        category: null
      },
      categories: [],
      image: null,
      imageUrl: null
    }
  },
  methods: {
    save () {
      console.log('save')
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
