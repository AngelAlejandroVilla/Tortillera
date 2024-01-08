<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="w-auto p-6 bg-white rounded-md shadow-xl">
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
                    class="mx-auto h-48 w-48 rounded-lg"
                    src="@/assets/images/user.png"
                    alt=""
                  />
                  <div class="flex flex-row gap-3 align-center">
                    <div class="basis-2/5">
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Nombre</label
                      >
                      <input
                        v-if="Customer != null"
                        type="text"
                        id="nombre"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Customer.Name"
                        required
                      />
                    </div>
                    <div class="basis-2/5">
                      <label
                        for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >Repartidor</label
                      >
                      <select
                        v-if="Customer != null"
                        id="deliver"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                      >
                        <option
                          v-for="(deliver, index) in $store.state.delivers"
                          :key="index"
                          :value="deliver.UserId"
                        >
                          {{ deliver.Name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="mt-5 flex flex-row gap-3 align-center">
                    <div>
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Direccion 1</label
                      >
                      <input
                        v-if="Customer != null"
                        type="text"
                        id="direccion1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Customer.Address1"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Direccion 2</label
                      >
                      <input
                        v-if="Customer != null"
                        type="text"
                        id="direccion2"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Customer.Address2"
                        required
                      />
                    </div>
                  </div>
                  <div class="mt-5 flex flex-row gap-3">
                    <div>
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Telefono</label
                      >
                      <input
                        v-if="Customer != null"
                        type="text"
                        id="tel"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Customer.Phone"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Mobil</label
                      >
                      <input
                        v-if="Customer != null"
                        type="text"
                        id="mobil"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        :value="Customer.Mobile"
                        required
                      />
                    </div>
                  </div>
                  <div class="mt-5 flex flex-row gap-3">
                    <div class="w-full justify-center">
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Code</label
                      >
                      <input
                        v-if="Customer != null"
                        type="text"
                        id="code"
                        class="bg-gray-50 border w-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        :value="Customer.Code"
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
          @click="editCustomer()"
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
      requires: true,
    },
  },
  data() {
    const Customer = null;

    return {
      Customer,
    };
  },
  methods: {
    editCustomer() {
      let params = {
        CustomerId: this.Customer.CustomerId,
        CompanyId: this.$store.state.Company,
        Name: document.getElementById("nombre").value,
        Address1: document.getElementById("direccion1").value,
        Address2: document.getElementById("direccion2").value,
        Phone: document.getElementById("tel").value,
        Mobile: document.getElementById("mobil").value,
        Active: 1,
        Code: document.getElementById("code").value,
        UserId: document.getElementById("deliver").value,
      };
      console.log(params);
      axios
        .post(
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
          this.$emit("update:is-open", false);
        });
    },
    getCustomer(id) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customer/" +
            this.$store.state.Company +
            "/" +
            id
        )
        .then((result) => {
          this.Customer = result.data;
          console.log(this.Customer);
        });
    },
  },
};
</script>
