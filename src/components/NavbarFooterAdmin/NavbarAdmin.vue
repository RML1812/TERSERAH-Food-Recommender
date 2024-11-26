<template>
    <div class="navbar">
      <router-link to="/admin/dashboard" class="nav-item">Main Dashboard</router-link>
      <router-link to="/admin/review" class="nav-item">Review Akun</router-link>
      <router-link to="" class="nav-item user-info">| Admin A</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 35px; /* Adjusted padding to reduce vertical space */
    background-color: #696969;
    color: white;
    font-weight: bold;
    position: fixed; /* Fixes the navbar to the top of the viewport */
    top: 0; /* Anchors it to the top */
    left: 0; /* Ensures it spans from the left */
    z-index: 1000; /* Keeps it above other content */
  }
  
  .nav-item {
    cursor: pointer;
  }
  </style>
  