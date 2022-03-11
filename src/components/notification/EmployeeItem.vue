<template>
  <section class="row">
    <div class="col-12" style="font-size: 12px; font-weight: 400; color: #B3B3B3">15m ago</div>
    <div class="row items-start q-col-gutter-x-md">
      <div class="column col-9">
        <div>A customer is requesting a service near you.</div>
        <q-expansion-item
          expand-separator
          label="See required services"
          :header-class="item === 1 ? 'text-grey-5' : 'text-primary'"
          :disable="item === 1"
          style="font-weight: 700; font-size: 13px; padding: 0 !important"
          expand-icon-class="text-primary"
        >
          <q-card class="q-pl-xl" style="font-weight: 400;">
            <li>Kitchen cleaning </li>
            <li>Room cleaning</li>
            <li>Garage cleaning</li>
            <li>Wondow cleaning</li>
            <q-card-actions align="center" class="row" style="padding-top: 10px !important">
              <q-btn
                label="Decline"
                outline
                dense
                class="col-6 q-py-xs"
                size="md"
                color="primary"
                no-caps
              />
              <q-btn
                label="Acept"
                dense
                no-caps
                class="col-5 q-py-xs q-px-sm"
                size="md"
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </q-expansion-item>
        <div v-if="item === 1" class="row items-center text-negative">
          <div class="col-1">
            <q-icon name="close" color="negative" size="sm" />
          </div>
          <div class="col-11 q-pl-sm">You declined the request for services.</div>
        </div>
      </div>
      <div class="col-3">
        <q-avatar>
          <img src="vectors/avatar3.svg" />
        </q-avatar>
      </div>
    </div>
    <q-separator class="col-12 q-mt-md bg-grey-5" style="height: 0.01em;" />
  </section>
</template>

<script>
export default {
  props: ['item']
}
</script>
