const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhhHH2tK4y5oB9__yqJd_3yFUyy7ls5CM",
  authDomain: "elxproperties.firebaseapp.com",
  databaseURL: "https://elxproperties-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elxproperties",
  storageBucket: "elxproperties.appspot.com",
  messagingSenderId: "250975584396",
  appId: "1:250975584396:web:a68528b30098952a313ba9",
  measurementId: "G-PYYQLQ34JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample property listing data
const propertyListings = [
  {
    "title": "Luxury Villa in Emirates Hills",
    "propertyType": "Villas",
    "transactionType": "Sale",
    "price": 25000000,
    "serviceCharges": 5000,
    "financialStatus": "Cash",
    "size": 5500,
    "bedrooms": 5,
    "bathrooms": 6,
    "parkingSpaces": 3,
    "furnishingType": "Furnished",
    "plotSize": 10000,
    "builtUpArea": 5500,
    "layoutType": "Duplex",
    "projectStatus": "Ready",
    "description": "Exclusive villa in the prestigious Emirates Hills community.",
    "amenities": ["Private Pool", "Golf Course View", "Home Cinema"],
    "availability": "Available",
    "exclusivity": {
      "status": true,
      "startDate": "2024-01-01",
      "expiryDate": "2024-12-31"
    },
    "permit": {
      "type": "RERA",
      "reraListingNo": "1234567890"
    },
    "media": {
      "images": ["url1.jpg", "url2.jpg"],
      "videoTour": "videoUrl",
      "360Tour": "360TourUrl"
    },
    "location": {
      "address": "Emirates Hills, Dubai, UAE",
      "unitNo": "101",
      "geoPoint": {
        "lat": 25.1939,
        "lng": 55.2719
      }
    },
    "management": {
      "assignedUser": "Agent ID",
      "owner": "Owner ID"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Downtown Apartment with Burj Khalifa View",
    "propertyType": "Apartments",
    "transactionType": "Rent",
    "price": 5000000,
    "serviceCharges": 3000,
    "financialStatus": "Mortgaged",
    "size": 900,
    "bedrooms": 2,
    "bathrooms": 2,
    "parkingSpaces": 1,
    "furnishingType": "Semi furnished",
    "plotSize": null,
    "builtUpArea": 900,
    "layoutType": "Open Plan",
    "projectStatus": "Off-Plan Primary",
    "description": "Modern apartment located in the heart of Downtown Dubai.",
    "amenities": ["City View", "Modern Kitchen", "Smart Home System", "Gym Access"],
    "availability": "Under Offer",
    "exclusivity": {
      "status": false
    },
    "permit": {
      "type": "DTCM",
      "dtcmPermitNumber": "DTCM123456",
      "validFrom": "2024-08-01",
      "validTo": "2025-08-01"
    },
    "media": {
      "images": ["url3.jpg", "url4.jpg"],
      "videoTour": "videoUrl2",
      "360Tour": "360TourUrl2"
    },
    "location": {
      "address": "Downtown Dubai, UAE",
      "unitNo": "202",
      "geoPoint": {
        "lat": 25.1972,
        "lng": 55.2744
      }
    },
    "management": {
      "assignedUser": "Agent ID 2",
      "owner": "Owner ID 2"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Seafront Villa in Palm Jumeirah",
    "propertyType": "Villas",
    "transactionType": "Rent",
    "price": 20000000,
    "serviceCharges": 4000,
    "financialStatus": "Cash",
    "size": 4500,
    "bedrooms": 4,
    "bathrooms": 5,
    "parkingSpaces": 2,
    "furnishingType": "Unfurnished",
    "plotSize": 8000,
    "builtUpArea": 4500,
    "layoutType": "Traditional",
    "projectStatus": "Ready",
    "description": "Stunning seafront villa with private beach access.",
    "amenities": ["Private Beach Access", "Infinity Pool", "Outdoor Kitchen"],
    "availability": "Available",
    "exclusivity": {
      "status": true,
      "startDate": "2024-06-01",
      "expiryDate": "2025-06-01"
    },
    "permit": {
      "type": "RERA",
      "reraListingNo": "6543210987"
    },
    "media": {
      "images": ["url5.jpg", "url6.jpg"],
      "videoTour": "videoUrl3",
      "360Tour": "360TourUrl3"
    },
    "location": {
      "address": "Palm Jumeirah, Dubai, UAE",
      "unitNo": "303",
      "geoPoint": {
        "lat": 25.1122,
        "lng": 55.1386
      }
    },
    "management": {
      "assignedUser": "Agent ID 3",
      "owner": "Owner ID 3"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Penthouse in Marina with Panoramic Views",
    "propertyType": "Penthouses",
    "transactionType": "Sale",
    "price": 15000000,
    "serviceCharges": 4500,
    "financialStatus": "Mortgaged",
    "size": 3500,
    "bedrooms": 4,
    "bathrooms": 4,
    "parkingSpaces": 2,
    "furnishingType": "Furnished",
    "plotSize": null,
    "builtUpArea": 3500,
    "layoutType": "Open Plan",
    "projectStatus": "Off-Plan Secondary",
    "description": "Luxury penthouse in Dubai Marina with breathtaking views.",
    "amenities": ["Panoramic Marina Views", "Private Rooftop Pool", "Home Office", "Walk-in Closet"],
    "availability": "Reserved",
    "exclusivity": {
      "status": false
    },
    "permit": {
      "type": "RERA",
      "reraListingNo": "9876543210"
    },
    "media": {
      "images": ["url7.jpg", "url8.jpg"],
      "videoTour": "videoUrl4",
      "360Tour": "360TourUrl4"
    },
    "location": {
      "address": "Dubai Marina, Dubai, UAE",
      "unitNo": "404",
      "geoPoint": {
        "lat": 25.0822,
        "lng": 55.1425
      }
    },
    "management": {
      "assignedUser": "Agent ID 4",
      "owner": "Owner ID 4"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Office Space in Business Bay",
    "propertyType": "Office Space",
    "transactionType": "Rent",
    "price": 800000,
    "serviceCharges": 2000,
    "financialStatus": "Cash",
    "size": 2000,
    "bedrooms": 0,
    "bathrooms": 2,
    "parkingSpaces": 4,
    "furnishingType": "Semi furnished",
    "plotSize": null,
    "builtUpArea": 2000,
    "layoutType": "Open Plan",
    "projectStatus": "Ready",
    "description": "Modern office space in Business Bay with stunning views.",
    "amenities": ["City View", "Conference Room", "Pantry"],
    "availability": "Rented",
    "exclusivity": {
      "status": true,
      "startDate": "2024-05-01",
      "expiryDate": "2025-05-01"
    },
    "permit": {
      "type": "DTCM",
      "dtcmPermitNumber": "DTCM098765",
      "validFrom": "2024-08-01",
      "validTo": "2025-08-01"
    },
    "media": {
      "images": ["url9.jpg", "url10.jpg"],
      "videoTour": "videoUrl5",
      "360Tour": "360TourUrl5"
    },
    "location": {
      "address": "Business Bay, Dubai, UAE",
      "unitNo": "505",
      "geoPoint": {
        "lat": 25.1845,
        "lng": 55.2586
      }
    },
    "management": {
      "assignedUser": "Agent ID 5",
      "owner": "Owner ID 5"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Retail Space in JBR",
    "propertyType": "Retail",
    "transactionType": "Sale",
    "price": 3000000,
    "serviceCharges": 1000,
    "financialStatus": "Cash",
    "size": 1200,
    "bedrooms": 0,
    "bathrooms": 1,
    "parkingSpaces": 1,
    "furnishingType": "Unfurnished",
    "plotSize": null,
    "builtUpArea": 1200,
    "layoutType": "Open Plan",
    "projectStatus": "Ready",
    "description": "Prime retail space in JBR, perfect for high-end brands.",
    "amenities": ["High Foot Traffic", "Sea View"],
    "availability": "Available",
    "exclusivity": {
      "status": false
    },
    "permit": {
      "type": "RERA",
      "reraListingNo": "5432109876"
    },
    "media": {
      "images": ["url11.jpg", "url12.jpg"],
      "videoTour": "videoUrl6",
      "360Tour": "360TourUrl6"
    },
    "location": {
      "address": "JBR, Dubai, UAE",
      "unitNo": "606",
      "geoPoint": {
        "lat": 25.0796,
        "lng": 55.1391
      }
    },
    "management": {
      "assignedUser": "Agent ID 6",
      "owner": "Owner ID 6"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Warehouse in Al Quoz",
    "propertyType": "Warehouse",
    "transactionType": "Rent",
    "price": 1000000,
    "serviceCharges": 1500,
    "financialStatus": "Cash",
    "size": 10000,
    "bedrooms": 0,
    "bathrooms": 2,
    "parkingSpaces": 10,
    "furnishingType": "Unfurnished",
    "plotSize": 15000,
    "builtUpArea": 10000,
    "layoutType": "Open Plan",
    "projectStatus": "Ready",
    "description": "Spacious warehouse in Al Quoz with easy access to main roads.",
    "amenities": ["Loading Docks", "Security", "High Ceilings"],
    "availability": "Available",
    "exclusivity": {
      "status": true,
      "startDate": "2024-07-01",
      "expiryDate": "2025-07-01"
    },
    "permit": {
      "type": "RERA",
      "reraListingNo": "6789012345"
    },
    "media": {
      "images": ["url13.jpg", "url14.jpg"],
      "videoTour": "videoUrl7",
      "360Tour": "360TourUrl7"
    },
    "location": {
      "address": "Al Quoz, Dubai, UAE",
      "unitNo": "707",
      "geoPoint": {
        "lat": 25.1352,
        "lng": 55.2246
      }
    },
    "management": {
      "assignedUser": "Agent ID 7",
      "owner": "Owner ID 7"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Hotel Apartment in Palm Jumeirah",
    "propertyType": "Short Term / Hotel Apartment",
    "transactionType": "Rent",
    "price": 15000000,
    "serviceCharges": 2000,
    "financialStatus": "Cash",
    "size": 2500,
    "bedrooms": 3,
    "bathrooms": 3,
    "parkingSpaces": 2,
    "furnishingType": "Furnished",
    "plotSize": null,
    "builtUpArea": 2500,
    "layoutType": "Open Plan",
    "projectStatus": "Ready",
    "description": "Luxurious hotel apartment in Palm Jumeirah with beach access.",
    "amenities": ["Private Beach Access", "Infinity Pool", "Spa", "Gym"],
    "availability": "Available",
    "exclusivity": {
      "status": false
    },
    "permit": {
      "type": "RERA",
      "reraListingNo": "4567890123"
    },
    "media": {
      "images": ["url15.jpg", "url16.jpg"],
      "videoTour": "videoUrl8",
      "360Tour": "360TourUrl8"
    },
    "location": {
      "address": "Palm Jumeirah, Dubai, UAE",
      "unitNo": "808",
      "geoPoint": {
        "lat": 25.1122,
        "lng": 55.1386
      }
    },
    "management": {
      "assignedUser": "Agent ID 8",
      "owner": "Owner ID 8"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Retail Shop in Deira",
    "propertyType": "Retail",
    "transactionType": "Rent",
    "price": 400000,
    "serviceCharges": 500,
    "financialStatus": "Cash",
    "size": 800,
    "bedrooms": 0,
    "bathrooms": 1,
    "parkingSpaces": 1,
    "furnishingType": "Unfurnished",
    "plotSize": null,
    "builtUpArea": 800,
    "layoutType": "Open Plan",
    "projectStatus": "Ready",
    "description": "Strategically located retail shop in Deira with high foot traffic.",
    "amenities": ["High Foot Traffic", "Security"],
    "availability": "Available",
    "exclusivity": {
      "status": false
    },
    "permit": {
      "type": "DTCM",
      "dtcmPermitNumber": "DTCM123457",
      "validFrom": "2024-08-01",
      "validTo": "2025-08-01"
    },
    "media": {
      "images": ["url17.jpg", "url18.jpg"],
      "videoTour": "videoUrl9",
      "360Tour": "360TourUrl9"
    },
    "location": {
      "address": "Deira, Dubai, UAE",
      "unitNo": "909",
      "geoPoint": {
        "lat": 25.2725,
        "lng": 55.3288
      }
    },
    "management": {
      "assignedUser": "Agent ID 9",
      "owner": "Owner ID 9"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  },
  {
    "title": "Industrial Plot in Jebel Ali",
    "propertyType": "Plot",
    "transactionType": "Sale",
    "price": 12000000,
    "serviceCharges": 3500,
    "financialStatus": "Cash",
    "size": 20000,
    "bedrooms": 0,
    "bathrooms": 0,
    "parkingSpaces": null,
    "furnishingType": null,
    "plotSize": 20000,
    "builtUpArea": null,
    "layoutType": "Open Plan",
    "projectStatus": "Ready",
    "description": "Large industrial plot in Jebel Ali with easy access to the port.",
    "amenities": ["Port Access", "Security", "Warehouse Space"],
    "availability": "Available",
    "exclusivity": {
      "status": true,
      "startDate": "2024-03-01",
      "expiryDate": "2025-03-01"
    },
    "permit": {
      "type": "RERA",
      "reraListingNo": "7890123456"
    },
    "media": {
      "images": ["url19.jpg", "url20.jpg"],
      "videoTour": "videoUrl10",
      "360Tour": "360TourUrl10"
    },
    "location": {
      "address": "Jebel Ali, Dubai, UAE",
      "unitNo": "1010",
      "geoPoint": {
        "lat": 25.0133,
        "lng": 55.0452
      }
    },
    "management": {
      "assignedUser": "Agent ID 10",
      "owner": "Owner ID 10"
    },
    "lastUpdateDate": "2024-08-15T10:14:23Z",
    "creationDate": "2024-08-01T09:00:00Z",
    "createdBy": "Admin User"
  }
];

// Function to add property listings to Firestore
async function addPropertyListings() {
  try {
    const listingsCollection = collection(db, "propertyListings");
    for (const listing of propertyListings) {
      await addDoc(listingsCollection, listing);
    }
    console.log("Property listings added to Firestore successfully.");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Run the function to add property listings
addPropertyListings();
