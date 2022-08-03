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
        <div class="col-12">
          <div class="row q-pt-lg">
            <div class="col-12 row justify-center q-pt-xl">
              <q-avatar size="100px">
                <img src="vectors/avatar1.svg" alt="">
              </q-avatar>
            </div>

            <div class="col-12 q-pl-xl">
              <div class="text-primary text-start q-pt-sm" style="font-weight: 700; font-size: 20px;">{{UserInfo.name}}</div>
              <div
                class="text-start q-pt-sm"
                style="font-weight: 500; font-size: 14px; color: #B3B3B3; line-height: 5px;"
              > {{UserInfo.role_id === 4 ? 'Usuario de Soporte' : 'Administrador'}} </div>
            </div>

            <section class="col-12 row justify-center q-pt-xl">
              <q-list class="col-12 q-px-lg">
                <EssentialLink
                  v-for="link in essentialLinks"
                  :key="link.permission"
                  v-bind="link"
                />
              </q-list>
            </section>
          </div>
          <div class="row items-center justify-start col-12 q-pt-xl">
            <div
              @click="confirmLogout"
              class="col-12 row justify-center items-center q-gutter-x-md"
              style="position: relative"
              v-ripple
              clickable
            >
              <q-icon
                name="img:vectors/logout3.svg"
                class="q-pa-sm bg-secondary"
                style="border-radius: 50%"
                size="xs"
              />
              <div class="text-secondary" style="font-weight: 600; font-size: 20px;">Cerrar Sesion</div>
            </div>
            <!-- <div class="col-12 row justify-center q-pt-sm">
              <div
                class="col-12 row justify-center items-center q-gutter-x-md"
                style="position: relative"
                v-ripple
                clickable
              >
                <q-icon
                  name="img:vectors/setting3.svg"
                  class="q-pa-sm bg-black"
                  style="border-radius: 50%"
                  size="xs"
                />
                <div class="text-black" style="font-weight: 600; font-size: 20px;">Configuracion</div>
              </div>
            </div> -->
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
import { mapGetters, mapMutations } from 'vuex'
const linksData = [
  {
    title: 'Inicio',
    icon: 'img:vectors/home4.svg',
    link: '/home',
    permission: 'home-admin'
  },
  {
    title: 'Inicio',
    icon: 'img:vectors/home4.svg',
    link: '/home',
    permission: 'home-soporte'
  },
  {
    title: 'Usuarios',
    icon: 'person',
    link: '/users',
    hasVector: false,
    permission: 'module-users-admin'
  },
  {
    title: 'Servicios',
    icon: 'img:vectors/clean4.svg',
    link: '/services',
    permission: 'module-services-admin'
  },
  {
    title: 'Categorias',
    icon: 'img:vectors/categorie1.svg',
    link: '/categories',
    permission: 'module-categories-admin'
  },
  {
    title: 'Clientes',
    icon: 'img:vectors/cora2.svg',
    link: '/customers',
    permission: 'module-customers-admin'
  },
  {
    title: 'Especialistas',
    icon: 'img:vectors/specialist1.svg',
    link: '/specialist',
    permission: 'module-specialist-admin'
  },
  {
    title: 'Cupones',
    icon: 'img:vectors/cupon1.svg',
    link: '/coupons',
    permission: 'module-coupons-admin'
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
  },
  computed: {
    ...mapGetters('generals', ['UserInfo'])
  },
  methods: {
    ...mapMutations('generals', ['logout']),
    mLogout () {
      this.logout()
      this.$router.push('/login')
    },
    async confirmLogout () {
      this.$q.dialog({
        title: 'Confirmacion!',
        message: 'Esta seguro que desea cerrar la sesion?',
        cancel: {
          label: 'No',
          outline: true
        },
        persistent: true,
        ok: {
          label: 'Si',
          color: 'negative'
        }
      }).onOk(() => {
        this.mLogout()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
