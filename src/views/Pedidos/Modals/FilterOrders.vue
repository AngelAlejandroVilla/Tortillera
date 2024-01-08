<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div
      class="sm:max-w-2xl w-80 sm:w-96 md:w-[480px] lg:w-[600px] xl:w-[900px] 2xl:w-[1200px] p-6 bg-white rounded-md shadow-xl"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Filtrar Valores</h3>
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
        <div class="flex gap-4 mb-7">
          <div>
            <label
              for="status"
              class="block mb-2 text-sm font-medium text-cyan-600"
              >Status</label
            >
            <select
              id="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="todos">Todos</option>
              <option value="1">Pedido</option>
              <option value="2">Surtido Parcialmente</option>
              <option value="3">Surtido</option>
              <option value="4">Pagado Parcialmente</option>
              <option value="5">Pagado</option>
              <option value="6">Cancelado</option>
            </select>
          </div>
          <div>
            <label
              for="cliente"
              class="block mb-2 text-sm font-medium text-cyan-600"
              >Repartidor</label
            >
            <select
              id="custumner"
              v-if="Repartidores != null"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[12rem] p-2.5"
            >
              <option value="todos">Todos</option>
              <option
                v-for="(repartidor, index) in Repartidores"
                :key="index"
                v-bind:value="repartidor.UserId"
              >
                {{ repartidor.Name }}
              </option>
            </select>
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-cyan-600"
              >Rango De fecha</label
            >
            <Datepicker
              @update:model-value="fecha = true"
              required
              v-model="date"
              modelType="dd-MM-yyyy"
              locale="MX"
              cancelText="Cancelar"
              selectText="Selecciónar"
              range
            ></Datepicker>
          </div>
        </div>
        <div class="flex flex-row gap-4 justify-center">
          <div>
            <button
              @click="filtrarDatos()"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Filtrar
            </button>
          </div>
          <div>
            <button
              @click="LimpiarFiltro()"
              class="flex mx-auto px-6 py-2 text-white bg-sky-300 rounded"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import axios from "axios";

import { ref } from "vue";

export default {
  components: {
    Datepicker,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    refreshInfo: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const date = ref(new Date());

    return {
      date,
    };
  },
  data() {
    const fecha = false;
    const Repartidores = null;

    return {
      Repartidores,
      fecha,
    };
  },
  created() {
    axios
      .get(
        "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/UsersFilter/" +
          this.$store.state.Company +
          "/" +
          "Status='1' and ProfileId='1'}",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
            "Access-Control-Max-Age": "86400",
          },
        }
      )
      .then((result) => {
        this.Repartidores = result.data;
        console.log(this.Repartidores);
      });
  },
  methods: {
    filtrarDatos() {
      if (document.getElementById("status").selectedIndex > 0) {
        this.$store.state.filterOrders =
          "Status=" + document.getElementById("status").value;
      }
      if (document.getElementById("custumner").selectedIndex > 0) {
        if (this.$store.state.filterOrders != "") {
          this.$store.state.filterOrders +=
            " and UserId=" + document.getElementById("custumner").value;
        } else {
          this.$store.state.filterOrders =
            "UserId=" + document.getElementById("custumner").value;
        }
      }
      if (this.fecha) {
        if (this.$store.state.filterOrders != "") {
          this.$store.state.filterOrders +=
            " and DateCreated " +
            "between " +
            this.date[0] +
            " AND " +
            this.date[1];
        } else {
          this.$store.state.filterOrders =
            "DateCreated " + "between " + this.date[0] + " AND " + this.date[1];
        }
      }

      if (this.date != null) {
        this.$emit("update:is-open", false);
      }

      console.log(this.$store.state.filterOrders);
      this.refreshInfo();
    },
    LimpiarFiltro() {
      if (document.getElementById("status") != null) {
        document.getElementById("status").value = "todos";
      }
      if (document.getElementById("custumner") != null) {
        document.getElementById("custumner").value = "todos";
      }
      this.date = ref(new Date());
      if (this.$store.state.filterOrders != "") {
        this.$store.state.filterOrders = "";
      }
      this.refreshInfo();
      this.$emit("update:is-open", false);
    },
  },
};
</script>
