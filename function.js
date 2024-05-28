async function getRandomRestaurants(size) {
    try {
        const topRestaurants = await Restaurant.aggregate([
            { $match: { overall_rating: { $gte: 4.5, $lte: 5.0 } } }, // Memfilter restoran dengan rating antara 4.5 dan 5.0
            { $sample: { size } }, // Mengambil restoran secara acak sesuai dengan nilai size yang diberikan
            { $sort: { overall_rating: -1 } } // Mengurutkan hasil berdasarkan rating secara descending
        ]);
        return topRestaurants;
    } catch (error) {
        throw new Error("Gagal mengambil restoran acak");
    }
}

module.exports = {
    getRandomRestaurants
}