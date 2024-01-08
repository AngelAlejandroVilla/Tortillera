<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex flex-row-reverse">
        <svg
          @click="$emit('update:is-open', false)"
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 text-red-900 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div class="mt-4">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <div>
                  <img
                    class="mx-auto h-32 w-32 rounded-lg"
                    src="@/assets/images/user.png"
                    alt=""
                  />
                  <div class="mt-5 flex flex-row gap-3">
                    <div v-if="Deliver != null">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Nombre</label
                      >
                      <input
                        type="text"
                        id="nombre"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        v-bind:value="Deliver.Name"
                        required
                      />
                    </div>
                    <div v-if="Deliver != null">
                      <label
                        for="domicilio"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Domicilio</label
                      >
                      <input
                        type="text"
                        id="address"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Deliver.Address"
                        required
                      />
                    </div>
                  </div>
                  <div class="mt-5 flex flex-row gap-3 justify-center">
                    <div v-if="Deliver != null">
                      <label
                        for="numero"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Telefono</label
                      >
                      <input
                        type="text"
                        id="tel"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Deliver.Telefono"
                        required
                      />
                    </div>
                    <div v-if="Deliver != null">
                      <label
                        for="correo"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Correo</label
                      >
                      <input
                        type="text"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Deliver.email"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="editDeliver()"
          class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Listo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    refresh: {
      type: Function,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
  },
  data() {
    const Deliver = null;

    return {
      Deliver,
    };
  },
  created() {
    this.getRepartidor(this.idUser);
  },
  methods: {
    editDeliver() {
      let Post = {
        UserId: this.Deliver.UserId,
        CompanyId: this.$store.state.Company,
        ProfileId: this.Deliver.ProfileId,
        Status: this.Deliver.Status,
        Name: document.getElementById("nombre").value,
        Nickname: this.Deliver.Nickname,
        Password: this.Deliver.Password,
        Telefono: document.getElementById("tel").value,
        email: document.getElementById("email").value,
        Address: document.getElementById("address").value,
      };
      console.log(Post);
      axios
        .post(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/User",
          Post,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Access-Control-Allow-Headers":
                "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
              "Access-Control-Max-Age": "86400",
            },
          }
        )
        .then((result) => {
          console.log(result);
          this.refresh();
          this.$emit("update:is-open", false);
        });
    },
    getRepartidor(id) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/UsersFilter/" +
            this.$store.state.Company +
            "/" +
            "Status='1' and UserId='" +
            id +
            "'"
        )
        .then((result) => {
          this.Deliver = result.data[0];
          console.log(result);
        });
    },
  },
};
</script>
