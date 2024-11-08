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
                <textarea class="form-input register-style address-textarea alamat-lengkap" placeholder="Alamat lengkap"></textarea>
                <p class="required-text">*required</p>
            </div>

            <!-- Phone Number and Business Hours -->
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">No. Telepon</label>
                    <input type="text" class="form-input register-style" placeholder="No. Telepon" />
                    <p class="required-text">*required</p>
                </div>
                <div class="form-group">
                    <label class="form-label">Jam Buka</label>
                    <input type="time" class="form-input small-input" /> 
                    <span>-</span>
                    <input type="time" class="form-input small-input" />
                    <p class="required-text">*required</p>
                </div>
            </div>
  
        <!-- Branch Selection and Price Range -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Cabang</label>
            <div>
              <input type="radio" id="yes" name="branch" />
              <label for="yes">Iya</label>
              <input type="radio" id="no" name="branch" />
              <label for="no">Tidak</label>
            </div>
            <p class="required-text">*required</p>
          </div>
          <div class="form-group">
            <label class="form-label">Range Harga</label>
            <div>
              <input type="radio" id="range1" name="price-range" />
              <label for="range1">Di bawah Rp. 50.000 /orang</label><br />
              <input type="radio" id="range2" name="price-range" />
              <label for="range2">Rp. 50.000 - Rp. 100.000 /orang</label><br />
              <input type="radio" id="range3" name="price-range" />
              <label for="range3">Rp. 100.000 - Rp. 200.000 /orang</label><br />
              <input type="radio" id="range4" name="price-range" />
              <label for="range4">Di atas Rp. 200.000 /orang</label>
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
                        :class="['option-button', { 'selected-option': selectedCuisine === option }]"
                        @click="selectCuisine(option)"
                    >
                        {{ option }}
                    </button>
                </div>
            </div>
  
        <div class="form-group">
          <label class="form-label">Fasilitas</label>
          <div class="options-group">
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
          </div>
        </div>
  
        <div class="form-group">
          <label class="form-label">Metode Pembayaran</label>
          <div class="options-group">
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
            <button class="option-button">Option 1</button>
          </div>
        </div>
  
        <button class="save-button">Simpan</button>
      </div>
  
      <!-- Image Section -->
      <div class="image-section">
        <h2 class="section-title">Gambar</h2>
        <div class="tabs">
          <button class="tab-button active">Galeri</button>
          <button class="tab-button">Menu</button>
        </div>
        <div class="image-grid">
          <div class="image-item" v-for="n in 8" :key="n">
            <div class="remove-button">−</div>
            <img src="/Dadu1.png" alt="Image" class="image-preview" />
          </div>
          <div class="image-item add-item">
            <div class="add-button">+</div>
            <p>Tambahkan</p>
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
      name: "RestaurantKonten",
      data() {
          return {
              // Cuisine options for Tipe Kuliner
              cuisineOptions: [
                  "Barat", "Arab/Timur Tengah", "Jerman", "Toko Roti", "Vietnam",
                  "Lounge", "Kafe", "Hawaii", "Thailand", "Cafe", "Argentina",
                  "China", "Belanda", "Korea", "Bubble Tea", "India", "Meksiko",
                  "Dessert", "Italia", "Es Krim", "Salad", "Singapura", "Brasil", "Yoghurt"
              ],
              selectedCuisine: null,
          };
      },
      methods: {
          selectCuisine(option) {
              this.selectedCuisine = option; // Set the selected option
          },
      },
  };
  </script>
  
  <style scoped>
  .content-container {
      width: 80%;
      margin: auto;
      padding: 20px;
  }
    
  /* Title Section */
  .title-section {
      background: linear-gradient(to right, #9CA69C, #636963); /* Gradient background */
      text-align: center;
      padding: 30px;
      width: 100%;
      margin-top: 80px; /* Additional top margin to prevent overlap with navbar */
  }
    
  .title {
      font-size: 3em; /* Larger font size */
      color: #ffffff; /* White text color */
      font-weight: bold;
      margin: 0;
  }
    
  /* Form Section Styles */
  .form-section {
      background-color: #f6f1ed;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
  }
  
  .form-group {
      margin-bottom: 15px;
  }
  
  .form-label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
  }
    
  .form-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
  }
    
  .small-input {
      width: 80px;
  }
    
  .required-text {
      color: red;
      font-size: 0.8em;
  }
    
  .form-row {
      display: flex;
      gap: 20px;
  }
    
  /* Styles for Tipe Kuliner Option Buttons */
  .options-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
  }
    
  .option-button {
      background-color: #d3d3d3;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover and selected state */
  }
  .option-button:hover {
      background-color: #9ca69c; /* Darker shade on hover */
      color: white;
  }
  .selected-option {
      background-color: #636963; /* Darker shade when selected */
      color: white;
  }
  
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
  }
    
  .section-title {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 10px;
  }
    
  .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
  }
    
  .tab-button {
      background-color: #c5c5c5;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
  }
    
  .tab-button.active {
      background-color: #9CA69C;
      color: #ffffff;
  }
    
  .image-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 20px;
  }
    
  .image-item {
      position: relative;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
  }
    
  .image-preview {
      width: 50px;
      height: 50px;
  }
    
  .remove-button,
  .add-button {
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: #636963;
      color: #ffffff;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
  }
    
  .add-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px dashed #333;
  }
    
  .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
  }
    
  .pagination-button {
      background: none;
      border: none;
      font-size: 1.2em;
      cursor: pointer;
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
  </style>
  