<template>
  <body class="bg-gradient-to-b  from-[#E9E2D5] to-[#ffffff]">
    <Navbar />
  
    <RouterView />
  
    <Footer />
  </body>
  

</template>

<script>
  import Navbar from './components/HeadFoot/Navbar.vue';
  import Footer from './components/HeadFoot/Footer.vue';
  import Registrasi from './views/Registrasi.vue';
  // import { RouterLink, RouterView } from 'vue-router'

  export default {
    components : {
      Navbar,
      Footer,
      Registrasi
    }
  }
</script>


