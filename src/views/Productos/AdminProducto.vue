<template>
  <div class="m-auto flex flex-col flex-grow p-4 ml-64 mr-5">
    <div class="flex flex-row">
      <button
        @click="isOpenNewProduct = true"
        class="mb-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-52"
        type="button"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <span>Agregar Producto</span>
      </button>
      <div class="ml-96 text-2xl mb-12">Administrar Productos</div>
    </div>
    <div
      class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[35rem]"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Imagen</th>
            <th scope="col" class="px-6 py-3">Producto</th>
            <th scope="col" class="px-6 py-3">Medida</th>
            <th scope="col" class="px-6 py-3">Precio General</th>
            <th scope="col" class="px-6 py-3">Precios</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="products.Valor != '-1'">
          <tr
            v-for="(producto, index) in products"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">
              <img class="h-12 w-12" :src="producto.img" />
            </td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {{ producto.Name }}
            </th>
            <td class="px-6 py-4">
              {{ $store.getters.getUnit(producto.UnitId).Code }}
            </td>
            <td class="px-6 py-4">${{ producto.basePrice }}</td>
            <td class="px-6 py-4 text-right">
              <div class="container mx-auto">
                <div class="flex">
                  <button
                    @click="openPrices(producto.ProductId)"
                    class="px-6 py-2 text-white bg-cyan-400 hover:bg-cyan-500 rounded shadow"
                    type="button"
                  >
                    Ver Precios
                  </button>
                </div>
              </div>
            </td>
            <td>
              <div class="flex justify-left">
                <div @click="EditProduct(producto.ProductId)" class="ml-5">
                  <svg
                    class="w-6 h-6 hover:text-cyan-400 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </div>
                <div @click="deleteProduct(producto.ProductId)" class="ml-5">
                  <svg
                    class="w-6 h-6 hover:text-cyan-400 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <precios-modal v-if="isOpen" v-model:is-open="isOpen" :productId="productId">
  </precios-modal>
  <add-product
    v-if="isOpenNewProduct"
    v-model:is-open="isOpenNewProduct"
    :refresh="refreshInfo"
  >
  </add-product>
  <admin-producto
    ref="editProduct"
    :refresh="refreshInfo"
    v-model:is-open="isOpenAdminProdcut"
  ></admin-producto>
</template>
<script>
import PreciosModal from "./Modals/PreciosModal.vue";
import addProduct from "./Modals/addProduct.vue";
import AdminProducto from "./Modals/EditProducto.vue";

import axios from "axios";

export default {
  components: {
    PreciosModal,
    addProduct,
    AdminProducto,
  },
  data() {
    const products = null;
    const productId = "";

    return {
      productId,
      products,
      isOpen: false,
      isOpenNewProduct: false,
      isOpenAdminProdcut: false,
    };
  },
  created() {
    this.refreshInfo();
    this.$store.dispatch("getUnits");
  },
  methods: {
    openPrices(idProduct) {
      this.isOpen = true;
      this.productId = idProduct;
    },
    EditProduct(id) {
      this.isOpenAdminProdcut = true;
      this.$refs.editProduct.getProduct(id);
    },
    deleteProduct(id) {
      axios
        .delete(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Product/" +
            this.$store.state.Company +
            "/" +
            id +
            "/" +
            2,
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
          this.refreshInfo();
        });
    },
    refreshInfo() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Products/" +
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
    },
  },
};
</script>
