<template>
  <div class="pending-status">
    <div class="content">
      <div class="lock-icon">
        <!-- Use the image from the public folder -->
        <img src="/lock-icon.png" alt="Lock Icon" />
      </div>
      <div class="text-content">
        <h2 class="font-bold">Ups, status akunmu sekarang adalah</h2>
        <h1 class="status">PENDING</h1>
        <p class="font-semibold">Tunggu tim Terserah untuk memeriksa akun-mu dahulu ya! Jika akun-mu diterima, kami ingatkan lewat email kok jangan takut!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PendingStatus',
};
</script>

<style scoped>
.pending-status {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f6f1ed;
  color: #333;
}

.content {
  display: flex;
  align-items: center;
  text-align: left;
  padding: 2em;
}

.lock-icon {
  margin-right: 20px;
}

.lock-icon img {
  width: 350px; /* Adjust the size as needed */
  height: 430px; /* Adjust the size as needed */
}

.text-content {
  max-width: 700px;
  font-size: 24px;
  margin-left: 100px;
}

.status {
  color: #d87b1c;
  font-size: 3em;
  font-weight: bold;
}
</style>
