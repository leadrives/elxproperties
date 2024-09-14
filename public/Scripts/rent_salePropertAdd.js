document.addEventListener('DOMContentLoaded', function () {

    // Function to load property listings
    function loadRentSalePropertyListings() {
        // Query Firestore to only get documents where offplan == false
        db.collection('propertyListings')
            .where('offplan', '==', false)  // Filter for offplan == false
            .get()
            .then((querySnapshot) => {
                let propertiesHTML = '';
                let count = 0;

                // Check if we have any documents
                if (querySnapshot.empty) {
                    console.log("No matching documents.");
                    alert("No property listings available for rent or sale.");
                    return;
                }

                // Loop through the Firestore data
                querySnapshot.forEach((doc) => {
                    count++;
                    const data = doc.data();
                    const price = data.pricing?.price || 'N/A';

                    // Add table rows dynamically
                    propertiesHTML += `
                    <tr>
                        <td>${count}</td>
                        <td>${data.title}</td>
                        <td>${data.propertyType}</td>
                        <td>${data.offeringType}</td>
                        <td>${price}</td>
                        <td>
                            <button onclick="editRentSalePropertyListings('${doc.id}')" class="btn btn-sm btn-warning">Edit</button>
                            <button onclick="deleteProperty('${doc.id}')" class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                    `;
                });

                // Update the table body
                document.getElementById('rent_sale_property-listings-admin').innerHTML = propertiesHTML;

                // Reinitialize DataTable to avoid duplication
                if ($.fn.DataTable.isDataTable('#rent_sale_propertyTable')) {
                    $('#rent_sale_propertyTable').DataTable().clear().destroy();
                }

                // Initialize DataTable after loading the data
                $('#rent_sale_propertyTable').DataTable({
                    paging: true,      // Enable pagination
                    searching: true,   // Enable search
                    ordering: true,    // Enable sorting
                    info: true,        // Enable table info
                    pageLength: 10     // Default number of rows per page
                });
            })
            .catch(error => {
                console.error('Error loading property listings: ', error);
                alert('Failed to load property listings. Please try again.');
            });
    }



    // Load property listings when the page loads
    loadRentSalePropertyListings();
});
// Function to edit Rent/Sale Property Listings
function editRentSalePropertyListings(id) {
    db.collection('propertyListings').doc(id).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            console.log('Firebase Response Data (JSON):', JSON.stringify(data, null, 2));

            // Type Section
            try {
                document.getElementById('editRentSalePropertyId').value = doc.id;

                // Determine property type and transaction type based on offeringType
                const offeringType = data.offeringType;
                let propertyTypeValue = '';
                let transactionTypeValue = '';

                switch (offeringType) {
                    case 'CS':  // Commercial property for sale
                        propertyTypeValue = 'Commercial';
                        transactionTypeValue = 'Sale';
                        break;
                    case 'CR':  // Commercial property for rent
                        propertyTypeValue = 'Commercial';
                        transactionTypeValue = 'Rent';
                        break;
                    case 'RS':  // Residential property for sale
                        propertyTypeValue = 'Residential';
                        transactionTypeValue = 'Sale';
                        break;
                    case 'RR':  // Residential property for rent
                        propertyTypeValue = 'Residential';
                        transactionTypeValue = 'Rent';
                        break;
                    default:
                        console.error('Invalid offeringType:', offeringType);
                        break;
                }

                // Select the correct property type (Residential/Commercial)
                const propertyTypeElement = document.querySelector(`input[name="editRentSalePropertyType"][value="${propertyTypeValue}"]`);
                if (propertyTypeElement) {
                    propertyTypeElement.checked = true;
                } else {
                    console.error('Property Type not found or invalid.');
                }

                // Select the correct transaction type (Rent/Sale)
                const transactionTypeElement = document.querySelector(`input[name="editRentSaleTransactionType"][value="${transactionTypeValue}"]`);
                if (transactionTypeElement) {
                    transactionTypeElement.checked = true;
                } else {
                    console.error('Transaction Type not found or invalid.');
                }

            } catch (error) {
                console.error('Error loading Type Section: ', error);
            }


            // Populate dropdowns (Ensure dropdownData is defined and available)
            try {
                if (typeof dropdownData !== 'undefined') {
                    // Populate Bedrooms, Bathrooms, Property Type, and Property Status dropdowns
                    populateDropdown('editRentSalePropertyBedrooms', dropdownData.bedrooms.map(item => ({ id: item.value, name: item.label })));
                    populateDropdown('editRentSalePropertyBathrooms', dropdownData.bathrooms.map(item => ({ id: item.value, name: item.label })));
                    populateDropdown('editRentSalePropertyTypeDropdown', dropdownData.propertyType.map(item => ({ id: item.value, name: item.label })));
                    populateDropdown('editRentSalePropertyStatus', dropdownData.propertyStatus.map(item => ({ id: item.value, name: item.label })));

                    // Special logic for Furnishing Type dropdown
                    const furnishingValue = data.furnished === 'Yes' ? 'Yes' : 'No'; // Check if the property is furnished or not
                    populateDropdown('editRentSalePropertyFurnishingType', [
                        { id: 'Yes', name: 'Furnished' },
                        { id: 'No', name: 'Unfurnished' }
                    ]);
                    document.getElementById('editRentSalePropertyFurnishingType').value = furnishingValue; // Set selected value
                } else {
                    console.error('dropdownData is undefined or not loaded.');
                }
            } catch (error) {
                console.error('Error populating dropdowns: ', error);
            }

            // Specifications Section
            try {
                document.getElementById('editRentSalePropertySize').value = data.size || '';
                document.getElementById('editRentSalePropertyBedrooms').value = data.bedrooms || '';
                document.getElementById('editRentSalePropertyBathrooms').value = data.bathrooms || '';
                document.getElementById('editRentSalePropertyFurnishingType').value = data.furnished || '';
                document.getElementById('editRentSalePropertyParkingSpaces').value = data.parking || '';
                document.getElementById('editRentSalePropertyPlotSize').value = data.plotSize || '';
                document.getElementById('editRentSalePropertyBuiltUpArea').value = data.builtUpArea || '';
            } catch (error) {
                console.error('Error loading Specifications Section: ', error);
            }


            // Pricing Section (for Sale)
            try {
                document.getElementById('editRentSaleSalePrice').value = data.pricing?.salePrice || '';
            } catch (error) {
                console.error('Error loading Pricing Section: ', error);
            }

            // Description Section
            try {
                document.getElementById('editRentSaleEnglishTitle').value = data.title || '';
                document.getElementById('editRentSaleEnglishDescription').value = data.description || '';
            } catch (error) {
                console.error('Error loading Description Section: ', error);
            }

            // Amenities Section
            try {
                const selectedAmenities = document.getElementById('editRentSaleSelectedAmenities');
                if (selectedAmenities) {
                    selectedAmenities.innerHTML = '';
                    if (data.amenities && data.amenities.length > 0) {
                        data.amenities.forEach(amenity => {
                            const newAmenity = document.createElement('span');
                            newAmenity.className = 'badge bg-primary m-1';
                            newAmenity.textContent = amenity;
                            selectedAmenities.appendChild(newAmenity);
                        });
                    }
                }
            } catch (error) {
                console.error('Error loading Amenities Section: ', error);
            }

            // Management Section
            try {
                // Load the agent's name, email, phone, and license number from the Firebase data
                document.getElementById('editRentSaleAgentName').value = data.management?.owner || '';  // Agent's name
                document.getElementById('editRentSaleAgentEmail').value = data.management?.assignedUser || '';  // Agent's email
                document.getElementById('editRentSaleAgentPhone').value = data.management?.agentPhone || '';  // Agent's phone
                document.getElementById('editRentSaleAgentLicenseNo').value = data.management?.agentLicenseNo || '';  // Agent's license no

                // Set the agent photo if available
                if (data.management?.agentPhoto) {
                    document.getElementById('editRentSaleAgentPhotoPreview').src = data.management.agentPhoto;
                    document.getElementById('editRentSaleAgentPhotoPreview').style.display = 'block';
                } else {
                    document.getElementById('editRentSaleAgentPhotoPreview').style.display = 'none';
                }
            } catch (error) {
                console.error('Error loading Management Section: ', error);
            }

            // Location Section
            try {
                const lat = data.location?.geoPoint?.lat || 25.276987;
                const lng = data.location?.geoPoint?.lng || 55.296249;

                // Initialize the map with the given lat/lng and bind it to the search input
                initMap(lat, lng, "editRentSaleLocationSearch", "editRentSaleMap", "editRentSaleGeoLat", "editRentSaleGeoLng");

                // Load existing values into the input fields, or set default values if they don't exist
                document.getElementById('editRentSaleLocationSearch').value = data.location?.address || '';
                document.getElementById('editRentSaleGeoLat').value = lat;
                document.getElementById('editRentSaleGeoLng').value = lng;

                // Load additional fields (Community, Sub-Community, Property Name)
                document.getElementById('editRentSaleCommunity').value = data.community || '';
                document.getElementById('editRentSaleSubCommunity').value = data.subCommunity || '';
                document.getElementById('editRentSalePropertyName').value = data.propertyName || '';

                // Re-bind the autocomplete listener after the initial values are set
                const input = document.getElementById("editRentSaleLocationSearch");
                const autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', map); // Ensure the autocomplete is linked to the map's bounds

                // Add listener for the new place selected from the autocomplete dropdown
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (!place.geometry || !place.geometry.location) {
                        window.alert("No details available for input: '" + place.name + "'");
                        return;
                    }

                    // Update the map with the new location selected
                    const newLatLng = place.geometry.location;
                    map.setCenter(newLatLng);
                    map.setZoom(17);
                    marker.setPosition(newLatLng);

                    // Update the lat/lng fields with new coordinates
                    document.getElementById('editRentSaleGeoLat').value = newLatLng.lat();
                    document.getElementById('editRentSaleGeoLng').value = newLatLng.lng();

                    // Update the address field with the selected place's formatted address
                    document.getElementById('editRentSaleLocationSearch').value = place.formatted_address || '';
                });

            } catch (error) {
                console.error('Error loading Location Section: ', error);
            }


            // Media Section
            try {
                const imageThumbnails = document.getElementById('editRentSaleImageThumbnails');
                if (imageThumbnails && data.media?.images) {
                    imageThumbnails.innerHTML = '';
                    data.media.images.forEach(imageUrl => {
                        const imgElement = document.createElement('img');
                        imgElement.src = imageUrl;
                        imgElement.className = 'img-thumbnail m-2';
                        imgElement.style.width = '100px';
                        imageThumbnails.appendChild(imgElement);
                    });
                }

                // document.getElementById('editRentSaleTour360Url').value = data.media?.tour360 || '';
                //document.getElementById('editRentSaleVideoTourUrl').value = data.media?.videoTour || '';
            } catch (error) {
                console.error('Error loading Media Section: ', error);
            }



            // Exclusivity Section
            /*
            try {
                const exclusivityStatus = data.exclusivity?.status || false;
                const exclusivityCheckbox = document.getElementById('editRentSaleExclusivity');
                const startDateField = document.getElementById('editRentSaleStartDate');
                const expiryDateField = document.getElementById('editRentSaleExpiryDate');
                const exclusivityDatesSection = document.getElementById('editRentSaleExclusivityDates');

                exclusivityCheckbox.checked = exclusivityStatus;

                if (exclusivityStatus) {
                    exclusivityDatesSection.style.display = 'block';
                    startDateField.value = data.exclusivity?.startDate || '';
                    expiryDateField.value = data.exclusivity?.expiryDate || '';
                } else {
                    exclusivityDatesSection.style.display = 'none';
                    startDateField.value = '';
                    expiryDateField.value = '';
                }
            } catch (error) {
                console.error('Error loading Exclusivity Section: ', error);
            }

            // Date picker for "Available From"
            try {
                document.getElementById('editRentSaleAvailableFrom').value = data.availabilityFrom || '';
            } catch (error) {
                console.error('Error loading Available From Date: ', error);
            }
            */
            // Document Section
            try {
                const documentThumbnails = document.getElementById('editRentSaleDocumentThumbnails');
                documentThumbnails.innerHTML = '';

                if (data.media?.documents && data.media.documents.length > 0) {
                    data.media.documents.forEach((docUrl) => {
                        const documentElement = document.createElement('a');
                        documentElement.href = docUrl;
                        documentElement.target = '_blank';
                        documentElement.textContent = docUrl.split('/').pop();
                        documentElement.className = 'btn btn-outline-secondary m-1';
                        documentThumbnails.appendChild(documentElement);
                    });
                } else {
                    const noDocumentsMessage = document.createElement('p');
                    noDocumentsMessage.textContent = 'No documents uploaded.';
                    documentThumbnails.appendChild(noDocumentsMessage);
                }
            } catch (error) {
                console.error('Error loading Documents Section: ', error);
            }

            // Show the modal
            try {
                const editRentSalePropertyModal = new bootstrap.Modal(document.getElementById('editRentSalePropertyModal'));
                editRentSalePropertyModal.show();
            } catch (error) {
                console.error('Error initializing modal: ', error);
            }
        } else {
            alert('No such property!');
        }
    }).catch(error => {
        console.error('Error loading property:', error);
        alert('Failed to load property. Please try again.');
    });
}
// Preview the selected agent photo
function previewAgentPhoto(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('editRentSaleAgentPhotoPreview');
        output.src = reader.result;
        output.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('saveEditedRentSalePropertyListing');

    if (saveButton) {
        saveButton.addEventListener('click', function () {
            const loadingIndicator = document.getElementById('loadingIndicator');
            const messageDiv = document.getElementById('editRentSaleFormMessage');

            saveButton.disabled = true;
            if (loadingIndicator) loadingIndicator.style.display = 'block';

            const propertyId = document.getElementById('editRentSalePropertyId').value;

            // Get current data from Firestore
            db.collection('propertyListings').doc(propertyId).get().then((doc) => {
                if (doc.exists) {
                    const originalData = doc.data();
                    const updatedFields = [];

                    // Helper function to handle undefined values
                    function handleUndefined(value, defaultValue = null) {
                        return value !== undefined ? value : defaultValue;
                    }

                    // Collect updated data from the form, using handleUndefined to prevent undefined values
                    const updatedData = {
                        title: handleUndefined(document.getElementById('editRentSaleEnglishTitle').value),
                        propertyName: handleUndefined(document.getElementById('editRentSalePropertyName').value),
                        subCommunity: handleUndefined(document.getElementById('editRentSaleSubCommunity').value),
                        referenceNumber: originalData.referenceNumber, // Keep original value
                        bathrooms: parseInt(handleUndefined(document.getElementById('editRentSalePropertyBathrooms').value, originalData.bathrooms)),

                        management: {
                            agentPhoto: handleUndefined(document.getElementById('editRentSaleAgentPhotoPreview').src, originalData.management?.agentPhoto),
                            owner: handleUndefined(document.getElementById('editRentSaleAgentName').value, originalData.management?.owner),
                            agentLicenseNo: handleUndefined(document.getElementById('editRentSaleAgentLicenseNo').value, originalData.management?.agentLicenseNo),
                            assignedUser: handleUndefined(document.getElementById('editRentSaleAgentEmail').value, originalData.management?.assignedUser),
                            agentPhone: handleUndefined(document.getElementById('editRentSaleAgentPhone').value, originalData.management?.agentPhone),
                        },

                        pricing: {
                            salePrice: parseFloat(handleUndefined(document.getElementById('editRentSaleSalePrice').value, originalData.pricing?.salePrice)),
                            rentalPeriod: handleUndefined(originalData.pricing?.rentalPeriod, null), // Keeping original value
                            price: parseFloat(handleUndefined(document.getElementById('editRentSaleSalePrice').value, originalData.pricing?.salePrice)),
                            priceOnApplication: handleUndefined(originalData.pricing?.priceOnApplication, 'No'), // Default 'No'
                        },

                        offplan: originalData.offplan, // Keeping original
                        offeringType: document.querySelector('input[name="editRentSalePropertyType"]:checked').value === 'Residential'
                            ? (document.querySelector('input[name="editRentSaleTransactionType"]:checked').value === 'Sale' ? 'RS' : 'RR')
                            : (document.querySelector('input[name="editRentSaleTransactionType"]:checked').value === 'Sale' ? 'CS' : 'CR'),

                        description: handleUndefined(document.getElementById('editRentSaleEnglishDescription').value, originalData.description),
                        completionStatus: originalData.completionStatus, // Keeping original

                        amenities: Array.from(document.querySelectorAll('#editRentSaleSelectedAmenities .badge')).map(amenity => amenity.textContent) || originalData.amenities,

                        community: handleUndefined(document.getElementById('editRentSaleCommunity').value, originalData.community),
                        propertyType: originalData.propertyType, // Keeping original
                        size: parseInt(handleUndefined(document.getElementById('editRentSalePropertySize').value, originalData.size)),

                        permit: {
                            permitToDate: handleUndefined(originalData.permit?.permitToDate, null),
                            type: handleUndefined(originalData.permit?.type, 'RERA'),
                            reraListingNo: handleUndefined(originalData.permit?.reraListingNo, ''),
                            permitFromDate: handleUndefined(originalData.permit?.permitFromDate, null),
                            dtcmPermitNo: handleUndefined(originalData.permit?.dtcmPermitNo, 'N/A'),
                        },

                        media: {
                            images: originalData.media?.images || [],
                            videoTour: handleUndefined(originalData.media?.videoTour, ''),
                            tour360: handleUndefined(originalData.media?.tour360, ''),
                        },

                        parking: handleUndefined(document.getElementById('editRentSalePropertyParkingSpaces').value, originalData.parking),
                        city: originalData.city, // Keeping original
                        bedrooms: parseInt(handleUndefined(document.getElementById('editRentSalePropertyBedrooms').value, originalData.bedrooms)),

                        location: {
                            unitNo: handleUndefined(originalData.location?.unitNo, ''),
                            address: handleUndefined(document.getElementById('editRentSaleLocationSearch').value, originalData.location?.address),
                            geoPoint: {
                                lat: parseFloat(handleUndefined(document.getElementById('editRentSaleGeoLat').value, originalData.location?.geoPoint.lat)),
                                lng: parseFloat(handleUndefined(document.getElementById('editRentSaleGeoLng').value, originalData.location?.geoPoint.lng)),
                            },
                        },

                        furnished: handleUndefined(document.getElementById('editRentSalePropertyFurnishingType').value, originalData.furnished),
                    };

                    // Compare original and updated values and track changed fields
                    const changes = {};
                    Object.keys(updatedData).forEach((key) => {
                        if (JSON.stringify(originalData[key]) !== JSON.stringify(updatedData[key])) {
                            changes[key] = updatedData[key];
                        }
                    });

                    // If there are changes, update Firestore document
                    if (Object.keys(changes).length > 0) {
                        db.collection('propertyListings').doc(propertyId).update(changes)
                            .then(() => {
                                if (loadingIndicator) loadingIndicator.style.display = 'none';
                                saveButton.disabled = false;

                                messageDiv.innerHTML = `
                                    <div class="alert alert-success">
                                        Property updated successfully! Updated fields: ${Object.keys(changes).join(', ')}.
                                    </div>`;
                            })
                            .catch(error => {
                                if (loadingIndicator) loadingIndicator.style.display = 'none';
                                saveButton.disabled = false;
                                messageDiv.innerHTML = `<div class="alert alert-danger">Error updating property: ${error.message}</div>`;
                            });
                    } else {
                        // No changes were made
                        if (loadingIndicator) loadingIndicator.style.display = 'none';
                        saveButton.disabled = false;
                        messageDiv.innerHTML = '<div class="alert alert-info">No changes were made.</div>';
                    }
                } else {
                    messageDiv.innerHTML = '<div class="alert alert-danger">No such property found.</div>';
                    if (loadingIndicator) loadingIndicator.style.display = 'none';
                    saveButton.disabled = false;
                }
            }).catch(error => {
                messageDiv.innerHTML = `<div class="alert alert-danger">Error loading property: ${error.message}</div>`;
                if (loadingIndicator) loadingIndicator.style.display = 'none';
                saveButton.disabled = false;
            });
        });
    }
});

