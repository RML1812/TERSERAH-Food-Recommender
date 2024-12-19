<template>
    <div>
        <Navbar />
        <component :is="dashboardComponent" />
        <Footer />
    </div>
</template>

<script>
import Navbar from '@/components/NavbarFooterRestaurant/Navbar.vue';
import MainDashboard from '@/components/RestDashboard/MainDashboardRest.vue';
import PendingDashboard from '@/components/RestDashboard/DasboardPending.vue';
import DasboardFailed from '@/components/RestDashboard/DasboardFailed.vue';
import Footer from '@/components/NavbarFooterRestaurant/Footer.vue';
import axios from 'axios';

export default {
    components: {
        Navbar,
        MainDashboard,
        PendingDashboard,
        DasboardFailed,
        Footer
    },
    data() {
        return {
            dashboardComponent: null
        };
    },
    async created() {
        try {
            const response = await axios.get('/api/restaurant-dashboard/status'); // Endpoint untuk cek status
            const status = response.data.status;

            if (status === 'Pending') {
                this.dashboardComponent = 'PendingDashboard';
            } else if (status === 'Failed') {
                this.dashboardComponent = 'DasboardFailed';
            } else {
                this.dashboardComponent = 'MainDashboard';
            }
        } catch (error) {
            console.error('Error fetching dashboard status:', error);
        }
    }
};
</script>