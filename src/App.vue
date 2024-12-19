<template>
  <body class="bg-gradient-to-b  from-[#E9E2D5] to-[#ffffff]">
    <Navbar v-if="!$route.meta.hideNavbarFooter" />
  
    <RouterView />
  
    <Footer v-if="!$route.meta.hideNavbarFooter" />
  </body>
</template>

<script>
import Navbar from './components/HeadFoot/Navbar.vue';
import Footer from './components/HeadFoot/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
};
</script>
