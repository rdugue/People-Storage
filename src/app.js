import Vue from 'vue'

const mHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})


const api_url = 'https://mgf17i42jh.execute-api.us-east-1.amazonaws.com/dev/people'

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
    template: `
        <form v-if="show" class="w3-panel w3-white w3-card-2 w3-display-container">
            <p><input v-model="first_name" class="w3-input" type="text" placeholder="First name"></p>
            <p><input v-model="last_name" class="w3-input" type="text" placeholder="Last name"></p>
            <p><input v-model="birthdate" class="w3-input" type="date"></p>
            <p><input v-model="phone_number" class="w3-input" type="text" placeholder="Phone"></p>
            <p><input v-model="zip_code" class="w3-input" type="text" placeholder="Zip code"></p>
            <p></p><button v-on:click="edit" class="w3-button w3-black">Submit</button></p>
        </form>
        <div v-else-if="!show" class="w3-panel w3-white w3-card-2 w3-display-container">
            <span v-on:click="remove" class="w3-display-topright w3-padding w3-hover-red">X</span>
            <p class="w3-text-blue"><b>{{ fullName }}</b></p>
            <p>{{ birthdate }}</p>
            <p>{{ phone_number }}</p>
            <p>{{ zip_code }}</p>
            <p></p><button v-on:click="show = !show" class="w3-button w3-black">Edit</button></p>
        </div>`,
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
        edit: function() {
            let put = {
                headers: mHeaders,
                method: 'PUT',
                mode: 'cors'
            }
            fetch(api_url+'/'+this.id, put)
            .then((response) => {
                return response.json()
            })
            .then((json) => { this.show = !this.show })
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
    template: `
        <form class="w3-panel w3-white w3-card-2 w3-display-container">
            <p><input v-model="first_name" class="w3-input" type="text" placeholder="First name"></p>
            <p><input v-model="last_name" class="w3-input" type="text" placeholder="Last name"></p>
            <p><input v-model="birthdate" class="w3-input" type="date"></p>
            <p><input v-model="phone_number" class="w3-input" type="text" placeholder="Phone"></p>
            <p><input v-model="zip_code" class="w3-input" type="text" placeholder="Zip code"></p>
            <p></p><button v-on:click="create" class="w3-button w3-black">Submit</button></p>
        </form>`,
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
      create: function() {
            let post = new XMLHttpRequest()
            post.onreadystatechange = function() {
                if (this.status === 200) {
                    app.list()
                }
            }
            post.open('POST', api_url, true)
            post.setRequestHeader('Content-Type', 'application/json')
            post.send(this.$data)
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