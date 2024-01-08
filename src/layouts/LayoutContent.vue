<template>
  <side-bar/>  
  <app-bar/>  
  <slot/>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import AppBar from '../components/AppBar.vue'

export default {
    components: {
        SideBar,
        AppBar,
    },
}
</script>