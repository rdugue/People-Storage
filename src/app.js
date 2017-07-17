import Vue from 'vue'
import VeeValidate from 'vee-validate'

const mHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
const api_url = 'https://mgf17i42jh.execute-api.us-east-1.amazonaws.com/dev/people'

Vue.use(VeeValidate)

Vue.component('app-bar', {
    template: `
        <div class="w3-bar w3-large w3-theme-d4">
            <span class="w3-bar-item">People Storage</span>
            <a 
                href="https://github.com/rdugue/People-Storage" 
                class="w3-bar-item w3-button w3-right"><i class="fa fa-github"></i></a>
        </div>`
})

Vue.component('person-card', {
    props: ['person'],
    template: require('./templates/person-card.html'),
    data: function() {
        return {
            id: this.person.id,
            first_name: this.person.first_name,
            last_name: this.person.last_name,
            birthdate: this.person.birthdate,
            phone_number: this.person.phone_number,
            zip_code: this.person.zip_code,
            show: false
        }
    },
    methods: {
        validate: function() {
            this.$validator.validateAll()
            .then(result => result)
        },
        update: function() {
            let body = this.$data
            delete body['show']
            const post = {
                headers: mHeaders,
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(body)
            }
            fetch(api_url, post)
            .then((response) => {
                this.show = false
                app.list()
            })
        },
        remove: function() {
            let del = {
                headers: mHeaders,
                method: 'DELETE',
                mode: 'cors',
            }
            fetch(api_url+'/'+this.id, del)
            .then((response) => { app.list() })
        }
    },
    computed: {
       fullName: function(){
            return this.first_name + ' ' + this.last_name
        } 
    }
})

Vue.component('person-form', {
    props: ['person'],
    template: require('./templates/person-from.html'),
    data: function() {
        return {
            id: this.person.id,
            first_name: this.person.first_name,
            last_name: this.person.last_name,
            birthdate: this.person.birthdate,
            phone_number: this.person.phone_number,
            zip_code: this.person.zip_code
        }
    },
    methods: {
      validate: function() {
          this.$validator.validateAll()
          .then(result => result)
      },
      create: function() {
            let post = {
                headers: mHeaders,
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(this.$data)
            }
            fetch(api_url, post)
            .then((response) => {
                app.list() 
                this.first_name = ''
                this.last_name = ''
                this.birthdate = ''
                this.phone_number = ''
                this.zip_code = ''
            })
      }
    }
})

const app = new Vue({
  el: '#app',
  data: {
    people: []
  },
  methods: {
    list: function() {
        let get = {
            headers: mHeaders,
            method: 'GET',
            mode: 'cors'
        }
        fetch(api_url, get)
        .then((response) => {
            return response.json()
        })
        .then((persons) => {
            this.people = persons
        })
    }
  }
})
app.list()