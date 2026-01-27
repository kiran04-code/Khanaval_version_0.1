export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // ❗ Check if any value is missing
    if (
        lat1 == null || lon1 == null ||
        lat2 == null || lon2 == null
    ) {
        return null; // or "Location unavailable"
    }

    // ❗ Convert to number (important)
    lat1 = Number(lat1);
    lon1 = Number(lon1);
    lat2 = Number(lat2);
    lon2 = Number(lon2);

    if (
        isNaN(lat1) || isNaN(lon1) ||
        isNaN(lat2) || isNaN(lon2)
    ) {
        return null;
    }

    const R = 6371; // Earth radius in KM
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Number(distance.toFixed(2)); // km
};
