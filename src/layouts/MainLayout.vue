<template>
  <q-layout view="hHh Lpr lFr">
    <q-header>
      <q-toolbar class="row justify-between">
        <div class="row items-center q-gutter-x-xs q-pl-lg">
          <img src="logos/logo3.svg" alt="ser1" height="30px">
          <img src="logos/logo4.svg" alt="ser1" height="20px" width="40px" style="object-fit: contain;">
        </div>

        <q-btn
          flat
          round
          dense
          to="/"
        >
          <q-avatar size="26px">
            <img src="vectors/avatar1.svg" />
          </q-avatar>
          <q-badge rounded color="green" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-style="background: #D9F2EE;"
    >
      <section class="column full-height">
        <div class="col-10">
          <div class="row q-pt-lg">
            <div class="col-12 row justify-center q-pt-xl">
              <q-avatar size="100px">
                <img src="vectors/avatar1.svg" alt="">
              </q-avatar>
            </div>

            <div class="col-12 q-pl-xl">
              <div class="text-primary text-start q-pt-sm" style="font-weight: 700; font-size: 20px;">Isabel Summerton</div>
              <div class="text-start q-pt-sm" style="font-weight: 500; font-size: 14px; color: #B3B3B3; line-height: 5px;">Isabel Summerton</div>
            </div>

            <section class="col-12 row justify-center q-pt-xl">
              <q-list class="col-12 q-px-lg">
                <EssentialLink
                  v-for="link in essentialLinks"
                  :key="link.title"
                  v-bind="link"
                />
              </q-list>
            </section>
          </div>
        </div>
        <div class="col-2">
          <div class="row items-end">
            <div class="col-12 row justify-center">
              <q-btn
                flat
                round
                dense
                to="/"
                style="color: #7DBA47"
                label="Log Out"
                class="col-9"
                no-caps
                icon="img:vectors/logout2.svg"
              />
            </div>
            <div class="col-12 row justify-center q-pt-sm">
              <q-btn
                flat
                round
                dense
                to="/"
                color="black"
                label="Settings"
                class="col-9"
                no-caps
                icon="img:vectors/setting1.svg"
              />
            </div>
          </div>
        </div>
      </section>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Home',
    icon: 'img:vectors/home3.svg',
    link: '/home'
  },
  {
    title: 'Account',
    icon: 'img:vectors/person1.svg',
    link: '/home'
  },
  {
    title: 'Services',
    icon: 'img:vectors/clean2.svg',
    link: '/home'
  },
  {
    title: 'Customers',
    icon: 'img:vectors/cora1.svg',
    link: '/home'
  },
  {
    title: 'Payments',
    icon: 'img:vectors/dollar1.svg',
    link: '/home'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
