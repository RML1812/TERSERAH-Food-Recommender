<template>
    <!-- Title Section -->
    <div class="title-section">
        <h1 class="title">Konten</h1>
    </div>
    
    <div class="content-container">
        <!-- Form Section -->
        <div class="form-section">
          <!-- Address Field -->
          <div class="form-group">
            <label class="form-label">Alamat Lengkap</label>
            <textarea class="form-input register-style alamat-lengkap" placeholder="Alamat Lengkap"></textarea>
            <p class="required-text">*required</p>
          </div>
    
          <!-- Phone Number and Business Hours -->
          <div class="form-row">
            <div class="form-group form-group-half">
              <label class="form-label">No. Telepon</label>
              <input type="text" class="form-input register-style" placeholder="No. Telepon" />
              <p class="required-text">*required</p>
            </div>
            <div class="form-group form-group-half">
              <label class="form-label">Jam Buka</label>
              <div class="flex items-center jam-buka-container">
                <input type="time" class="form-input wide-time-input" />
                <span>-</span>
                <input type="time" class="form-input wide-time-input" />
              </div>
              <p class="required-text">*required</p>
            </div>
          </div>
    
          <!-- Branch Selection and Price Range -->
          <div class="form-row">
            <div class="form-group form-group-half">
              <label class="form-label">Cabang</label>
              <div class="radio-group">
                <input type="radio" id="yes" name="branch" />
                <label for="yes">Iya</label>
                <input type="radio" id="no" name="branch" />
                <label for="no">Tidak</label>
              </div>
              <p class="required-text">*required</p>
            </div>
            <div class="form-group form-group-half">
              <label class="form-label">Range Harga</label>
              <div class="radio-group-vertical">
                <div>
                  <input type="radio" id="range1" name="price-range" />
                  <label for="range1">Di bawah Rp. 50.000 /orang</label>
                </div>
                <div>
                  <input type="radio" id="range2" name="price-range" />
                  <label for="range2">Rp. 50.000 - Rp. 100.000 /orang</label>
                </div>
                <div>
                  <input type="radio" id="range3" name="price-range" />
                  <label for="range3">Rp. 100.000 - Rp. 200.000 /orang</label>
                </div>
                <div>
                  <input type="radio" id="range4" name="price-range" />
                  <label for="range4">Di atas Rp. 200.000 /orang</label>
                </div>
              </div>
              <p class="required-text">*required</p>
            </div>
          </div>
    
          <!-- Cuisine Type (Tipe Kuliner) -->
          <div class="form-group">
            <label class="form-label">Tipe Kuliner</label>
            <div class="options-group">
              <button
                v-for="(option, index) in cuisineOptions"
                :key="index"
                :class="['option-button', { 'selected-option': selectedCuisine.includes(option) }]"
                @click="toggleCuisine(option)"
              >
                {{ option }}
              </button>
            </div>
          </div>
    
          <!-- Facilities -->
          <div class="form-group">
            <label class="form-label">Fasilitas</label>
            <div class="options-group">
              <button
                v-for="(facility, index) in facilitiesOptions"
                :key="index"
                :class="['option-button', { 'selected-option': selectedFacilities.includes(facility) }]"
                @click="toggleFacility(facility)"
              >
                {{ facility }}
              </button>
            </div>
          </div>
    
          <!-- Payment Method -->
          <div class="form-group">
            <label class="form-label">Metode Pembayaran</label>
            <div class="options-group">
              <button
                v-for="(payment, index) in paymentMethods"
                :key="index"
                :class="['option-button', { 'selected-option': selectedPayments.includes(payment) }]"
                @click="togglePayment(payment)"
              >
                {{ payment }}
              </button>
            </div>
          </div>
    
          <button class="save-button">Simpan</button>
        </div>
  
<!-- Image Section -->
<div class="image-section">
  <h2 class="section-title">Gambar</h2>
  <div class="tabs">
    <button 
      class="tab-button" 
      :class="{ active: activeTab === 'Galeri' }" 
      @click="activeTab = 'Galeri'">
      Galeri
    </button>
    <button 
      class="tab-button" 
      :class="{ active: activeTab === 'Menu' }" 
      @click="activeTab = 'Menu'">
      Menu
    </button>
  </div>
  <div class="image-grid">
    <div class="image-item" v-for="n in 7" :key="n">
      <button class="remove-button">−</button>
      <div class="image-placeholder">
        <img src="/Dadu1.png" alt="Image" class="image-preview" />
      </div>
    </div>
    <div class="add-item">
      <div class="add-content">
        <input type="file" id="fileUpload" accept=".png,.jpg" style="display: none;" @change="handleFileUpload" />
        <button class="add-button" @click="triggerFileUpload">+</button>
        <p class="add-text">Tambahkan</p>
      </div>
    </div>
  </div>
  <div class="pagination">
    <button class="pagination-button">«</button>
    <button class="pagination-button">‹</button>
    <span>1 dari 3</span>
    <button class="pagination-button">›</button>
    <button class="pagination-button">»</button>
  </div>
  <button class="save-button">Simpan</button>
</div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        cuisineOptions: [
          "Barat", "Arab/Timur Tengah", "Jerman", "Toko Roti", "Vietnam",
          "Lounge", "Kafe", "Hawaii", "Thailand", "Cafe", "Argentina",
          "China", "Belanda", "Korea", "Bubble Tea", "India", "Meksiko",
          "Dessert", "Italia", "Es Krim", "Salad", "Singapura", "Brasil", "Yoghurt"
        ],
        facilitiesOptions: [
          "Bisa Reservasi", "Alkohol", "Vegetarian", "Area Parkir", "Area Outdoor",
          "Area Merokok", "Wi-Fi", "Pesan Antar", "Ruang VIP", "100% Halal", "24 Jam"
        ],
        paymentMethods: [
          "Debet", "Dana", "Go-Pay", "Master", "Ovo", "Visa", "Tunai"
        ],
        selectedCuisine: [],
        selectedFacilities: [],
        selectedPayments: [],
        activeTab: 'Galeri', // Default active tab
      };
    },
    methods: {
      toggleCuisine(option) {
        if (this.selectedCuisine.includes(option)) {
          this.selectedCuisine = this.selectedCuisine.filter(item => item !== option);
        } else {
          this.selectedCuisine.push(option);
        }
      },
      toggleFacility(facility) {
        if (this.selectedFacilities.includes(facility)) {
          this.selectedFacilities = this.selectedFacilities.filter(item => item !== facility);
        } else {
          this.selectedFacilities.push(facility);
        }
      },
      togglePayment(payment) {
        if (this.selectedPayments.includes(payment)) {
          this.selectedPayments = this.selectedPayments.filter(item => item !== payment);
        } else {
          this.selectedPayments.push(payment);
        }
      },
      triggerFileUpload() {
        // Trigger klik input file secara manual
        const fileInput = document.getElementById("fileUpload");
        if (fileInput) {
          fileInput.click();
        }
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const fileType = file.type;
          // Validasi tipe file
          if (fileType === "image/png" || fileType === "image/jpeg") {
            alert(`File ${file.name} berhasil diunggah!`);
            // Anda dapat menambahkan logika tambahan untuk menangani file, seperti mengunggah ke server
          } else {
            alert("Format file tidak valid. Silakan unggah file .png atau .jpg.");
          }
        }
      },
    }
  };
  </script>
  
  <style scoped>
  /* Content Container */
  .content-container {
    width: 80%;
    margin: auto;
    padding: 20px;
  }
  
  /* Title Section */
  .title-section {
    background: linear-gradient(to right, #9CA69C, #636963);
    text-align: center;
    padding: 30px;
    width: 100%;
    margin-top: 80px;
  }
  
  .title {
    font-size: 3em;
    color: #ffffff;
    font-weight: bold;
    margin: 0;
  }
  
  /* Form Section */
  .form-section {
    background-color: #f6f1ed;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px; /* Tambahkan jarak di bawah form-section */
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group-half {
    width: 48%;
  }
  
  .form-label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  .register-style {
    background-color: #D3D3D3;
    border: 1px solid #333;
    padding-left: 20px;
    color: #333;
    height: 40px;
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
  }
  
  .alamat-lengkap {
    height: 80px;
  }
  
  .wide-time-input {
    width: 120px;
  }
  
  .jam-buka-container {
    gap: 10px;
    padding: 5px 0;
  }
  
  .required-text {
    color: red;
    font-size: 0.8em;
  }
  
  /* Form Row Layout */
  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
  
  /* Radio Group */
  .radio-group {
    display: flex;
    gap: 10px;
  }
  
  /* Radio Group for Vertical Layout (Range Harga) */
  .radio-group-vertical {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  /* Option Buttons */
  .options-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .option-button {
    background-color: #d3d3d3;
    border: none;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .option-button:hover {
    background-color: #9ca69c;
    color: white;
  }
  
  .selected-option {
    background-color: #636963;
    color: white;
  }
  
  /* Save Button */
  .save-button {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }
    
  .image-section {
    background-color: #f6f1ed;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 40px; /* Tambahkan jarak di atas image-section */
  }
  
  .section-title {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  .tabs {
    display: flex;
    border: 1px solid #9CA69C;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    width: fit-content;
  }
  
  .tab-button {
    flex: 1;
    padding: 10px 20px;
    border: none;
    background-color: #f6f1ed;
    color: #636963;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .tab-button.active {
    background-color: #9CA69C;
    color: #ffffff;
  }
  
  .tab-button:not(.active):hover {
    background-color: #e0e0e0;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  
  .image-item {
    position: relative;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1; /* Ensures the box is a square */
  }
  
  .image-preview {
    width: 50px;
    height: 50px;
  }
  
  .remove-button {
    position: absolute;
    top: -15px; /* Move further outside for larger size */
    right: -15px;
    background-color: #636963;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 40px; /* Larger width */
    height: 40px; /* Larger height */
    font-size: 24px; /* Bigger font size */
    line-height: 38px; /* Adjusted line height for centering */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Shadow for emphasis */
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .remove-button:hover {
    background-color: #4c4c4c; /* Darker hover effect */
    transform: scale(1.1); /* Slightly enlarges on hover */
  }
  
  .add-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    border: 1px dashed #636963;
    border-radius: 8px;
    aspect-ratio: 1 / 1; /* Membuat kotak persegi */
  }
  
  .add-content {
    text-align: center;
  }
  
  .add-button {
    background-color: #636963;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 40px; /* Ukuran tombol */
    height: 40px;
    font-size: 20px; /* Ukuran teks */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }
  
  .add-button:hover {
    background-color: #4c4c4c;
  }
  
  .add-text {
    font-size: 14px;
    color: #636963;
    margin: 0;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
  }
  
  .pagination-button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  
  .save-button {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
  }
  
  
  /* New Styles Matching Register.vue */
  .register-style {
      background-color: #D3D3D3;
      border: 1px solid #333;
      padding-left: 20px;
      color: #333;
      height: 40px; /* Adjusted height to match register style */
      border-radius: 20px; /* Rounded edges */
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
  }
  .alamat-lengkap {
      height: 150px; /* Increased height for address */
  }
  
  /* Small input for business hours */
  .small-input {
      width: 80px;
  }
  
  /* Required Text */
  .required-text {
      color: red;
      font-size: 0.8em;
  }
  
  /* Form Row Layout */
  .form-row {
      display: flex;
      gap: 20px;
  }
  /* Tombol Simpan di Form Section */
.form-section .save-button {
  display: block;
  margin-left: auto; /* Membuat tombol bergerak ke kanan */
  margin-top: 20px;
}

/* Tombol Simpan di Image Section */
.image-section .save-button {
  display: block;
  margin-left: auto; /* Membuat tombol bergerak ke kanan */
  margin-top: 20px;
}

  </style>
  