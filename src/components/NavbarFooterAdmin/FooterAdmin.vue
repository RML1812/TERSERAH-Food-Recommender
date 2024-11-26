<template>
    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="flex items-center space-x-6">
          <img src="/Logo.png" alt="Terserah Logo" class="footer-logo" />
        </div>
        <div class="text-center">
          <p>&copy; 2024 TERSERAH Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #696969;
    color: white;
    width: 100%;
    padding: 20px 0;
    margin-top: auto; /* Allows footer to push to the bottom if the content is less than viewport height */
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    max-width: 1200px;
    margin: auto;
  }
  
  .footer-logo {
    width: auto;
    height: auto;
  }
  </style>
  