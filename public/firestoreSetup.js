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

// Data to be added to Firestore
const topRegions = [
  { name: "Texas, USA", url: "https://example.com/texas" },
  { name: "California, USA", url: "https://example.com/california" },
  { name: "Hamptons, NY, USA", url: "https://example.com/hamptons" },
  { name: "Florida, USA", url: "https://example.com/florida" },
  { name: "North Carolina, USA", url: "https://example.com/north-carolina" },
  { name: "Georgia, USA", url: "https://example.com/georgia" },
  { name: "Illinois, USA", url: "https://example.com/illinois" },
];

const topCities = [
  { name: "Los Angeles", url: "https://example.com/los-angeles" },
  { name: "New York", url: "https://example.com/new-york" },
  { name: "Miami", url: "https://example.com/miami" },
  { name: "Beverly Hills", url: "https://example.com/beverly-hills" },
  { name: "Chicago", url: "https://example.com/chicago" },
  { name: "San Francisco", url: "https://example.com/san-francisco" },
  { name: "San Diego", url: "https://example.com/san-diego" },
];

const propertyTypes = [
  { name: "Apartments in United States", url: "https://example.com/apartments" },
  { name: "Houses in United States", url: "https://example.com/houses" },
  { name: "Villas in United States", url: "https://example.com/villas" },
  { name: "Land in United States", url: "https://example.com/land" },
  { name: "Co-Ops in United States", url: "https://example.com/co-ops" },
  { name: "Condos United States", url: "https://example.com/condos" },
  { name: "Townhouses in United States", url: "https://example.com/townhouses" },
];

const topSearches = [
  { name: "Farm Ranches in United States", url: "https://example.com/farm-ranches" },
  { name: "Penthouses in United States", url: "https://example.com/penthouses" },
  { name: "Waterfront homes in United States", url: "https://example.com/waterfront-homes" },
  { name: "Farm Ranches in Texas, USA", url: "https://example.com/farm-ranches-texas" },
  { name: "Homes in Manhattan", url: "https://example.com/homes-manhattan" },
  { name: "Houses in Los Angeles", url: "https://example.com/houses-los-angeles" },
  { name: "Apartments in New York", url: "https://example.com/apartments-new-york" },
];

// Function to add data to Firestore
async function addDataToFirestore() {
  try {
    // Add Top Regions
    const regionsCollection = collection(db, "topRegions");
    for (const region of topRegions) {
      await addDoc(regionsCollection, region);
    }

    // Add Top Cities
    const citiesCollection = collection(db, "topCities");
    for (const city of topCities) {
      await addDoc(citiesCollection, city);
    }

    // Add Property Types
    const propertyTypesCollection = collection(db, "propertyTypes");
    for (const type of propertyTypes) {
      await addDoc(propertyTypesCollection, type);
    }

    // Add Top Searches
    const topSearchesCollection = collection(db, "topSearches");
    for (const search of topSearches) {
      await addDoc(topSearchesCollection, search);
    }

    console.log("Data added to Firestore successfully.");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Run the function to add data
addDataToFirestore();
