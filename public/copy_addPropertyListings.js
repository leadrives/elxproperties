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
    title: "Palm Beach Tower in Palm Jumeirah",
    propertyType: "Apartments",
    mainImage: "images/property-list11.jpg",
    images: [
      "images/property-list12.jpg",
      "images/property-list13.jpg",
      "images/property-list14.jpg"
    ],
    beds: 3,
    baths: 2,
    size: 1115,
    features: ["Pool", "Waterfront", "Garden", "Terrace", "Jacuzzi", "Basketball Court"],
    price: "AED 7,000,000/year",
    description: "Luxurious apartment with breathtaking views of Palm Jumeirah."
  },
  {
    title: "Downtown Apartment with Burj Khalifa View",
    propertyType: "Apartments",
    mainImage: "images/property-list21.jpg",
    images: [
      "images/property-list22.jpg",
      "images/property-list23.jpg",
      "images/property-list24.jpg"
    ],
    beds: 2,
    baths: 2,
    size: 900,
    features: ["City View", "Modern Kitchen", "Smart Home System", "Gym Access"],
    price: "AED 5,000,000/year",
    description: "Modern apartment located in the heart of Downtown Dubai."
  },
  {
    title: "Luxury Villa in Emirates Hills",
    propertyType: "Villas",
    mainImage: "images/property-list31.jpg",
    images: [
      "images/property-list32.jpg",
      "images/property-list33.jpg",
      "images/property-list34.jpg"
    ],
    beds: 5,
    baths: 6,
    size: 5500,
    features: ["Private Pool", "Golf Course View", "Home Cinema", "Private Garden"],
    price: "AED 25,000,000",
    description: "Exclusive villa in the prestigious Emirates Hills community."
  },
  {
    title: "Seafront Villa in Palm Jumeirah",
    propertyType: "Villas",
    mainImage: "images/property-list41.jpg",
    images: [
      "images/property-list42.jpg",
      "images/property-list43.jpg",
      "images/property-list44.jpg"
    ],
    beds: 4,
    baths: 5,
    size: 4500,
    features: ["Private Beach Access", "Infinity Pool", "Outdoor Kitchen", "Spa Room"],
    price: "AED 20,000,000",
    description: "Stunning seafront villa with private beach access."
  },
  {
    title: "Penthouse in Marina with Panoramic Views",
    propertyType: "Penthouses",
    mainImage: "images/property-list51.jpg",
    images: [
      "images/property-list52.jpg",
      "images/property-list53.jpg",
      "images/property-list54.jpg"
    ],
    beds: 4,
    baths: 4,
    size: 3500,
    features: ["Panoramic Marina Views", "Private Rooftop Pool", "Home Office", "Walk-in Closet"],
    price: "AED 15,000,000",
    description: "Luxury penthouse in Dubai Marina with breathtaking views."
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
