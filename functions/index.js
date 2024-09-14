/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const xml2js = require("xml2js");

admin.initializeApp();
const db = admin.firestore();

// Define your amenities mapping
const amenitiesMapping = {
  BA: "Balcony",
  BP: "Basement parking",
  BB: "BBQ area",
  AN: "Cable-ready",
  BW: "Built in wardrobes",
  CA: "Carpets",
  AC: "Central air conditioning",
  CP: "Covered parking",
  DR: "Drivers room",
  FF: "Fully fitted kitchen",
  GZ: "Gazebo",
  PY: "Private Gym",
  PJ: "Jacuzzi",
  BK: "Kitchen Appliances",
  MR: "Maids Room",
  MB: "Marble floors",
  HF: "On high floor",
  LF: "On low floor",
  MF: "On mid floor",
  PA: "Pets allowed",
  GA: "Private garage",
  PG: "Garden",
  PP: "Swimming pool",
  SA: "Sauna",
  SP: "Shared swimming pool",
  WF: "Wood flooring",
  SR: "Steam room",
  ST: "Study",
  UI: "Upgraded interior",
  GR: "Garden view",
  VW: "Sea/Water view",
  SE: "Security",
  MT: "Maintenance",
  IC: "Within a Compound",
  IS: "Indoor swimming pool",
  SF: "Separate entrance for females",
  BT: "Basement",
  SG: "Storage room",
  CV: "Community view",
  GV: "Golf view",
  CW: "City view",
  NO: "North orientation",
  SO: "South orientation",
  EO: "East orientation",
  WO: "West orientation",
  NS: "Near school",
  HO: "Near hospital",
  TR: "Terrace",
  NM: "Near mosque",
  SM: "Near supermarket",
  ML: "Near mall",
  PT: "Near public transportation",
  MO: "Near metro",
  VT: "Near veterinary",
  BC: "Beach access",
  PK: "Public parks",
  RT: "Near restaurants",
  NG: "Near Golf",
  AP: "Near airport",
  CS: "Concierge Service",
  SS: "Spa",
  SY: "Shared Gym",
  MS: "Maid Service",
  WC: "Walk-in Closet",
  HT: "Heating",
  GF: "Ground floor",
  SV: "Server room",
  DN: "Pantry",
  RA: "Reception area",
  VP: "Visitors parking",
  OP: "Office partitions",
  SH: "Core and Shell",
  CD: "Children daycare",
  CL: "Cleaning services",
  NH: "Near Hotel",
  CR: "Conference room",
  BL: "View of Landmark",
  PR: "Children Play Area",
  BH: "Beach Access",
};

// This function will fetch the XML, parse it, and store it in Firebase
exports.scheduledFetchXML = functions.pubsub
    .schedule("every 24 hours")
    .onRun(async () => {
      const xmlUrl =
      "https://expert.propertyfinder.ae/feed/elx-real-estate-buying-selling-brokerage/privatesite/6126c8b450036ca8762af4e94e0096af";

      try {
      // Fetch the XML
        const response = await axios.get(xmlUrl);
        const xmlData = response.data;

        // Parse the XML to JSON
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlData);

        const properties = result.feed.property;
        const batch = db.batch();

        for (let i = 0; i < properties.length; i++) {
          const property = properties[i];
          const permitNumber =
          (property.permit_number && property.permit_number[0]) ?
            property.permit_number[0] :
            "";
          const title =
          (property.title_en && property.title_en[0]) ?
            property.title_en[0] :
            "";
          const referenceNumber =
          (property.reference_number && property.reference_number[0]) ?
            property.reference_number[0] :
            "";
          const offeringType =
          (property.offering_type && property.offering_type[0]) ?
            property.offering_type[0] :
            "";
          const offplan = false; // Set offplan to false always

          if (!permitNumber) {
            console.error(`Property ${i + 1}: Missing permit_number`);
            continue;
          }

          const existingProperty = await db
              .collection("propertyListings")
              .doc(permitNumber)
              .get();
          if (existingProperty.exists) {
            console.log(`Skipping duplicate property: ${title}`);
            continue;
          }

          let propertyType =
          (property.property_type && property.property_type[0]) ?
            property.property_type[0] :
            "";
          switch (propertyType) {
            case "AP":
              propertyType = "Apartment";
              break;
            case "VH":
              propertyType = "Villa";
              break;
            case "PH":
              propertyType = "Penthouse";
              break;
            case "TH":
              propertyType = "Townhouse";
              break;
            default:
              propertyType = "Unknown";
          }

          const rawAmenities =
          (property.amenities && property.amenities[0]) ?
            property.amenities[0].split(",") :
            [];
          const amenities = rawAmenities.map(
              (code) => amenitiesMapping[code.trim()] || code.trim(),
          );

          const city = (property.city && property.city[0]) ?
          property.city[0] :
          "";
          const community = (property.community && property.community[0]) ?
          property.community[0] :
          "";
          const subCommunity = (property.sub_community && property.sub_community[0]) ?
          property.sub_community[0] :
          "";
          const propertyName = (property.property_name && property.property_name[0]) ?
          property.property_name[0] :
          "";

          const location = {
            unitNo:
            (property.unit_number && property.unit_number[0]) ?
              property.unit_number[0] :
              "",
            address: `${propertyName}, ${subCommunity}, ${community}, ${city}`,
            geoPoint: {
              lat: parseFloat(
              (property.geopoints && property.geopoints[0]) ?
                property.geopoints[0].split(",")[1] :
                0,
              ) || 0,
              lng: parseFloat(
              (property.geopoints && property.geopoints[0]) ?
                property.geopoints[0].split(",")[0] :
                0,
              ) || 0,
            },
          };

          const media = {
            images: (property.url) ?
            property.url.map((url) => url._ || "") :
            [],
            videoTour: (property.video_tour && property.video_tour[0]) ?
            property.video_tour[0] :
            "",
            tour360: (property.tour_360 && property.tour_360[0]) ?
            property.tour_360[0] :
            "",
          };

          const permit = {
            reraListingNo: permitNumber,
            dtcmPermitNo: "N/A",
            permitFromDate: null,
            permitToDate: null,
            type: "RERA",
          };

          const management = {
            id: (property.agent && property.agent[0] && property.agent[0].id && property.agent[0].id[0].name) ?
            property.agent[0].id[0].name[0] :
            "",
            assignedUser: (property.agent && property.agent[0] && property.agent[0].id && property.agent[0].id[0].email) ?
            property.agent[0].id[0].email[0] :
            "",
            agentPhone: (property.agent && property.agent[0] && property.agent[0].id && property.agent[0].id[0].phone) ?
            property.agent[0].id[0].phone[0] :
            "",
            agentLicenseNo: (property.agent && property.agent[0] && property.agent[0].id && property.agent[0].id[0].license_no) ?
            property.agent[0].id[0].license_no[0] :
            "",
            agentPhoto: (property.agent && property.agent[0] && property.agent[0].id && property.agent[0].id[0].photo) ?
            property.agent[0].id[0].photo[0] :
            "",
          };

          const pricing = {
            salePrice: parseFloat(
            (property.price && property.price[0]) ?
              property.price[0] :
              "0",
            ),
            price: parseFloat(
            (property.price && property.price[0]) ?
              property.price[0] :
              "0",
            ),
            priceOnApplication: (property.price_on_application && property.price_on_application[0]) ?
            property.price_on_application[0] :
            "No",
            rentalPeriod: (property.rental_period && property.rental_period[0]) ?
            property.rental_period[0] :
            null,
          };

          const furnished = (property.furnished && property.furnished[0]) ?
          property.furnished[0] :
          "No";
          const parking = (property.parking && property.parking[0]) ?
          property.parking[0] :
          "0";

          const propertyData = {
            title,
            referenceNumber,
            offeringType,
            propertyType,
            description: (property.description_en && property.description_en[0]) ?
            property.description_en[0] :
            "",
            bedrooms: parseInt(
            (property.bedroom && property.bedroom[0]) ?
              property.bedroom[0] :
              "0",
            ),
            bathrooms: parseInt(
            (property.bathroom && property.bathroom[0]) ?
              property.bathroom[0] :
              "0",
            ),
            amenities,
            size: parseFloat(
            (property.size && property.size[0]) ?
              property.size[0] :
              "0",
            ),
            completionStatus: (property.completion_status && property.completion_status[0]) ?
            property.completion_status[0] :
            "",
            city,
            community,
            subCommunity,
            propertyName,
            location,
            media,
            permit,
            management,
            pricing,
            furnished,
            parking,
            offplan, // Set to false
          };

          const docRef = db.collection("propertyListings").doc(permitNumber);
          batch.set(docRef, propertyData);
        }

        await batch.commit();
        console.log("Properties added successfully!");
      } catch (error) {
        console.error("Error fetching or processing the XML:", error);
      }
    });
