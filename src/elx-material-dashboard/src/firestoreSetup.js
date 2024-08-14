// src/elx-material-dashboard/src/firestoreSetup.js
/*
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";

// Function to add menu items
export async function addMenuItems() {
  try {
    await addDoc(collection(db, "menuItems"), {
      name: "Home",
      link: "/",
      icon: "images/home.svg"
    });
    await addDoc(collection(db, "menuItems"), {
      name: "Off-plan",
      link: "/off-plan",
      icon: "images/building.svg"
    });
    // Add more items as needed
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to add featured categories
export async function addFeaturedCategories() {
  try {
    await addDoc(collection(db, "featuredCategories"), {
      title: "Apartments",
      image: "images/featured1.jpg",
      listings: "400+"
    });
    await addDoc(collection(db, "featuredCategories"), {
      title: "Penthouses",
      image: "images/featured2.jpg",
      listings: "456+"
    });
    // Add more categories as needed
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to add trending properties
export async function addTrendingProperties() {
  try {
    await addDoc(collection(db, "trendingProperties"), {
      title: "Penthouses in Downtown",
      image: "images/trending1.jpg",
      price: "AED 3,578,000",
      description: "Penthouses in Downtown, Dubai",
      link: "#"
    });
    // Add more properties as needed
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}*/


// src/elx-material-dashboard/src/firestoreSetup.js
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";

// Function to add menu items
export async function addMenuItems() {
  try {
    await addDoc(collection(db, "menuItems"), {
      name: "Home",
      link: "/",
      icon: "images/home.svg"
    });
    await addDoc(collection(db, "menuItems"), {
      name: "Off-plan",
      link: "/off-plan",
      icon: "images/building.svg"
    });
    // Add more items as needed
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to add featured categories
export async function addFeaturedCategories() {
  try {
    await addDoc(collection(db, "featuredCategories"), {
      title: "Apartments",
      image: "images/featured1.jpg",
      listings: "400+"
    });
    await addDoc(collection(db, "featuredCategories"), {
      title: "Penthouses",
      image: "images/featured2.jpg",
      listings: "456+"
    });
    // Add more categories as needed
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to add trending properties
export async function addTrendingProperties() {
  try {
    await addDoc(collection(db, "trendingProperties"), {
      title: "Penthouses in Downtown",
      image: "images/trending1.jpg",
      price: "AED 3,578,000",
      description: "Penthouses in Downtown, Dubai",
      link: "#"
    });
    // Add more properties as needed
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to add navigation items
export async function addNavigationItems() {
  const navItems = [
    {
      title: 'Top Regions',
      links: [
        { name: 'Texas, USA', url: '#' },
        { name: 'California, USA', url: '#' },
        { name: 'Hamptons, NY, USA', url: '#' },
        { name: 'Florida, USA', url: '#' },
        { name: 'North Carolina, USA', url: '#' },
        { name: 'Georgia, USA', url: '#' },
        { name: 'Illinois, USA', url: '#' },
      ],
    },
    {
      title: 'Top Cities',
      links: [
        { name: 'Los Angeles', url: '#' },
        { name: 'New York', url: '#' },
        { name: 'Miami', url: '#' },
        { name: 'Beverly Hills', url: '#' },
        { name: 'Chicago', url: '#' },
        { name: 'San Francisco', url: '#' },
        { name: 'San Diego', url: '#' },
      ],
    },
    {
      title: 'Property Types',
      links: [
        { name: 'Apartments in United States', url: '#' },
        { name: 'Houses in United States', url: '#' },
        { name: 'Villas in United States', url: '#' },
        { name: 'Land in United States', url: '#' },
        { name: 'Co-Ops in United States', url: '#' },
        { name: 'Condos United States', url: '#' },
        { name: 'Townhouses in United States', url: '#' },
      ],
    },
    {
      title: 'Top Searches',
      links: [
        { name: 'Farm Ranches in United States', url: '#' },
        { name: 'Penthouses in United States', url: '#' },
        { name: 'Waterfront homes in United States', url: '#' },
        { name: 'Farm Ranches in Texas, USA', url: '#' },
        { name: 'Homes in Manhattan', url: '#' },
        { name: 'Houses in Los Angeles', url: '#' },
        { name: 'Apartments in New York', url: '#' },
      ],
    },
  ];

  try {
    for (const item of navItems) {
      await addDoc(collection(db, "navigationItems"), item);
    }
    console.log("Navigation items added successfully.");
  } catch (e) {
    console.error("Error adding navigation items: ", e);
  }
}
