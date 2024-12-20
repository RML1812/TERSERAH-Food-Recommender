<template>
      <!-- Title Section -->
      <div class="title-section">
        <h1 class="title">Konten</h1>
      </div>

  <div class="content-container">
    <!-- Form Section -->
    <div class="form-section">
      <!-- Wrapper untuk tombol Preview -->
      <div class="form-header">
        <button class="preview-button" @click="fetchPreviewData">Preview Konten-Mu</button>
      </div>
    
      <!-- Modal -->
      <div v-if="showPreview" class="modal-overlay" @click="closePreview">
        <div class="modal-content" @click.stop>
          <h3>Preview Data</h3>
          <div class="preview-item" v-if="previewData">
            <p><strong>Nama:</strong> {{ previewData.name }}</p>
            <p><strong>Tipe Kuliner:</strong> {{ previewData.culinary_type }}</p>
            <p><strong>Alamat:</strong> {{ previewData.address }}</p>
            <p><strong>Metode Pembayaran:</strong> {{ previewData.payment_methods }}</p>
            <p><strong>Range Harga:</strong> {{ previewData.price_range }}</p>
            <p><strong>Fasilitas Tersedia:</strong> {{ previewData.available_facilities }}</p>
            <p><strong>Fasilitas Tidak Tersedia:</strong> {{ previewData.unavailable_facilities }}</p>
            <p style="white-space: pre-wrap;">
              <strong>Jam Buka:</strong> {{ formatSchedule(previewData.open_schedule) }}
            </p>
            <p><strong>No. Telepon:</strong> {{ previewData.phone }}</p>
            <p><strong>Cabang:</strong> {{ previewData.is_branch ? 'Iya' : 'Tidak' }}</p>
          </div>
          <button class="close-modal" @click="closePreview">Tutup</button>
        </div>
      </div>

    
      <!-- Address Field -->
      <div class="form-group">
        <label class="form-label">Alamat Lengkap</label>
        <textarea
          v-model="formData.address"
          class="form-input register-style alamat-lengkap"
          placeholder="Alamat Lengkap"
        ></textarea>
        <p class="required-text">*required</p>
      </div>
    

      <!-- Phone Number -->
      <div class="form-row">
        <div class="form-group form-group-half">
          <label class="form-label">No. Telepon</label>
          <input v-model="formData.phone" type="text" class="form-input register-style" placeholder="No. Telepon" />
          <p class="required-text">*required</p>
        </div>
      </div>

      <!-- Slot Field -->
      <div class="form-group">
        <label class="form-label">Slot</label>
        <input 
          v-model="formData.slot" 
          type="number" 
          class="form-input register-style small-input" 
          placeholder="Jumlah Slot" 
        />
        <p class="required-text">*required</p>
      </div>

      <!-- Open Schedule -->
      <div class="form-group">
        <label class="form-label">Jam Buka</label>
        <div class="open-schedule">
          <div class="form-row" v-for="(schedule, day) in formData.open_schedule" :key="day">
            <label class="form-label form-group-half">{{ day }}</label>
            <div class="form-group-half flex items-center jam-buka-container">
              <input 
                type="time" 
                class="form-input wide-time-input" 
                v-model="formData.open_schedule[day].open" 
                :class="{ hidden: formData.open_schedule[day].closed }"
              />
              <span :class="{ hidden: formData.open_schedule[day].closed }">-</span>
              <input 
                type="time" 
                class="form-input wide-time-input" 
                v-model="formData.open_schedule[day].close" 
                :class="{ hidden: formData.open_schedule[day].closed }"
              />
              <div class="checkbox-container">
                <label>
                  <input 
                    type="checkbox" 
                    v-model="formData.open_schedule[day].closed"
                  />
                  Closed
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <!-- Branch Selection -->
      <div class="form-group form-group-half">
        <label class="form-label">Cabang</label>
        <div class="radio-group">
          <input type="radio" id="yes" name="branch" value="on" v-model="formData.is_branch" />
          <label for="yes">Iya</label>
          <input type="radio" id="no" name="branch" value="off" v-model="formData.is_branch" />
          <label for="no">Tidak</label>
        </div>
        <p class="required-text">*required</p>
      </div>

      <!-- Price Range -->
      <div class="form-group form-group-half">
        <label class="form-label">Range Harga</label>
        <div class="radio-group-vertical">
          <div v-for="(range, index) in priceRangeOptions" :key="index">
            <input type="radio" :id="'range' + index" name="price-range" :value="range" v-model="formData.price_range" />
            <label :for="'range' + index">{{ range }}</label>
          </div>
        </div>
        <p class="required-text">*required</p>
      </div>

      <!-- Cuisine Type -->
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
          <button class="add-option-button" @click="addCustomOption('Cuisine')">+</button>
        </div>
      </div>

      <!-- Available Facilities -->
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
          <button class="add-option-button" @click="addCustomOption('Facility')">+</button>
        </div>
      </div>

      <!-- Unavailable Facilities -->
      <div class="form-group">
        <label class="form-label">Fasilitas Tidak Tersedia</label>
        <div class="options-group">
          <button
            v-for="(unavailable, index) in unavailableFacilitiesOptions"
            :key="index"
            :class="['option-button', { 'selected-option': selectedUnavailable.includes(unavailable) }]"
            @click="toggleUnavailable(unavailable)"
          >
            {{ unavailable }}
          </button>
          <button class="add-option-button" @click="addCustomOption('Unavailable')">+</button>
        </div>
      </div>

      <!-- Payment Methods -->
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

      <!-- Save Button -->
      <button class="save-button" @click="saveData">Simpan</button>
    </div>

    <div class="image-section">
      <h2 class="section-title">Gambar</h2>
      <div class="tabs">
        <button class="tab-button" :class="{ active: activeTab === 'Galeri' }" @click="activeTab = 'Galeri'">Galeri</button>
        <button class="tab-button" :class="{ active: activeTab === 'Menu' }" @click="activeTab = 'Menu'">Menu</button>
      </div>
      <div class="image-grid">
        <!-- Loop untuk menampilkan gambar -->
      <div class="image-item"
          v-for="(image, index) in getImagesByTab()"
          :key="index">
          <button class="remove-button" @click="removeImage(index)">−</button>
          <div class="image-placeholder">
              <!-- Pastikan src mengikat ke image.url yang merupakan URL pratinjau -->
              <img :src="image.url" alt="Image Preview" class="image-preview" />
          </div>
      </div>
        <!-- Form untuk menambahkan gambar baru -->
        <div class="add-item">
          <div class="add-content">
            <input
              type="file"
              id="fileUpload"
              accept=".png,.jpg"
              style="display: none;"
              @change="handleFileUpload"
            />
            <button class="add-button" @click="triggerFileUpload">+</button>
            <p class="add-text">Tambahkan</p>
          </div>
        </div>
      </div>
      <!-- Navigasi Halaman -->
      <div class="pagination">
        <button class="pagination-button">«</button>
        <button class="pagination-button">‹</button>
        <span>1 dari 3</span>
        <button class="pagination-button">›</button>
        <button class="pagination-button">»</button>
      </div>
      <button class="save-button" @click="saveImages">Simpan</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      restaurantId: localStorage.getItem('restaurantID'), // Memuat ID dari local storage
      galleryImages: [], // Array gambar untuk Galeri
      menuImages: [],    // Array gambar untuk Menu
      activeTab: "Galeri", // Tab yang aktif
      showPreview: false,
      previewData: null,
      submitted: false,
      formData: {
        address: "",
        phone: "",
        is_branch: "",
        price_range: "",
        slot: 0,
        open_schedule: {
          Senin: { open: "", close: "", closed: false },
          Selasa: { open: "", close: "", closed: false },
          Rabu: { open: "", close: "", closed: false },
          Kamis: { open: "", close: "", closed: false },
          Jumat: { open: "", close: "", closed: false },
          Sabtu: { open: "", close: "", closed: false },
          Minggu: { open: "", close: "", closed: false },
        },
      },
      priceRangeOptions: [
        "Di bawah Rp. 50.000 /orang",
        "Rp. 50.000 - Rp. 100.000 /orang",
        "Rp. 100.000 - Rp. 200.000 /orang",
        "Di atas Rp. 200.000 /orang",
      ],
      cuisineOptions: [
        "Barat", "Arab/Timur Tengah", "Jerman", "Toko Roti", "Vietnam",
        "Lounge", "Kafe", "Hawaii", "Thailand", "Cafe", "Argentina",
        "China", "Belanda", "Korea", "Bubble Tea", "India", "Meksiko",
        "Dessert", "Italia", "Es Krim", "Salad", "Singapura", "Brasil", "Yoghurt",
      ],
      facilitiesOptions: [
        "Bisa Reservasi", "Alkohol", "Vegetarian", "Area Parkir", "Area Outdoor",
        "Area Merokok", "Wi-Fi", "Pesan Antar", "Ruang VIP", "100% Halal", "24 Jam",
      ],
      unavailableFacilitiesOptions: ["Playground", "Dine-In", "AC"],
      paymentMethods: ["Debet", "Dana", "Go-Pay", "Master", "Ovo", "Visa", "Tunai"],
      selectedCuisine: [],
      selectedFacilities: [],
      selectedUnavailable: [],
      selectedPayments: [],
      activeTab: "Galeri",
    };
  },
  methods: {
    toggleCuisine(option) {
      this.toggleSelection(option, this.selectedCuisine);
    },
    toggleFacility(facility) {
      this.toggleSelection(facility, this.selectedFacilities);
    },
    toggleUnavailable(unavailable) {
      this.toggleSelection(unavailable, this.selectedUnavailable);
    },
    togglePayment(payment) {
      this.toggleSelection(payment, this.selectedPayments);
    },
    toggleSelection(option, list) {
      const index = list.indexOf(option);
      if (index > -1) {
        list.splice(index, 1);
      } else {
        list.push(option);
      }
    },
    triggerFileUpload() {
      const fileInput = document.getElementById("fileUpload");
      fileInput && fileInput.click();
    },
    // Mendapatkan gambar berdasarkan tab aktif
    getImagesByTab() {
    return this.activeTab === "Galeri" ? this.galleryImages : this.menuImages;
    },
   // Menangani unggah file
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            alert("Tidak ada file yang dipilih.");
            return;
        }

        const fileType = file.type;
        if (fileType !== "image/png" && fileType !== "image/jpeg") {
            alert("Format file tidak valid. Silakan unggah file .png atau .jpg.");
            return;
        }

        // Membuat URL dari file yang diunggah untuk preview
        const fileUrl = URL.createObjectURL(file);

        // Membuat objek untuk menyimpan file dan URL-nya
        const fileData = {
            file: file,
            url: fileUrl
        };

        // Menambahkan objek ini ke array gambar berdasarkan tab aktif
        if (this.activeTab === "Galeri") {
            this.galleryImages.push(fileData);
        } else if (this.activeTab === "Menu") {
            this.menuImages.push(fileData);
        }
    },
    // Menghapus gambar dari daftar
    removeImage(index) {
      if (this.activeTab === "Galeri") {
        this.galleryImages.splice(index, 1);
      } else if (this.activeTab === "Menu") {
        this.menuImages.splice(index, 1);
      }
    },
    // Menyimpan gambar ke backend
      async saveImages() {
        if (!this.restaurantId) {
            alert("ID Restaurant tidak ditemukan.");
            return;
        }

        try {
            const url = this.activeTab === "Galeri"
                ? `${import.meta.env.VITE_BE}/restaurant/upload-image/galeri/${this.restaurantId}`
                : `${import.meta.env.VITE_BE}/restaurant/upload-image/menu/${this.restaurantId}`;

            const images = this.activeTab === "Galeri" ? this.galleryImages : this.menuImages;
            const formData = new FormData();
            images.forEach((fileData) => {
                formData.append("file", fileData.file); // Gunakan file asli untuk upload
            });

            const response = await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert(response.data);
        } catch (error) {
            console.error("Error saving images:", error);
            alert("Terjadi kesalahan saat menyimpan gambar.");
        }
    },
    async saveData() {
      this.submitted = true;

      // Filter formData untuk hanya mengirim data yang diisi
      const payload = {};

      // Periksa setiap field dan tambahkan ke payload hanya jika memiliki nilai
      if (this.formData.address.trim()) payload.address = this.formData.address;
      if (this.formData.phone.trim()) payload.phone = this.formData.phone;
      if (this.formData.slot > 0) payload.slot = this.formData.slot;
      if (this.selectedCuisine.length > 0) payload.culinary_type = this.selectedCuisine;
      if (this.selectedFacilities.length > 0) payload.available_facilities = this.selectedFacilities;
      if (this.selectedUnavailable.length > 0) payload.unavailable_facilities = this.selectedUnavailable;
      if (this.selectedPayments.length > 0) payload.payment_methods = this.selectedPayments;
      if (this.formData.is_branch) payload.is_branch = this.formData.is_branch;
      if (this.formData.price_range) payload.price_range = this.formData.price_range;

      // Kirim hanya hari pada open_schedule yang memiliki perubahan
      if (Object.values(this.formData.open_schedule).some((day) => day.open || day.close || day.closed)) {
        payload.open_schedule = {};
        for (const [day, times] of Object.entries(this.formData.open_schedule)) {
          if (times.closed || times.open || times.close) {
            payload.open_schedule[day] = { ...times }; // Hanya tambahkan hari yang memiliki nilai
          }
        }
      }

      // Validasi required
      if (!payload.address || !payload.phone || !payload.slot || !payload.price_range) {
        alert("Harap isi semua field yang bertanda *required!");
        return;
      }

      try {
        // Kirim data ke backend
        await axios.post(`${import.meta.env.VITE_BE}/restaurant-dashboard/edit-konten`, payload, {
          withCredentials: true,
        });
        alert("Data berhasil disimpan!");
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    },
    async fetchPreviewData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/restaurant-dashboard`);
        this.previewData = response.data.restaurant;
        this.showPreview = true;
      } catch (error) {
        console.error("Error fetching preview data:", error);
        alert("Gagal memuat data preview.");
      }
    },
    closePreview() {
      this.showPreview = false;
    },
    formatSchedule(schedule) {
      const parsedSchedule = JSON.parse(schedule);
        return Object.entries(parsedSchedule)
            .map(([day, times]) => {
                if (times.Closed) {
                    return `${day}: Closed`;
                } else {
                    return `${day}: ${times.open} - ${times.close}`;
                }
            })
            .join("\n");
    },
    addCustomOption(type) {
      const newOption = prompt(`Masukkan opsi baru untuk ${type}:`);
      if (newOption && newOption.trim()) {
        switch (type) {
          case 'Cuisine':
            this.cuisineOptions.push(newOption.trim());
            break;
          case 'Facility':
            this.facilitiesOptions.push(newOption.trim());
            break;
          case 'Unavailable':
            this.unavailableFacilitiesOptions.push(newOption.trim());
            break;
        }
      } else {
        alert("Opsi tidak boleh kosong!");
      }
    },
  },
    unmounted() {
      // Membersihkan semua URL yang telah dibuat
      [...this.galleryImages, ...this.menuImages].forEach(URL.revokeObjectURL);
  },
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
    width: 200px;
    height: 200px;
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
    font-size: 30px; /* Bigger font size */
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
    margin-left: 15px;
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

  /* Form Section Header */
.form-header {
  display: flex;
  justify-content: flex-end; /* Tombol ke kanan */
  margin-bottom: 10px; /* Jarak ke elemen berikutnya */
}
  /* Tombol Preview */
  .preview-button {
    background-color: #636963;
    color: #fff;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .preview-button:hover {
    background-color: #4c4c4c;
  }

  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Modal Content */
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .preview-item p {
    margin: 5px 0;
  }

  .close-modal {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
    width: 100%;
  }

  .close-modal:hover {
    background-color: #4c4c4c;
  }
  .checkbox-container {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  
  .checkbox-container label {
    font-size: 14px;
    margin-left: 5px;
  }
  .add-option-button {
    background-color: #4c4c4c;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    margin-left: 5px;
  }
  
  .add-option-button:hover {
    background-color: #218838;
  }
  .time-placeholder {
    font-size: 14px;
    color: #999;
    font-style: italic;
    margin-left: 10px;
  }
  
  .jam-buka-container input:disabled {
    background-color: #f8f8f8;
    color: transparent;
    text-shadow: 0 0 0 #000; /* Membuat teks benar-benar tidak terlihat */
  }
  .hidden {
    visibility: hidden;
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
  }
  </style>
  