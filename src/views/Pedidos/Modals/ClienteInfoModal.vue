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
          <div class="flex flex-row-reverse">
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
                    <div>
                        <img class="mx-12 h-48 w-48 rounded-lg" src="@/assets/images/user.png" alt="">
                        <div class="flex flex-row align-center">
                            <div><p class="font-bold mt-5">Nombre:</p></div>
                            <div><p class="mt-5 ml-3">Angel Alejandro </p></div>
                        </div>
                        <div class="flex flex-row align-center">
                            <div><p class="font-bold mt-3">Telefono:</p></div>
                            <div><p class="mt-3 ml-3">3222272840</p></div>
                        </div>
                        <div class="flex flex-row align-center">
                            <div><p class="font-bold mt-3">Direccion:</p></div>
                            <div><p class="mt-3 ml-3">Dubai Emiliano Zapata 23214</p></div>
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

<script>
export default {
    props: {
        isOpen: {
          type: Boolean,
          required: true
        }
    }
}
</script>