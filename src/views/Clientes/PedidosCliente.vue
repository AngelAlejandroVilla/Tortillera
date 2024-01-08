<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="m-auto flex flex-col flex-grow p-4 ml-64 mr-5">
            <button
            @click="isOpenPedido = true"
            class="mb-10 hover:border-cyan-200 border-2 border-cyan-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-52"
            type="button">
            <svg 
                class="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                    <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                    </path>
                </svg>
            <span class="text-center">Nuevo Pedido</span>
            </button>
            
<div class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-96">
    <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Detalle de la orden
                </th>
                <th scope="col" class="px-6 py-3">
                    Fecha de entrega
                </th>
                <th scope="col" class="px-6 py-3">
                    Total
                </th>
                <th scope="col" class="px-6 py-3">
                    Repartidor
                </th>
                <th scope="col" class="px-6 py-3">
                    Estatus
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <button
                        @click="isOpenDetalle = true"
                        class="px-6 py-2 text-cyan-500 hover:border-cyan-200 rounded border-cyan-500 border"
                        type="button"
                    >
                        Ver Detalles
                    </button>
                </th>
                <td class="px-6 py-4">
                    11 de octubre, 2022
                </td>
                <td class="px-6 py-4">
                    $20,000 MXN
                </td>
                <td class="px-6 py-4">
                    <svg class="w-6 h-6 inline text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg> <span class="text-cyan-400 hover:unline">Angel Alejandro</span>
                </td>
                <td class="px-6 py-4 flex justify-center">
                    <div class="container mx-auto">
                        <span class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">En camino</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</div>
<add-pedido 
     v-model:is-open="isOpenPedido"
>
</add-pedido>
 
</template>
<script>
import AddPedido from './Modals/Add/AddPedido.vue'
 
export default {
  components: {
    AddPedido,
  },
  data() {
    return {
      isOpenClientInfo: false,
      isOpenDetalle: false,
      isOpenPedido: false,
    };
  },
};
</script>
