<template>
      <div
        v-show="isOpen"
        class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        "
      >
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Nuevo Pedido</h3>
            <svg
              @click="$emit('update:is-open',false)"
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
                  <form action="">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Fecha De Entrega</label>
                            <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input datepicker="" datepicker-buttons="" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date">
                            </div>
                        </div>
                    </div>
                  </form>

                  <div class="flex justify-center">
                    <span class="text-xl font-bold mt-10">
                        Pedido
                    </span>
                  </div>

                  <form action="">
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Producto</label>
                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>Producto</option>
                            <option value="US">Tortillas</option>
                            <option value="CA">Tostadas</option>
                            <option value="FR">Tortillas de Harina</option>
                            <option value="DE">Salsa de chile</option>
                            </select>
                        </div>
                        <div>
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Cantidad</label>
                            <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:ring-0  peer" placeholder="Cantidad" />
                        </div>
                        <div class="mt-7">
                            <button
                            @click="$emit('update:is-open',false)"
                            class="h-10 w-full text-blue-800 border border-blue-600 rounded"
                            >
                                <div class="flex flex-row mx-auto justify-center">
                                     <span>Agregar</span>
                                     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                </div>
                            </button>
                        </div>
                    </div>
                  </form>

                  <div>
                    <table class="mt-10 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Imagen
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Producto
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Medida
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Precio
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="px-6 py-4">
                                    <img class="h-12 w-12" src="@/assets/images/productos/tortilla.jpg" alt="">
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    Tortillas de maíz
                                </th>
                                <td class="px-6 py-4">
                                    1 kg
                                </td>
                                <td class="px-6 py-4">
                                    $2999
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-8 flex flex-row-reverse">
                        <div>
                            <span class="text-xl ml-3 text-cyan-400">$12</span>
                        </div>
                        <div>
                            <span class="text-xl font-bold">Total:</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <button
              @click="$emit('update:is-open',false)"
              class="flex mx-auto px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Listo
            </button>
          </div>
        </div>
      </div>
</template>

<script >
export default {
    props: {
        isOpen: {
          type: Boolean,
          required: true
        }
    }
}
</script>