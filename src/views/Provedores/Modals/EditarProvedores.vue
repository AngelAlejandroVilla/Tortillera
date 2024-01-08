<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Editar Provedor</h3>
        <svg
          @click="CleanEntry()"
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
        <div class="flex flex-row gap-3">
          <div class="mb-6">
            <label
              for="producto"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Nombre</label
            >

            <input
              v-model="Name"
              type="text"
              id="producto"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-6">
            <label
              for="producto"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Domicilio</label
            >

            <input
              v-model="Address"
              type="text"
              id="producto"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-6">
            <label
              for="producto"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Ciudad</label
            >

            <input
              v-model="Ciudad"
              type="text"
              id="producto"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div class="flex flex-row gap-4 justify-center">
          <div class="mb-6">
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Numero Telefonico</label
            >
            <input
              v-model="PhoneNumber"
              type="text"
              id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-6">
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Email</label
            >
            <input
              v-model="Email"
              type="text"
              id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div class="flex justify-center px-4 py-3 gap-4">
          <div>
            <button
              @click="AddProduct()"
              class="text-center px-4 py-2 bg-cyan-400 text-white text-base font-medium rounded-md w-52 shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Editar
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
    ProviderId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Address: "",
      Ciudad: "",
      Name: "",
      PhoneNumber: "",
      Email: "",
    };
  },
  created() {
    this.GetProvider(this.ProviderId);
  },
  methods: {
    GetProvider(id) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Provider/" +
            this.$store.state.Company +
            "/" +
            id,
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
          console.log(result.data);
          this.Address = result.data.Address;
          this.Ciudad = result.data.Ciudad;
          this.Name = result.data.Name;
          this.PhoneNumber = result.data.PhoneNumber;
          this.Email = result.data.email;
        });
    },
    CleanEntry() {
      this.Address = "";
      this.Ciudad = "";
      this.Name = "";
      this.PhoneNumber = "";
      this.Email = "";
      this.$emit("update:is-open", false);
    },
    AddProduct() {
      let params = {
        Address: this.Address,
        Ciudad: this.Ciudad,
        CompanyId: this.$store.state.Company,
        Name: this.Name,
        PhoneNumber: this.PhoneNumber,
        ProviderId: this.ProviderId,
        email: this.Email,
      };
      console.log(params);
      axios
        .post(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Provider",
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
          this.CleanEntry();
          this.refresh();
        });
    },
  },
};
</script>
