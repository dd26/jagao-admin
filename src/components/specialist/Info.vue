<template>
  <q-card style="min-width: 600px; border-radius: 12px">
    <q-card-section class="bg-primary text-white row">
      <div class="col-12 row justify-end">
        <q-btn
          rounded
          color="white"
          text-color="negative"
          v-close-popup
          dense
          icon="close"
        />
      </div>

      <div class="col-12 row justify-center">
        <div style="border: 4px solid white; border-radius: 50%">
          <q-avatar size="90px">
            <img
              src="vectors/avatar3.svg"
              style="width: 100%; height: 100%;"
            />
          </q-avatar>
        </div>
        <div class="col-12 text-center q-pt-sm" style="font-size: 16px; font-weight: 700;">Isabel Summerton</div>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col-12 justify-between row text-primary" style="font-weight: 500; font-size: 16px;">
        <div>Last service: Yesterday</div>
        <div>Member since: 2022</div>
      </div>
      <hr class="col-12" style="border-top: 1px solid #00A58D;" />

      <section class="col-12 row">
        <div class="col-8 row">
          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Fullname:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">Isabel Summerton</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Birth Date:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">26/09/1999</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">ID:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">123456789</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">City/ Town:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">Florida</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Adress:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">Your adress 123-2</div>
          </div>

          <div class="col-12 row q-pt-sm">
            <div class="col-12" style="font-size: 12px; font-weight: 600; color: #B3B3B3">Mail:</div>
            <div class="col-12" style="font-size: 12px; font-weight: 500;">Example123@mail.com</div>
          </div>
        </div>

        <div class="row items-end col-4">
          <section class="col-12">
            <q-card class="bg-primary row text-white q-pa-sm q-px-md" style="border-radius: 12px;">
              <div class="col-4 row items-center">
                <q-icon name="img:vectors/accept2.svg" size="lg" />
              </div>
              <div class="col-8 row">
                <section class="row col-12 items-between">
                  <div class="text-right col-12" style="font-weight: 600; font-size: 10px;">Completed services</div>
                  <br>
                  <div class="text-right col-12" style="font-size: 24px; font-weight: 600;">15</div>
                </section>
              </div>
            </q-card>

            <q-card class="bg-secondary row text-white q-pa-sm q-px-md q-mt-sm" style="border-radius: 12px;">
              <div class="col-4 row items-center">
                <q-icon name="img:vectors/setting2.svg" size="lg" />
              </div>
              <div class="col-8 row">
                <section class="row col-12 items-between">
                  <div class="text-right col-12" style="font-weight: 600; font-size: 10px;">Active Services</div>
                  <br>
                  <div class="text-right col-12" style="font-size: 24px; font-weight: 600;">0</div>
                </section>
              </div>
            </q-card>

            <q-card class="bg-accent row text-white q-pa-sm q-px-md q-py-md q-mt-sm" style="border-radius: 12px;">
              <div class="col-4 row items-center">
                <q-icon name="img:vectors/down1.svg" size="lg" />
              </div>
              <div class="col-8 row">
                <section class="row col-12 items-center">
                  <div class="text-primary col-12 text-right">Download CV</div>
                </section>
              </div>
            </q-card>
          </section>
        </div>
      </section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      form: {}
    }
  }
}
</script>

<style>

</style>
