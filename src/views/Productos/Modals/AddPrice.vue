<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Añadir Precio</h3>
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
                <div class="flex flex-row gap-3">
                  <div>
                    <label for="producto">Producto</label>
                    <select
                      id="producto"
                      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option
                        v-for="(product, index) in products"
                        :key="index"
                        :value="product.CustomerId"
                      >
                        {{ product.Name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="cantidad">Cantidad</label>
                    <input
                      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      id="cantidad"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="addPrice()"
          class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
        >
          Añadir
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
    refreshInfo: {
      type: Function,
      required: true,
    },
    productsPrices: {
      type: Array,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    const products = null;
    const CustumersId = "";

    return {
      products,
      CustumersId,
    };
  },
  created() {},
  methods: {
    refreshData() {
      this.getActualProducts();
      if (this.CustumersId === "") {
        axios
          .get(
            "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/Customers/" +
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
            this.products = result.data;
            console.log(this.products);
          });
      } else {
        axios
          .get(
            "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TCustomer/CustomersFilter/" +
              this.$store.state.Company +
              "/not CustomerId in (" +
              this.CustumersId +
              ")",
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
            this.products = result.data;
            console.log(this.products);
          });
      }
    },
    getActualProducts() {
      for (const i of this.productsPrices) {
        if (this.CustumersId === "") {
          this.CustumersId = i;
        } else {
          this.CustumersId = this.CustumersId + "," + i;
        }
      }
    },
    addPrice() {
      let params = {
        CustomerId: document.getElementById("producto").value,
        UserIdUpdated: this.$store.state.UserId,
        UserIdCreated: this.$store.state.UserId,
        Products: [
          {
            PriceListId: 0,
            ProductId: this.productId,
            Price: document.getElementById("cantidad").value,
          },
        ],
      };
      axios
        .put(
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
        })
        .catch(() => {});
    },
  },
};
</script>
