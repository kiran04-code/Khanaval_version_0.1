export type CloudKitchenMenuItem = {
    _id: string;
    productName?: string;
    productimage?: string;
    productprice?: number;
    productCategory?: string;
    Visible_to_customers?: boolean;
};

export type CloudKitchenAddress = {
    address?: string;
    houseNo?: string;
    society?: string;
    landmark?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    lat?: number;
    lng?: number;
};

export type CloudKitchenOwnerInfo = {
    _id?: string;
    providerName?: string;
    phoneNumber?: string;
    isPaymentDone?: boolean;
    subscriptionStatus?: string;
};

export type CloudKitchenRecord = {
    _id: string;
    CloudKitchenName?: string;
    CloudKitchenType?: string;
    CloudKitchenFoodCategory?: string;
    CloudKitchenLanguage?: string;
    CloudKitchenContactNumber?: string;
    CloudKitchenWhatsappNumber?: string;
    CloudKitchenimage?: string;
    CloudKitchenAdress?: CloudKitchenAddress;
    CloudKitchenOpenTime?: string;
    CloudKitchenCloseTime?: string;
    CloudKitchenDetails?: string;
    CloudKitchenIsOpen?: boolean;
    KitchenOwnerId?: CloudKitchenOwnerInfo;
    MenuId?: CloudKitchenMenuItem[];
};

export const cloudKitchenPlaceholderImage =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";

export const getVisibleMenuItems = (kitchen: CloudKitchenRecord) =>
    Array.isArray(kitchen.MenuId)
        ? kitchen.MenuId.filter((item) => item.Visible_to_customers !== false)
        : [];

export const getMenuCount = (kitchen: CloudKitchenRecord) => getVisibleMenuItems(kitchen).length;

export const getStartingPrice = (kitchen: CloudKitchenRecord) => {
    const prices = getVisibleMenuItems(kitchen)
        .map((item) => Number(item.productprice || 0))
        .filter((price) => price > 0);

    if (prices.length === 0) {
        return 99;
    }

    return Math.min(...prices);
};

export const getCuisineTags = (source?: string) =>
    (source || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

export const formatPrice = (price: number) => `Rs. ${Math.round(price)}`;

export const formatDeliveryWindow = (kitchen: CloudKitchenRecord) => {
    const menuCount = getMenuCount(kitchen);

    if (menuCount >= 8) {
        return "20-30 min";
    }

    if (menuCount >= 4) {
        return "25-35 min";
    }

    return "30-40 min";
};

export const getDisplayAddress = (kitchen: CloudKitchenRecord) => {
    const address = kitchen.CloudKitchenAdress;

    if (!address) {
        return "Address not available";
    }

    return (
        address.address ||
        [address.landmark, address.city, address.state].filter(Boolean).join(", ") ||
        "Address not available"
    );
};

export const getDisplayCity = (kitchen: CloudKitchenRecord) =>
    kitchen.CloudKitchenAdress?.city || "City not available";

export const getRatingUi = (kitchen: CloudKitchenRecord) => {
    const menuCount = getMenuCount(kitchen);

    if (menuCount >= 8) {
        return 4.7;
    }

    if (menuCount >= 4) {
        return 4.5;
    }

    if (menuCount >= 1) {
        return 4.2;
    }

    return 4.0;
};

export const normalizeCategoryLabel = (label?: string) => {
    const value = (label || "").trim();

    if (!value) {
        return "Main Course";
    }

    return value;
};

export const groupMenuByCategory = (items: CloudKitchenMenuItem[]) => {
    const grouped = new Map<string, CloudKitchenMenuItem[]>();

    items.forEach((item) => {
        const category = normalizeCategoryLabel(item.productCategory);
        const current = grouped.get(category) || [];
        current.push(item);
        grouped.set(category, current);
    });

    const preferredOrder = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Main Course",
        "Snacks",
        "Beverages",
    ];

    const groupedEntries = Array.from(grouped.entries());

    return groupedEntries.sort(([left], [right]) => {
        const leftIndex = preferredOrder.indexOf(left);
        const rightIndex = preferredOrder.indexOf(right);

        if (leftIndex === -1 && rightIndex === -1) {
            return left.localeCompare(right);
        }

        if (leftIndex === -1) {
            return 1;
        }

        if (rightIndex === -1) {
            return -1;
        }

        return leftIndex - rightIndex;
    });
};

export const matchesCloudKitchenFilter = (
    kitchen: CloudKitchenRecord,
    search: string,
    activeFilter: string,
) => {
    const query = search.trim().toLowerCase();
    const visibleMenuItems = getVisibleMenuItems(kitchen);
    const kitchenText = [
        kitchen.CloudKitchenName,
        kitchen.CloudKitchenFoodCategory,
        kitchen.CloudKitchenDetails,
        kitchen.CloudKitchenAdress?.city,
        kitchen.CloudKitchenAdress?.address,
        ...visibleMenuItems.map((item) => item.productName),
        ...visibleMenuItems.map((item) => item.productCategory),
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    if (query && !kitchenText.includes(query)) {
        return false;
    }

    if (!activeFilter || activeFilter === "All") {
        return true;
    }

    if (activeFilter === "Veg") {
        return kitchenText.includes("veg");
    }

    if (activeFilter === "Non-Veg") {
        return kitchenText.includes("non-veg") || kitchenText.includes("chicken");
    }

    return kitchenText.includes(activeFilter.toLowerCase());
};
