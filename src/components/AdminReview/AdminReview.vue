<template>
    <div>
      <!-- Title Section -->
      <div class="title-section">
        <h1 class="title">Review <span class="highlight">Akun Restaurant</span></h1>
      </div>
      <div class="review-container">
        <!-- Sidebar Card for Tabs -->
        <div class="sidebar-card">
          <div class="tab-options">
            <button
              class="tab-option"
              :class="{ active: activeTab === 'Pending' }"
              @click="setActiveTab('Pending')"
            >
              Pending
            </button>
            <button
              class="tab-option"
              :class="{ active: activeTab === 'Rejected' }"
              @click="setActiveTab('Rejected')"
            >
              Rejected
            </button>
          </div>
        </div>
  
        <!-- Main Content -->
        <div class="content">
          <div class="account-list">
            <div
              class="account-card"
              v-for="account in paginatedAccounts"
              :key="account.id"
              @click="openPopup(account)"
            >
              {{ account.name }}
            </div>
          </div>
          <div class="pagination">
            <button class="pagination-button" @click="goToFirstPage">«</button>
            <button class="pagination-button" @click="previousPage">‹</button>
            <span>{{ currentPage }} dari {{ totalPages }}</span>
            <button class="pagination-button" @click="nextPage">›</button>
            <button class="pagination-button" @click="goToLastPage">»</button>
          </div>
        </div>
      </div>
  
    <!-- Popup Modal -->
    <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content wider-popup">
          <!-- Popup Header -->
          <div class="popup-header bg-gradient">
            <h2 class="popup-title">{{ selectedAccount.name }}</h2>
            <button @click="closePopup" class="close-button">✕</button>
          </div>
  
          <div class="popup-body grid grid-cols-2 gap-10"> <!-- Gap antar kolom lebih besar -->
            <!-- Badan Usaha -->
            <div>
              <h3 class="section-title">Badan Usaha</h3>
              <label>Nama Usaha</label>
              <input class="popup-input" type="text" :value="selectedAccount.businessName" disabled />
              <label>No. Telepon</label>
              <input class="popup-input" type="text" :value="selectedAccount.phoneNumber" disabled />
              <label>Tipe Usaha</label>
              <div>
                <input type="radio" value="UMKM" v-model="selectedAccount.businessType" disabled /> UMKM
                <input type="radio" value="Perusahaan" v-model="selectedAccount.businessType" disabled /> Perusahaan
              </div>
              <label v-if="selectedAccount.businessType === 'Perusahaan'">Nama Perusahaan</label>
              <input
                v-if="selectedAccount.businessType === 'Perusahaan'"
                class="popup-input"
                type="text"
                :value="selectedAccount.companyName"
                disabled
              />
              <label>Alamat Lengkap</label>
              <textarea class="popup-input" :value="selectedAccount.address" disabled></textarea>
              <label>NPWP</label>
              <input class="popup-input" type="text" :value="selectedAccount.npwp" disabled />
              <label>Foto NPWP</label>
              <div class="download-container">
                <button class="popup-download-button" @click="downloadFile(selectedAccount.npwpPhoto)">Download</button>
              </div>
            </div>
  
            <!-- Identitas Pemilik -->
            <div>
              <h3 class="section-title">Identitas Pemilik</h3>
              <label>Nama Lengkap</label>
              <input class="popup-input" type="text" :value="selectedAccount.ownerName" disabled />
              <label>NIK</label>
              <input class="popup-input" type="text" :value="selectedAccount.nik" disabled />
              <label>Jenis Kelamin</label>
              <div>
                <input type="radio" value="Laki-laki" v-model="selectedAccount.gender" disabled /> Laki-laki
                <input type="radio" value="Perempuan" v-model="selectedAccount.gender" disabled /> Perempuan
              </div>
              <label>Tanggal Lahir</label>
              <input class="popup-input" type="date" :value="selectedAccount.dateOfBirth" disabled />
              <label>No. Handphone</label>
              <input class="popup-input" type="text" :value="selectedAccount.ownerPhoneNumber" disabled />
              <label>Domisili</label>
              <input class="popup-input" type="text" :value="selectedAccount.domicile.province" disabled />
              <input class="popup-input" type="text" :value="selectedAccount.domicile.city" disabled />
              <input class="popup-input" type="text" :value="selectedAccount.domicile.district" disabled />
              <label>Foto KTP</label>
              <div class="download-container">
                <button class="popup-download-button" @click="downloadFile(selectedAccount.ktpPhoto)">Download</button>
              </div>
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="accept-button" @click="acceptAccount">✔ Accept</button>
            <button class="reject-button" @click="rejectAccount">✘ Reject</button>
          </div>
  
          <!-- Reject Reason -->
          <div v-if="isRejecting" class="reject-reason">
            <textarea v-model="rejectReason" placeholder="Alasan Reject"></textarea>
            <button @click="confirmReject" class="confirm-reject-button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  <script>
  export default {
    data() {
    return {
      activeTab: "Pending",
      currentPage: 1,
      accountsPerPage: 5,
      showPopup: false,
      isRejecting: false,
      rejectReason: "",
      selectedAccount: null,
      accounts: Array(15).fill().map((_, index) => ({
        id: index + 1,
        name: `Akun ${index + 1}`,
        businessName: `Usaha ${index + 1}`,
        phoneNumber: "08123456789",
        businessType: index % 2 === 0 ? "Perusahaan" : "UMKM", // Alternating types
        companyName: index % 2 === 0 ? `Perusahaan ${index + 1}` : null,
        address: `Alamat ${index + 1}`,
        npwp: `12345678${index}`,
        npwpPhoto: `npwp-${index + 1}.jpg`,
        ownerName: `Pemilik ${index + 1}`,
        nik: `123456789012345${index}`,
        gender: index % 2 === 0 ? "Laki-laki" : "Perempuan",
        dateOfBirth: "1990-01-01",
        ownerPhoneNumber: "08123456789",
        domicile: {
          province: "Jawa Barat",
          city: "Bandung",
          district: "Cimahi",
        },
        ktpPhoto: `ktp-${index + 1}.jpg`,
      })),
    };
  },
    computed: {
      totalPages() {
        return Math.ceil(this.accounts.length / this.accountsPerPage);
      },
      paginatedAccounts() {
        const start = (this.currentPage - 1) * this.accountsPerPage;
        const end = start + this.accountsPerPage;
        return this.accounts.slice(start, end);
      },
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
        this.currentPage = 1;
      },
      previousPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
      goToFirstPage() {
        this.currentPage = 1;
      },
      goToLastPage() {
        this.currentPage = this.totalPages;
      },
      openPopup(account) {
        this.selectedAccount = account;
        this.showPopup = true;
      },
      closePopup() {
        this.showPopup = false;
        this.isRejecting = false;
        this.rejectReason = "";
      },
      downloadFile(fileName) {
        alert(`Downloading: ${fileName}`);
        },
      acceptAccount() {
        alert(`Account ${this.selectedAccount.name} accepted!`);
        this.closePopup();
      },
      rejectAccount() {
        this.isRejecting = true;
      },
      confirmReject() {
        if (this.rejectReason.trim()) {
          alert(
            `Account ${this.selectedAccount.name} rejected for reason: ${this.rejectReason}`
          );
          this.closePopup();
        } else {
          alert("Please provide a reason for rejection.");
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Title Section */
  .title-section {
    background: linear-gradient(to right, #9ca69c, #636963);
    text-align: center;
    padding: 30px;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 80px;
  }
  
  .title {
    font-size: 2.5em;
    color: #ffffff;
    font-weight: bold;
  }
  
  .highlight {
    color: #dfe8df;
  }
  
  /* Main Container */
  .review-container {
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  /* Sidebar Card */
  .sidebar-card {
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 150px;
    height: 150px; /* Fixed height to ensure it is a square-like box */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .tab-options {
    display: flex;
    flex-direction: column; /* Arrange buttons vertically */
    gap: 10px;
  }
  
  .tab-option {
    background-color: #f2f2f2;
    border: none;
    padding: 10px 20px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    border-radius: 8px;
    font-size: 0.9em; /* Adjust font size for better fit */
    width: 100%; /* Full width of the card */
  }
  
  .tab-option.active {
    background-color: #636963;
    color: #fff;
  }
  
  /* Content */
  .content {
    flex: 1;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 40px;
  }
  
  .account-list {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Increased spacing between account cards */
  }
  
  .account-card {
    background-color: #636963;
    color: #ffffff;
    padding: 30px; /* Increased padding to make the card larger */
    font-size: 1.2em; /* Increased font size for better visibility */
    border-radius: 12px; /* Slightly more rounded edges */
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for a better look */
    transition: transform 0.2s, box-shadow 0.2s; /* Add hover animation */
  }
  
  .account-card:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Stronger shadow on hover */
  }
  
  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .pagination-button {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }
  
  .pagination-button:hover {
    color: #636963;
  }
   /* Popup Styles */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background-color: #fff;
    border-radius: 8px;
    width: 80%; /* Membuat popup lebih lebar */
    max-width: 1200px;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, #cedbce, #8c958c, #5c665c); /* Gradient */
    border-radius: 8px 8px 0 0;
    padding: 20px;
    color: white;
    width: calc(100% + 40px); /* Memperlebar header agar penuh */
    margin-left: -20px; /* Membuat header ke kiri penuh */
    margin-right: -20px; /* Membuat header ke kanan penuh */
    margin-top: -20px;
    margin-bottom: 20px;
  }

  .popup-title {
    font-size: 1.8em;
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
  }
  
  .popup-header h2 {
    margin: 0;
    font-size: 1.5em;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
  }
  
  .popup-body p {
    margin: 10px 0;
    font-size: 1em;
  }
  
  .action-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  .accept-button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .reject-button {
    background-color: #dc3545;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .reject-reason textarea {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1em;
  }
  .confirm-reject-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  .confirm-reject-button:hover {
    background-color: #0056b3;
  }
  .popup-title {
    font-size: 1.8em;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .popup-input {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    padding: 8px;
    font-size: 1em;
    margin-bottom: 20px; /* Menambahkan jarak antar elemen */
  }
  
  .download-container {
    margin-top: 5px; /* Memberi sedikit jarak */
    display: flex;
    justify-content: flex-start;
  }

  .popup-download-button {
    background-color: #007bff;
    color: white;
    padding: 5px 10px; /* Membuat tombol lebih kecil */
    font-size: 0.9em; /* Ukuran font lebih kecil */
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .popup-download-button:hover {
    background-color: #0056b3;
  }
  
  .section-title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .grid {
    display: grid;
    gap: 20px;
  }
  
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  