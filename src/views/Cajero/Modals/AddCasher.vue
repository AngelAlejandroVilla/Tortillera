<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Agregar Cajero</h3>
        <svg
          @click="cancelOperation()"
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
          <div class="justify-center flex flex-row gap-2">
            <div class="mb-6">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Nombre</label
              >
              <input
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre del repartidor"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Usuario</label
              >
              <input
                type="text"
                id="user"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Usuario"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Domicilio</label
              >

              <input
                type="text"
                id="domicilio"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Domicilio del repartidor"
                required
              />
            </div>
          </div>
          <div class="justify-center flex flex-row gap-2">
            <div class="mb-6">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Correo</label
              >
              <input
                type="text"
                id="correo"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Correo del repartidor"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Número</label
              >
              <input
                type="text"
                id="numero"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Número del repartidor"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="text"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="*****"
                required
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center px-4 py-3 gap-3">
          <div class="flex">
            <button
              @click="addCasher()"
              class="text-center px-4 py-2 hover:border-cyan-200 border border-cyan-400 text-cyan-500 text-base font-medium rounded-md w-52 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Enviar
            </button>
          </div>
        </div>
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
  },
  methods: {
    cancelOperation() {
      document.getElementById("name").value = "";
      document.getElementById("user").value = "";
      document.getElementById("password").value = "";
      document.getElementById("domicilio").value = "";
      document.getElementById("numero").value = "";
      document.getElementById("correo").value = "";
      this.$emit("update:is-open", false);
    },
    addCasher() {
      let params = {
        ProfileId: 2,
        Name: document.getElementById("name").value,
        Nickname: document.getElementById("user").value,
        Password: document.getElementById("password").value,
        Address: document.getElementById("domicilio").value,
        Telefono: document.getElementById("numero").value,
        email: document.getElementById("correo").value,
        CompanyId: this.$store.state.Company,
      };
      console.log(params);
      axios
        .put(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/User",
          params,
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
          document.getElementById("name").value = "";
          document.getElementById("user").value = "";
          document.getElementById("password").value = "";
          document.getElementById("domicilio").value = "";
          document.getElementById("numero").value = "";
          document.getElementById("correo").value = "";
          this.$emit("update:is-open", false);
        });
    },
  },
};
</script>
