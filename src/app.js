import Vue from 'vue'

const mHeaders = new Headers({
    'Content-Type': 'application/json'
})


const api_url = 'https://mgf17i42jh.execute-api.us-east-1.amazonaws.com/dev/people'

Vue.component('app-bar', {
    template: `
        <div class="w3-bar w3-large w3-theme-d4">
            <span class="w3-bar-item">People Storage</span>
        </div>`
})

Vue.component('person-card', {
    props: ['person'],
    template: `
        <div class="w3-panel w3-white w3-card-2 w3-display-container">
            <span class="w3-display-topright w3-padding w3-hover-red">X</span>
            <p class="w3-text-blue"><b>{{ fullName }}</b></p>
            <p>{{ birthdate }}</p>
            <p>{{ phone_number }}</p>
            <p>{{ zip_code }}</p>
            <p></p><button class="w3-button w3-black">Edit</button></p>
        </div>`,
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
        edit: function(person) {},
        delete: function() {}
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
        <form class="w3-container w3-card-2">
            <p><label>First name</label></p>
            <p></p><input v-model="first_name" class="w3-input" type="text"></p>
            <p><label>Last name</label></p>
            <p></p><input v-model="last_name" class="w3-input" type="text"></p>
            <p><label>Birthdate</label></p>
            <p></p><input v-model="birthdate" class="w3-input" type="date"></p>
            <p><label>Phone number</label></p>
            <p></p><input v-model="phone_number" class="w3-input" type="tel"></p>
            <p><label>Zip code</label></p>
            <p></p><input v-model="zip_code" class="w3-input" type="text"></p>
            <p><button v-on:click="create" class="w3-button w3-black">Submit</button></p>
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
            let post = {
                headers: mHeaders,
                method: 'POST',
                mode: 'cors',
                body: this.$data
            }
            alert(JSON.stringify(post))
            fetch(api_url, post)
            .then(function(response) {
                return response.json()
            })
            .then(function(person) {
                this.$dispatch('create', person)
            })
      }
    }
})

const app = new Vue({
  el: '#app',
  data: {
    people: [
        {
            id: '0001',
            first_name: "Ralph",
            last_name: "Dugue",
            birthdate: "August 24, 1989",
            phone_number: "850-867-5309",
            zip_code: "12345"
        }
    ]
  },
  events: {
      'create': function(person) {
          this.people.push(person)
      }
  },
  methods: {
      list: function() {
          let get = {
                headers: mHeaders,
                method: 'GET',
                mode: 'cors'
            }
            alert(JSON.stringify(post))
            fetch(api_url, post)
            .then(function(response) {
                return response.json()
            })
            .then(function(persons) {
                this.people = persons
            })
      }
  }
})