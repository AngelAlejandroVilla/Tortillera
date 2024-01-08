<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
    <div
      class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
    >
      <div
        class="px-4 pt-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
      >
        <div class="my-3 text-4xl font-bold tracking-wider text-center">
          <a href="#">Sistema administrativo de tortillerias</a>
        </div>
        <div>
          <span class="font-bold text-sm text-yellow-500"
            >por VILLASOL systems</span
          >
        </div>
        <p class="mt-6 font-normal text-center text-gray-300 md:mt-0">
          Organiza y administra tu tortillera de manera eficiente. Facilita tus
          pedidos, inventario y ventas dentro de una app web y ten control total
          de tus ganancias,clientes y repartidores
        </p>
        <p class="mt-6 text-sm text-center text-gray-300">
          Leer <a href="#" class="underline">terminos</a> y
          <a href="#" class="underline">condiciones</a>
        </p>
      </div>
      <div class="p-5 bg-white md:flex-1">
        <h3 class="my-4 text-2xl font-semibold text-gray-700">Inicia Sesion</h3>
        <div class="flex flex-col space-y-5 h-[24rem]">
          <div class="flex flex-col space-y-1">
            <label for="email" class="text-sm font-semibold text-gray-500"
              >Usuario</label
            >
            <input
              type="text"
              id="user"
              autofocus
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-semibold text-gray-500"
                >Contraseña</label
              >
            </div>
            <input
              type="password"
              id="password"
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
          </div>
          <div>
            <button
              @click="login()"
              class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Log in
            </button>
          </div>
          <div v-if="error">
            <div
              class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
              role="alert"
            >
              <p class="font-bold">Vuelve A Intentarlo</p>
              <p>Usuario o Contraseña Incorrecto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    const error = false;

    return {
      error,
    };
  },
  methods: {
    login() {
      axios
        .get(
          "http://hwsrv-966807.hostwindsdns.com:8080/dataSnap/rest/TUsers/UsersFilter/" +
            this.$store.state.Company +
            "/" +
            "Nickname='" +
            document.getElementById("user").value +
            "' and Password='" +
            document.getElementById("password").value +
            "'",
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
          if (result.data.Valor === "-1") {
            this.error = true;
          } else {
            console.log(result.data[0]);
            this.$store.state.IsLogged = true;
            this.$store.state.ProfileId = result.data[0].ProfileId;
            this.$store.state.UserId = result.data[0].UserId;
            this.$store.state.Company = result.data[0].CompanyId;
            this.$store.state.UserName = result.data[0].Name;
            this.$store.state.Email = result.data[0].email;
            document.getElementById("user").value = "";
            document.getElementById("password").value = "";
            if (this.$store.state.ProfileId === "2") {
              this.$router.push({ name: "venta" });
            } else {
              if (this.$store.state.ProfileId === "4") {
                this.$router.push({ name: "pedidos" });
              } else {
                this.error = true;
              }
            }
          }
        });
    },
  },
};
</script>
