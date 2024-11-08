<template>
  <div class="navbar">
    <span class="nav-item">Main Dashboard</span>
    <span class="nav-item">Konten</span>
    <span class="nav-item">Reservasi</span>
    <span class="nav-item user-info">| Restaurant A</span>
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
  background-color: #c79aa4;
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
