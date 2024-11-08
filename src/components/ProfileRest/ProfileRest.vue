<template>
  <div class="profile-container">
    <!-- Profile Card -->
    <div class="profile-card">
      <div class="input-row">
        <div class="input-group">
          <h2 class="font-bold">Email Address</h2>
          <input type="email" v-model="email" class="styled-input" placeholder="Email Address" />
        </div>
        <div class="input-group">
          <h2 class="font-bold">Password</h2>
          <input type="password" v-model="password" class="styled-input" placeholder="Password" />
          <h2 class="font-bold mt-4">Change Password</h2>
          <input type="password" v-model="newPassword" class="styled-input" placeholder="Password" />
        </div>
      </div>
      <button class="update-button" @click="updateProfile">Ubah</button>
    </div>

    <!-- Status and Log Out Buttons -->
    <div class="action-buttons">
      <!-- Toggle Switch for Online/Offline Status -->
      <div class="status-toggle">
        <span class="status-text font-bold">Restaurant Status</span>
        <div class="toggle-container" @click="toggleStatus">
          <div :class="['toggle-slider', { 'slide-right': isOnline }]"></div>
          <span :class="['toggle-option', { 'active': isOnline }]">Online</span>
          <span :class="['toggle-option', { 'active': !isOnline }]">Offline</span>
        </div>
      </div>
      
      <button class="logout-button" @click="logout">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      newPassword: '',
      isOnline: false
    };
  },
  methods: {
    updateProfile() {
      console.log("Profile updated with:", this.email, this.password, this.newPassword);
    },
    toggleStatus() {
      this.isOnline = !this.isOnline;
    },
    logout() {
      console.log("Logged out");
    }
  }
};
</script>

<style scoped>
/* Prevent scrolling on the entire page */
html, body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  background-color: #f3ebe4;
  height: 100vh; /* Make the container full viewport height */
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

/* Profile Card */
.profile-card {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  position: relative;
}

/* Two-column layout for email and password fields */
.input-row {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 20px;
}

/* Input group styling for each field */
.input-group {
  flex: 1;
}

.profile-card h2 {
  font-size: 1em;
  color: #333;
  margin-bottom: 8px;
}

.styled-input {
  background-color: #D3D3D3;
  border: 1px solid #333;
  border-radius: 20px; /* Rounded edges */
  padding-left: 20px; /* Inner padding */
  color: #333;
  height: 50px; /* Adjusted height to match design */
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
  font-size: 1em;
  margin-bottom: 10px;
}

/* Align Ubah button to bottom-right inside profile-card */
.update-button {
  position: absolute;
  bottom: 30px;
  right: 40px;
  width: 150px;
  height: 40px;
  font-size: 20px;
  background-color: black;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}

/* Status and Log Out Container */
.action-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;
}

/* Toggle Switch Container */
.status-toggle {
  display: flex;
  align-items: center;
}

.status-text {
  margin-right: 15px;
  font-size: 1em;
  color: #555;
}

/* Toggle Container Styling */
.toggle-container {
  position: relative;
  width: 150px;
  height: 40px;
  background-color: #C2CFC2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.toggle-option {
  width: 50%;
  text-align: center;
  font-weight: bold;
  color: #333;
  transition: color 0.3s;
}

.toggle-option.active {
  color: rgb(24, 24, 24);
}

.toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: #636963;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.toggle-slider.slide-right {
  transform: translateX(100%);
}

/* Log Out button styling */
.logout-button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #c79aa4;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>
