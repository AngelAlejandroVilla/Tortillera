<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Editar precio</h3>
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
                <input
                  id="price"
                  type="text"
                  v-bind:value="activePrice.Price"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          @click="editPrice()"
          class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Guardar
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
    activePrice: {
      type: Object,
      required: true,
    },
    refreshInfo: {
      type: Function,
      required: true,
    },
  },
  data() {
    const products = null;

    return {
      products,
    };
  },
  created() {
    console.log(this.activePrice);
  },
  methods: {
    editPrice() {
      let params = {
        CustomerId: this.activePrice.CustomerId,
        UserIdUpdated: this.$store.state.UserId,
        UserIdCreated: this.$store.state.UserId,
        Products: [
          {
            PriceListId: this.activePrice.PriceListId,
            ProductId: this.activePrice.ProductId,
            Price: document.getElementById("price").value,
          },
        ],
      };
      axios
        .post(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/PriceList/",
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
        .then(() => {
          this.$emit("update:is-open", false);
          this.refreshInfo();
        });
    },
  },
};
</script>
