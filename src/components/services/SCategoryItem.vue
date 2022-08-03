<template>
  <q-item>
    <q-item-section>
      <q-item-label class="text-primary text-h6 text-bold">Servicios</q-item-label>
      <q-item-label class="q-pl-md" caption>
        <li v-for="n in detail_request_service" :key="n.id" class="q-pt-xs">
          {{n.service_name}}
        </li>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['detail_request_service', 'category_name', 'category_id']
}
</script>

<style lang="scss" scoped>

.q-item {
  background-color: #D9F2EE;
  border-radius: 12px;
}

</style>
