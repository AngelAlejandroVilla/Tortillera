<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="sm:max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Ingresar Pago</h3>
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
        <div class="flex flex-row align-center">
          <div class="flex flex-row align-center px-4 mb-6 mt-6">
            <div class="flex-1">
              <label
                for="pagar_saldo"
                class="block pr-6 pt-2 mb-2 text-sm font-medium text-gray-900"
                >Cantidad</label
              >
            </div>

            <div class="flex-1">
              <input
                id="pago"
                type="number"
                name="pagar_saldo"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-cyan-500 focus:border-blue-500 block w-44 p-2.5"
                placeholder="$0"
                required
              />
            </div>
          </div>
        </div>
        <div class="flex px-4 py-3 gap-4">
          <div class="flex-1">
            <button
              @click="pagar()"
              class="px-6 py-2 text-green-800 border border-green-600 hover:border-green-200 rounded-md w-36"
            >
              Pagar
            </button>
          </div>
          <div class="flex-1">
            <button
              @click="$emit('update:is-open', false)"
              class="px-6 py-2 text-red-800 border border-red-600 hover:border-red-200 rounded-md w-36"
            >
              Cancelar
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
    CustomerId: {
      type: String,
      required: true,
    },
    refreshInfo: {
      type: Function,
      required: true,
    },
  },
  methods: {
    pagar() {
      let params = {
        amount: document.getElementById("pago").value,
        CustomerId: this.CustomerId,
        UserId: this.$store.state.UserId,
      };
      axios
        .put(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TPayment/Payment",
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
          this.$notify({
            title: "Transaccion Realizada",
            text: "La transaccion se realizo exitosamente",
            type: "success",
          });
          document.getElementById("pago").value = 0;
          this.$emit("update:is-open", false);
          this.refreshInfo();
        });
    },
  },
};
</script>
