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
        </div>`
})

Vue.component('person-card', {
    props: ['person'],
    template: `
        <div class="w3-panel w3-white w3-card-2 w3-display-container">
            <span v-on:click="remove" class="w3-display-topright w3-padding w3-hover-red">X</span>
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
        remove: function() {
            let del = {
                headers: mHeaders,
                method: 'DELETE',
                mode: 'cors',
            }
            fetch(api_url+'/'+this.id, del)
            .then((response) => {
                app.list()
            })
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