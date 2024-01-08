<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Agregar Suministro</h3>
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
        <div class="flex flex-row">
          <div class="mb-6">
            <label
              for="producto"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Suministro</label
            >

            <input
              v-model="Description"
              type="text"
              id="producto"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Suministro"
            />
          </div>
          <div class="flex-1 ml-2 mb-6">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >Unidad de Medida</label
            >
            <select
              v-model="UnitId"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Ninguna" selected="">Eliga una unidad</option>
              <option
                v-for="(unit, index) in $store.state.units"
                :key="index"
                v-bind:value="unit.UnitId"
              >
                {{ unit.Name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <div class="mb-6">
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Code</label
            >
            <input
              v-model="Code"
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
    IdSupplie: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Code: "",
      Description: "",
      UnitId: 0,
    };
  },
  created() {
    this.$store.dispatch("getUnits");
    this.GetProduct(this.IdSupplie);
  },
  methods: {
    GetProduct(id) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Product/" +
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
          this.Code = result.data.Code;
          this.Description = result.data.Description;
          this.UnitId = result.data.UnitId;
        });
    },
    CleanEntry() {
      this.UnitId = 0;
      this.Description = "";
      this.Code = "";
      this.$emit("update:is-open", false);
    },
    AddProduct() {
      let params = {
        Active: "1",
        Code: this.Code,
        CompanyId: this.$store.state.Company,
        Description: this.Description,
        UnitId: this.UnitId,
        SupplieId: this.IdSupplie,
      };
      console.log(params);
      axios
        .post(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TInventory/Product",
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
