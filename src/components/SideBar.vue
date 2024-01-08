<template>
  <div>
    <aside
      class="bg-gray-500 ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r transition duration-300 md:w-5/12 lg:ml-0 lg:w-[20%] xl:w-[15%] 2xl:w-[13%]"
    >
      <div id="sidenavExample">
        <div class="-mx-6 px-6 py-4">
          <a href="#" title="home">
            <h1 class="font-sans text-2xl text-center font-bold text-white">
              SATOR
            </h1>
            <span
              class="text-sm text-center flex align-center justify-center text-gray-400"
              >por Villasol©</span
            >
          </a>
        </div>
        <ul class="space-y-2 tracking-wide mt-8">
          <li>
            <a
              href="#"
              class="px-4 py-2 flex items-center space-x-4 rounded-md text-white group hover:bg-cyan-400"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li
            v-if="
              $store.state.ProfileId === '1' ||
              $store.state.ProfileId === '2' ||
              $store.state.ProfileId === '4'
            "
            class="relative"
            id="sidenavEx1"
          >
            <a
              class="px-4 py-2 flex items-center transition duration-75 space-x-4 rounded-md text-white group hover:bg-cyan-400 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavEx1"
              aria-expanded="true"
              aria-controls="collapseSidenavEx1"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span>Administrar</span>
            </a>
            <ul
              id="collapseSidenavEx1"
              class="relative accordion-collapse collapse"
              aria-labelledby="sidenavEx1"
              data-bs-parent="#sidenavExample"
            >
              <li
                v-if="
                  $store.state.ProfileId === '2' ||
                  $store.state.ProfileId === '4'
                "
                class="relative"
              >
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'venta' }"
                  >Venta</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'pedidos' }"
                  >Pedidos</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'P&D' }"
                  >Pago & Devoluciones</router-link
                >
              </li>
            </ul>
          </li>
          <li
            v-if="
              $store.state.ProfileId === '1' || $store.state.ProfileId === '4'
            "
            class="relative"
            id="sidenavEx3"
          >
            <a
              class="px-4 py-2 flex items-center transition duration-75 space-x-4 rounded-md text-white group hover:bg-cyan-400 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavEx3"
              aria-expanded="true"
              aria-controls="collapseSidenavEx3"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
              <span>Repartidor</span>
            </a>
            <ul
              id="collapseSidenavEx3"
              class="relative accordion-collapse collapse"
              aria-labelledby="sidenavEx3"
              data-bs-parent="#sidenavExample"
            >
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'PedidosRepartidor' }"
                  >Administrar Pedidos</router-link
                >
              </li>
            </ul>
          </li>
          <li
            v-if="$store.state.ProfileId === '4'"
            class="relative"
            id="sidenavEx4"
          >
            <a
              class="px-4 py-2 flex items-center transition duration-75 space-x-4 rounded-md text-white group hover:bg-cyan-400 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavEx4"
              aria-expanded="true"
              aria-controls="collapseSidenavEx4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clip-rule="evenodd"
                />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span>Reportes</span>
            </a>
            <ul
              id="collapseSidenavEx4"
              class="relative accordion-collapse collapse"
              aria-labelledby="sidenavEx4"
              data-bs-parent="#sidenavExample"
            >
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'saldosClientes' }"
                  >Saldos Clientes</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'corteDeCaja' }"
                  >Corte de caja</router-link
                >
              </li>
            </ul>
          </li>
          <li
            v-if="$store.state.ProfileId === '4'"
            class="relative"
            id="sidenavEx5"
          >
            <a
              class="px-4 py-2 flex items-center transition duration-75 space-x-4 rounded-md text-white group hover:bg-cyan-400 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavEx5"
              aria-expanded="true"
              aria-controls="collapseSidenavEx5"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>Configurar</span>
            </a>
            <ul
              id="collapseSidenavEx5"
              class="relative accordion-collapse collapse"
              aria-labelledby="sidenavEx5"
              data-bs-parent="#sidenavExample"
            >
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'AdministrarProductos' }"
                  >Productos</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'admnistrarRepartidores' }"
                  >Repartidores</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'administrarClientes' }"
                  >Cliente</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'administrarCajeros' }"
                  >Cajeros</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'inventario' }"
                  >Inventario</router-link
                >
              </li>
              <li>
                <router-link
                  class="hover:text-cyan-400 flex items-center p-2 pl-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group"
                  :to="{ name: 'Provedores' }"
                  >Provedores</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div
        class="px-6 -mx-6 pt-4 flex justify-between items-center border-t hover:bg-cyan-400"
      >
        <button
          class="px-4 py-3 flex items-center space-x-4 rounded-md text-white group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  </div>
</template>
