async function updateRestaurantMenuIds() {
    try {
        // Ambil semua restoran dari koleksi Restaurant
        const restaurants = await Restaurant.find({});

        // Loop melalui semua restoran untuk mencocokkan menu berdasarkan link
        for (const restaurant of restaurants) {
            // Temukan menu berdasarkan link yang ada di restaurant
            const menu = await Menu.findOne({ link: restaurant.link });

            if (menu) {
                // Update restoran dengan menu_id dari menu yang ditemukan
                restaurant.menu_id = menu._id;
                await restaurant.save();
                console.log(`Updated restaurant: ${restaurant.name} with menu_id: ${menu._id}`);
            } else {
                console.log(`Menu not found for restaurant: ${restaurant.name}`);
            }
        }

        console.log('All restaurants have been updated with menu_id.');
    } catch (error) {
        console.error('Error updating restaurants with menu_id:', error);
    } finally {
        mongoose.connection.close();
    }
}