<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Agregar Producto</h3>
        <svg
          @click="cancelarProceso()"
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
              >Producto</label
            >

            <input
              type="text"
              id="producto"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nombre De Producto"
            />
          </div>
          <div class="flex-1 ml-2 mb-6">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >Unidad de Medida</label
            >
            <select
              id="units"
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
              >Precio Base</label
            >

            <input
              type="text"
              id="price"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="$0.00"
            />
          </div>
          <div class="flex-1 mb-6">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >Atajo</label
            >
            <select
              id="atajo"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="ninguno" selected="">Ninguno</option>
              <option value="49">1</option>
              <option value="50">2</option>
              <option value="51">3</option>
              <option value="52">4</option>
              <option value="53">5</option>
              <option value="54">6</option>
              <option value="55">7</option>
              <option value="56">8</option>
              <option value="57">9</option>
              <option value="65">A</option>
              <option value="66">B</option>
              <option value="67">C</option>
              <option value="68">D</option>
              <option value="69">E</option>
              <option value="70">F</option>
              <option value="71">G</option>
              <option value="72">H</option>
              <option value="73">I</option>
              <option value="74">J</option>
              <option value="75">K</option>
              <option value="76">L</option>
              <option value="77">M</option>
              <option value="78">N</option>
              <option value="79">O</option>
              <option value="80">P</option>
              <option value="81">Q</option>
              <option value="82">R</option>
              <option value="83">S</option>
              <option value="84">T</option>
              <option value="85">U</option>
              <option value="86">V</option>
              <option value="87">W</option>
              <option value="88">X</option>
              <option value="89">Y</option>
              <option value="90">Z</option>
            </select>
          </div>
          <div class="my-auto">
            <button
              @click="isOpenImagen = true"
              class="px-4 py-2 bg-cyan-400 text-white rounded-md"
            >
              Agregar Imagen
            </button>
          </div>
        </div>
        <div class="flex justify-center px-4 py-3 gap-4">
          <div>
            <button
              @click="AddProduct()"
              class="text-center px-4 py-2 bg-cyan-400 text-white text-base font-medium rounded-md w-52 shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <imagenes-products
    v-model:is-open="isOpenImagen"
    ref="imagen"
  ></imagenes-products>
</template>

<script>
import ImagenesProducts from "./ImagenesProducts.vue";
import axios from "axios";

export default {
  components: {
    ImagenesProducts,
  },
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
  data() {
    return {
      isOpenImagen: false,
    };
  },
  created() {
    this.$store.dispatch("getUnits");
    console.log(this.$store.state.units);
  },
  methods: {
    cancelarProceso() {
      document.getElementById("producto").value = "";
      document.getElementById("units").value = "ninguno";
      document.getElementById("price").value = 0;
      document.getElementById("atajo").value = "ninguno";
      this.$emit("update:is-open", false);
    },
    AddProduct() {
      let params = {
        ProductId: 0,
        UnitId: document.getElementById("units").value,
        ShortCut: document.getElementById("atajo").value,
        Name: document.getElementById("producto").value,
        basePrice: document.getElementById("price").value,
        imagen: this.$refs.imagen.src,
        Companyid: this.$store.state.Company,
      };
      console.log(params);
      axios
        .put(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Product",
          params,
          {
            headers: {
              "content-type": "image/png",
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
          document.getElementById("producto").value = "";
          document.getElementById("unidad").value = "ninguno";
          document.getElementById("price").value = 0;
          document.getElementById("atajo").value = "ninguno";
          this.$refs.imagen.src = "";
          this.refresh();
          this.$emit("update:is-open", false);
        });
    },
  },
};
</script>
