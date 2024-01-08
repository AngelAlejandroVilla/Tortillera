<template>
  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
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
                    v-if="product != null"
                    class="mx-12 h-48 w-48 rounded-lg"
                    v-bind:src="product.img"
                    alt=""
                  />
                  <div class="flex flex-row gap-3 align-center">
                    <div>
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Producto</label
                      >
                      <input
                        v-if="product != null"
                        type="text"
                        id="producto_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        v-bind:value="product.Name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="countries"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >Unidad de Medida</label
                      >
                      <select
                        id="units"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option
                          v-if="product != null"
                          v-bind:value="product.UnitId"
                        >
                          {{ $store.getters.getUnit(product.UnitId).Code }}
                        </option>
                        <option value="1">kg</option>
                        <option value="2">lt</option>
                        <option value="3">Bolsa</option>
                        <option value="4">Paquete</option>
                        <option value="5">Botella</option>
                        <option value="6">pza</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex flex-row gap-2">
                    <div class="mt-4">
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Precio Base</label
                      >
                      <input
                        v-if="product != null"
                        type="text"
                        id="PrecioBase"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        v-bind:value="product.basePrice"
                        required
                      />
                    </div>
                    <div class="mt-4">
                      <label
                        for="producto_name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Atajo</label
                      >
                      <select
                        v-if="product != null"
                        id="atajo"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option selected="">
                          {{ getShortCut(product.ShortCut) }}
                        </option>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="EditProduct()"
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
      required: true,
    },
  },
  data() {
    const product = null;

    return {
      product,
    };
  },
  methods: {
    getShortCut(cut) {
      console.log(cut);
      switch (cut) {
        case "49":
          return "1";
        case "50":
          return "2";
        case "51":
          return "3";
        case "52":
          return "4";
        case "53":
          return "5";
        case "54":
          return "6";
        case "55":
          return "7";
        case "56":
          return "8";
        case "57":
          return "9";
        case "65":
          return "A";
        case "66":
          return "B";
        case "67":
          return "C";
        case "68":
          return "D";
        case "69":
          return "E";
        case "70":
          return "F";
        case "71":
          return "G";
        case "72":
          return "H";
        case "73":
          return "I";
        case "74":
          return "J";
        case "75":
          return "K";
        case "76":
          return "L";
        case "77":
          return "M";
        case "78":
          return "N";
        case "79":
          return "O";
        case "80":
          return "P";
        case "81":
          return "Q";
        case "82":
          return "R";
        case "83":
          return "S";
        case "84":
          return "T";
        case "85":
          return "U";
        case "86":
          return "V";
        case "87":
          return "W";
        case "88":
          return "Z";
        case "89":
          return "Y";
        case "90":
          return "Z";
      }
    },
    EditProduct() {
      let post = {
        ProductId: this.product.ProductId,
        UnitId: "1",
        ShortCut: document.getElementById("atajo").value,
        Name: document.getElementById("producto_name").value,
        basePrice: document.getElementById("PrecioBase").value,
        img: this.product.img,
        Companyid: this.$store.state.Company,
        Active: 1,
      };
      console.log(post);
      axios
        .post(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Product",
          post,
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
    getProduct(id) {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TProducts/Product/" +
            this.$store.state.Company +
            "/" +
            id
        )
        .then((result) => {
          this.product = result.data;
          console.log(this.product);
        });
    },
  },
};
</script>
