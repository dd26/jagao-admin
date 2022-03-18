import { Loading } from 'quasar'
export const FormMixin = {
  data () {
    return {
      insert: true
    }
  },
  async mounted () {
    if (typeof this.beforeMounted === 'function') {
      this.beforeMounted()
    }
    console.log(this.id, 'id')
    if (this.id) {
      await this.getRecord()
      this.insert = false
    }
    if (typeof this.afterMounted === 'function') {
      this.afterMounted()
    }
  },
  methods: {
    async getRecord () {
      Loading.show()
      await this.$api.get(`${this.route}/${this.id}`).then(res => {
        this.form = res
        if (typeof this.afterGetRecord === 'function') {
          this.afterGetRecord(res)
        }
        Loading.hide()
      })
    },
    save () {
      if (typeof this.beforeValidate === 'function') {
        this.beforeValidate()
      }
      this.$v.form.$touch()
      if (typeof this.afterValidate === 'function') {
        this.afterValidate()
      }
      console.log('save', this.$v.form, this.form, 'form')
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        if (typeof this.beforeSave === 'function') {
          this.beforeSave()
        }
        if (this.insert) { // modo inserción
          this.$api.post(this.route, this.form).then(res => {
            this.$q.loading.hide()
            if (res) {
              if (typeof this.afterSave === 'function') {
                this.afterSave(res)
              }
              if (this.stayAfterSave) {
                this.$router.go(-1)
              }
            }
          })
        } else {
          this.$api.put(`${this.route}/${this.id}`, this.form).then(res => {
            this.$q.loading.hide()
            if (res) {
              if (typeof this.afterSave === 'function') {
                this.afterSave(res)
              }
              this.$q.notify({
                type: 'positive',
                message: 'registry modified successfully'
              })
              if (this.stayAfterSave) {
                this.$router.go(-1)
              }
            }
          })
        }
      }
    }
  },

  created () {
  }
}
