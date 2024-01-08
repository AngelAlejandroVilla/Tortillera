<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Agregar Cliente</h3>
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
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nombre</label
            >

            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nombre"
              required
            />
          </div>
          <div class="flex mb-6 gap-2">
            <div class="mx-auto w-56">
              <label
                for="domicilio"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Direccion 1</label
              >

              <input
                type="text"
                id="direccion1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Calle, Domicilio"
                required
              />
            </div>
            <div class="mx-auto w-56">
              <label
                for="domicilio"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Direccion 2</label
              >

              <input
                type="text"
                id="direccion2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Entidad, Codigo Postal"
                required
              />
            </div>
          </div>
          <div class="flex mb-6 gap-2">
            <div class="mx-auto w-56">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Telefono</label
              >

              <input
                type="text"
                id="telefono"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tel. "
                required
              />
            </div>
            <div class="mx-auto w-56">
              <label
                for="producto"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Mobil</label
              >

              <input
                type="text"
                id="mobil"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Mobil"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Repartidor</label
            >
            <select
              id="repartidor"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option
                v-for="(deliver, index) in delivers"
                :key="index"
                :value="deliver.UserId"
              >
                {{ deliver.Name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex justify-center px-4 py-3 gap-3">
          <div class="flex">
            <button
              @click="addCustomer()"
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
  created() {
    this.getRepartidores();
  },
  data() {
    const delivers = null;

    return {
      delivers,
    };
  },
  methods: {
    getRepartidores() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/UsersFilter/" +
            this.$store.state.Company +
            "/" +
            "Status='1' and ProfileId='1' and CompanyId=" +
            this.$store.state.Company,
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
          this.delivers = result.data;
        });
    },
    cancelOperation() {
      document.getElementById("name").value = "";
      document.getElementById("direccion1").value = "";
      document.getElementById("direccion2").value = "";
      document.getElementById("telefono").value = "";
      document.getElementById("mobil").value = "";
      document.getElementById("repartidor").index = 0;
      this.$emit("update:is-open", false);
    },
    addCustomer() {
      let params = {
        CompanyId: this.$store.state.Company,
        Name: document.getElementById("name").value,
        Address1: document.getElementById("direccion1").value,
        Address2: document.getElementById("direccion2").value,
        Phone: document.getElementById("telefono").value,
        Mobile: document.getElementById("mobil").value,
        Active: 1,
        UserId: document.getElementById("repartidor").value,
      };
      console.log(params);
      axios
        .put(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customer",
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
          document.getElementById("direccion1").value = "";
          document.getElementById("direccion2").value = "";
          document.getElementById("telefono").value = "";
          document.getElementById("mobil").value = "";
          document.getElementById("repartidor").index = 0;
          this.$emit("update:is-open", false);
        });
    },
  },
};
</script>
