$(document).ready(function () {

   $(window).on('scroll', function () {
      if ($(this).scrollTop() > 300)
         $('.scroll-top-arrow').fadeIn('slow');
      else
         $('.scroll-top-arrow').fadeOut('3000');




      var scroll = $(window).scrollTop();
      if (scroll <= 0) {
         $(".nav-coustom").removeClass("bg-white");
         $(".top-nav-elx-flag").addClass("top-nav-elx-none");
         $(".bot-nav-elx").show();
         $(".black-logo").hide();
      } else {
         $(".top-nav-elx-flag").removeClass("top-nav-elx-none");
         $(".bot-nav-elx").hide();
         $(".black-logo").show();
         $(".nav-coustom").addClass("bg-white");
      }
   });

   //Click event to scroll to top
   $(document).on('click', '.scroll-top-arrow', function () {
      $('html, body').animate({
         scrollTop: 0
      }, 800);
      return false;
   });

   ////////// 
   // owlCarousel slider
   ////////// 
   (function () {
      "use strict";
      var carousels = function () {
         $(".owl-carousel3").owlCarousel({
            items: 4,
            loop: true,
            margin: 10,
            autoplay: true,
            singleItem: true,
            loop: true,
            center: true,
            responsiveClass: true,
            nav: true,
            dots: false,
            navText: [
               '<i class="fas fa-arrow-left" aria-hidden="true"></i>',
               '<i class="fas fa-arrow-right" aria-hidden="true"></i>'
            ],
            responsive: {
               0: {
                  items: 1,
                  nav: false
               },
               680: {
                  items: 2,
                  nav: false,
                  loop: true
               },
               1000: {
                  items: 2,
                  nav: true,
                  dots: false,
               }
            }
         });
      };

      (function ($) {
         carousels();
      })(jQuery);
   })();
   (function () {
      "use strict";
      var carousels = function () {
         $(".owl-carousel1").owlCarousel({
            items: 4,
            loop: true,
            margin: 10,
            autoplay: true,
            singleItem: true,
            loop: true,
            center: true,
            responsiveClass: true,
            nav: true,
            dots: false,
            navText: [
               '<i class="fas fa-arrow-left" aria-hidden="true"></i>',
               '<i class="fas fa-arrow-right" aria-hidden="true"></i>'
            ],
            responsive: {
               0: {
                  items: 1,
                  nav: false
               },
               680: {
                  items: 2,
                  nav: false,
                  loop: true
               },
               1000: {
                  items: 3,
                  nav: true,
                  dots: false,
               }
            }
         });
      };

      (function ($) {
         carousels();
      })(jQuery);
   })();
   //   owl2
   (function () {
      "use strict";
      var carousels = function () {
         $(".owl-carousel2").owlCarousel({
            items: 4,
            loop: true,
            margin: 10,
            autoplay: true,
            singleItem: true,
            loop: true,
            center: true,
            responsiveClass: true,
            nav: true,
            dots: false,
            navText: [
               '<i class="fas fa-arrow-left" aria-hidden="true"></i>',
               '<i class="fas fa-arrow-right" aria-hidden="true"></i>'
            ],
            responsive: {
               0: {
                  items: 1,
                  nav: true
               },
               680: {
                  items: 2,
                  nav: true,
                  loop: true
               },
               1000: {
                  items: 3,
                  nav: false,
                  dots: false,
                  start: 100,
               }
            }
         });
      };

      (function ($) {
         carousels();
      })(jQuery);
   })();
   (function () {
      "use strict";
      var carousels = function () {
         $(".owl-carousel3").owlCarousel({
            items: 4,
            loop: true,
            margin: 10,
            autoplay: true,
            singleItem: true,
            loop: true,
            center: true,
            responsiveClass: true,
            nav: true,
            dots: false,
            navText: [
               '<i class="fas fa-arrow-left" aria-hidden="true"></i>',
               '<i class="fas fa-arrow-right" aria-hidden="true"></i>'
            ],
            responsive: {
               0: {
                  items: 1,
                  nav: false
               },
               680: {
                  items: 2,
                  nav: false,
                  loop: true
               },
               1000: {
                  items: 3,
                  nav: true,
                  dots: false,
               }
            }
         });
      };

      (function ($) {
         carousels();
      })(jQuery);
   })();
   // owlCarousel slider end
   // single  product slider
   $('#productSlider').lightSlider({ gallery: true, item: 1, loop: true, slideMargin: 0, thumbItem: 9 });

});
$(document).ready(function () {
   $('.not-human, .triangle').hide();
   $('.verify').addClass('disabled');

   function human(e) {
      if ($('.checkbox-text').hasClass('robot')) {
         return;
      }
      else {
         $('.checkbox-text').text("You're human!").css("color", "green").addClass('human');
         $('.checkbox').addClass('disabled');
         $('.checkbox').click(function (e) {
            e.preventDefault();
         });
      }

      $('.not-human, .triangle').slideUp();
   }

   function robot(event) {
      if ($('.checkbox-text').hasClass('human')) {
         return;
      }
      else {
         $('.checkbox-text').text("ROBOT").css("color", "red").addClass('robot');
         $('.checkbox').addClass('disabled');
         $('.checkbox').click(function (event) {
            event.preventDefault();
         });

         $('.not-human, .triangle').slideDown();
      }
   }

   $('.checkbox').click(function () {
      if ($('.checkbox').is(":checked")) {
         $(document).mousemove(function () {
            window.setTimeout(function () {
               human();
            }, 250);
         });

         window.setTimeout(function () {
            robot();
         }, 500);
      };
   });

   $('.captcha-code').keyup(function (event) {
      if ($('.captcha-code').val().length <= 0) {
         $('.verify').addClass('disabled');
      }
      else {
         $('.verify').removeClass('disabled');
      };
   });

   $('.verify').click(function () {
      if ($('.captcha-code').val() == "captcha code") {
         $('.checkbox-text').removeClass('robot').addClass('human');
         $('.not-human, .triangle').slideUp();
      }
   });


   // counter 
   function visible(partial) {
      // Check if partial is defined and is a valid jQuery object
      if (!partial || !(partial instanceof jQuery) || partial.length === 0) {
         console.warn("Warning: `partial` is undefined, not a jQuery object, or is empty:", partial);
         return false;
      }

      var $t = partial,
         $w = jQuery(window),
         viewTop = $w.scrollTop(),
         viewBottom = viewTop + $w.height(),
         _top = $t.offset().top,
         _bottom = _top + $t.height(),
         compareTop = partial === true ? _bottom : _top,
         compareBottom = partial === true ? _top : _bottom;

      return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));
   }


   $(window).scroll(function () {

      if (visible($('.count-digit'))) {
         if ($('.count-digit').hasClass('counter-loaded')) return;
         $('.count-digit').addClass('counter-loaded');

         $('.count-digit').each(function () {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
               duration: 1000,
               easing: 'swing',
               step: function () {
                  $this.text(Math.ceil(this.Counter));
               }
            });
         });
      }
   })

   console.clear();

   const dropdowns = document.querySelectorAll('.dropdown');

   dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', (e) => {
         dropdown.classList.toggle('dropdown__options--visible')
      })

      dropdown.querySelectorAll('.dropdown__options .dropdown__option').forEach(opt => {
         opt.addEventListener('click', (e) => {
            dropdown.querySelector('.dropdown__selected').innerHTML = opt.innerHTML;
         })
      })
   })
});
var calendar = document.getElementById("calendar-table");
var gridTable = document.getElementById("table-body");
var currentDate = new Date();
var selectedDate = currentDate;
var selectedDayBlock = null;
var globalEventObj = {};

var sidebar = document.getElementById("sidebar");

function createCalendar(date, side) {
   var currentDate = date;
   var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

   var monthTitle = document.getElementById("month-name");
   var monthName = currentDate.toLocaleString("en-US", {
      month: "long"
   });
   var yearNum = currentDate.toLocaleString("en-US", {
      year: "numeric"
   });
   monthTitle.innerHTML = `${monthName} ${yearNum}`;

   if (side == "left") {
      gridTable.className = "animated fadeOutRight";
   } else {
      gridTable.className = "animated fadeOutLeft";
   }

   setTimeout(() => {
      gridTable.innerHTML = "";

      var newTr = document.createElement("div");
      newTr.className = "row";
      var currentTr = gridTable.appendChild(newTr);

      for (let i = 1; i < (startDate.getDay() || 7); i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col p-0 empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      lastDay = lastDay.getDate();

      for (let i = 1; i <= lastDay; i++) {
         if (currentTr.children.length >= 7) {
            currentTr = gridTable.appendChild(addNewRow());
         }
         let currentDay = document.createElement("div");
         currentDay.className = "col px-0 py-3";
         if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

            document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
               month: "long",
               day: "numeric",
               year: "numeric"
            });

            selectedDayBlock = currentDay;
            setTimeout(() => {
               currentDay.classList.add("blue");
               currentDay.classList.add("lighten-3");
            }, 900);
         }
         currentDay.innerHTML = i;

         //show marks
         if (globalEventObj[new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()]) {
            let eventMark = document.createElement("div");
            eventMark.className = "day-mark";
            currentDay.appendChild(eventMark);
         }

         currentTr.appendChild(currentDay);
      }

      for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col p-0 empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      if (side == "left") {
         gridTable.className = "animated fadeInLeft";
      } else {
         gridTable.className = "animated fadeInRight";
      }

      function addNewRow() {
         let node = document.createElement("div");
         node.className = "row";
         return node;
      }

   }, !side ? 0 : 270);
}

createCalendar(currentDate);

var todayDayName = document.getElementById("todayDayName");
todayDayName.innerHTML = "Today is " + currentDate.toLocaleString("en-US", {
   weekday: "long",
   day: "numeric",
   month: "short"
});

var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

prevButton.onclick = function changeMonthPrev() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
   createCalendar(currentDate, "left");
}
nextButton.onclick = function changeMonthNext() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
   createCalendar(currentDate, "right");
}

function addEvent(title, desc) {
   if (!globalEventObj[selectedDate.toDateString()]) {
      globalEventObj[selectedDate.toDateString()] = {};
   }
   globalEventObj[selectedDate.toDateString()][title] = desc;
}

function showEvents() {
   let sidebarEvents = document.getElementById("sidebarEvents");
   let objWithDate = globalEventObj[selectedDate.toDateString()];

   sidebarEvents.innerHTML = "";

   if (objWithDate) {
      let eventsCount = 0;
      for (key in globalEventObj[selectedDate.toDateString()]) {
         let eventContainer = document.createElement("div");
         eventContainer.className = "eventCard";

         let eventHeader = document.createElement("div");
         eventHeader.className = "eventCard-header";

         let eventDescription = document.createElement("div");
         eventDescription.className = "eventCard-description";

         eventHeader.appendChild(document.createTextNode(key));
         eventContainer.appendChild(eventHeader);

         eventDescription.appendChild(document.createTextNode(objWithDate[key]));
         eventContainer.appendChild(eventDescription);

         let markWrapper = document.createElement("div");
         markWrapper.className = "eventCard-mark-wrapper";
         let mark = document.createElement("div");
         mark.classList = "eventCard-mark";
         markWrapper.appendChild(mark);
         eventContainer.appendChild(markWrapper);

         sidebarEvents.appendChild(eventContainer);

         eventsCount++;
      }
      let emptyFormMessage = document.getElementById("emptyFormTitle");
      emptyFormMessage.innerHTML = `${eventsCount} events now`;
   } else {
      let emptyMessage = document.createElement("div");
      emptyMessage.className = "empty-message";
      emptyMessage.innerHTML = "Sorry, no events to selected date";
      sidebarEvents.appendChild(emptyMessage);
      let emptyFormMessage = document.getElementById("emptyFormTitle");
      emptyFormMessage.innerHTML = "No events now";
   }
}

gridTable.onclick = function (e) {

   if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
      return;
   }

   if (selectedDayBlock) {
      if (selectedDayBlock.classList.contains("blue") && selectedDayBlock.classList.contains("lighten-3")) {
         selectedDayBlock.classList.remove("blue");
         selectedDayBlock.classList.remove("lighten-3");
      }
   }
   selectedDayBlock = e.target;
   selectedDayBlock.classList.add("blue");
   selectedDayBlock.classList.add("lighten-3");

   selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));

   showEvents();

   document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
   });

}

var changeFormButton = document.getElementById("changeFormButton");
var addForm = document.getElementById("addForm");
changeFormButton.onclick = function (e) {
   addForm.style.top = 0;
}

var cancelAdd = document.getElementById("cancelAdd");
cancelAdd.onclick = function (e) {
   addForm.style.top = "100%";
   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }
}

var addEventButton = document.getElementById("addEventButton");
addEventButton.onclick = function (e) {
   let title = document.getElementById("eventTitleInput").value.trim();
   let desc = document.getElementById("eventDescInput").value.trim();

   if (!title || !desc) {
      document.getElementById("eventTitleInput").value = "";
      document.getElementById("eventDescInput").value = "";
      let labels = addForm.getElementsByTagName("label");
      for (let i = 0; i < labels.length; i++) {
         labels[i].className = "";
      }
      return;
   }

   addEvent(title, desc);
   showEvents();

   if (!selectedDayBlock.querySelector(".day-mark")) {
      selectedDayBlock.appendChild(document.createElement("div")).className = "day-mark";
   }

   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }

}

// calendar
var calendar = document.getElementById("calendar-table");
var gridTable = document.getElementById("table-body");
var currentDate = new Date();
var selectedDate = currentDate;
var selectedDayBlock = null;
var globalEventObj = {};

var sidebar = document.getElementById("sidebar");

function createCalendar(date, side) {
   var currentDate = date;
   var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

   var monthTitle = document.getElementById("month-name");
   var monthName = currentDate.toLocaleString("en-US", {
      month: "long"
   });
   var yearNum = currentDate.toLocaleString("en-US", {
      year: "numeric"
   });
   monthTitle.innerHTML = `${monthName} ${yearNum}`;

   if (side == "left") {
      gridTable.className = "animated fadeOutRight";
   } else {
      gridTable.className = "animated fadeOutLeft";
   }

   setTimeout(() => {
      gridTable.innerHTML = "";

      var newTr = document.createElement("div");
      newTr.className = "row";
      var currentTr = gridTable.appendChild(newTr);

      for (let i = 1; i < (startDate.getDay() || 7); i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col p-0 empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      lastDay = lastDay.getDate();

      for (let i = 1; i <= lastDay; i++) {
         if (currentTr.children.length >= 7) {
            currentTr = gridTable.appendChild(addNewRow());
         }
         let currentDay = document.createElement("div");
         currentDay.className = "col px-0  py-xl-3 py-lg-3 py-2";
         if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

            document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
               month: "long",
               day: "numeric",
               year: "numeric"
            });

            selectedDayBlock = currentDay;
            setTimeout(() => {
               currentDay.classList.add("blue");
               currentDay.classList.add("lighten-3");
            }, 900);
         }
         currentDay.innerHTML = i;

         //show marks
         if (globalEventObj[new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()]) {
            let eventMark = document.createElement("div");
            eventMark.className = "day-mark";
            currentDay.appendChild(eventMark);
         }

         currentTr.appendChild(currentDay);
      }

      for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col p-0 empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      if (side == "left") {
         gridTable.className = "animated fadeInLeft";
      } else {
         gridTable.className = "animated fadeInRight";
      }

      function addNewRow() {
         let node = document.createElement("div");
         node.className = "row";
         return node;
      }

   }, !side ? 0 : 270);
}

createCalendar(currentDate);

var todayDayName = document.getElementById("todayDayName");
todayDayName.innerHTML = "Today is " + currentDate.toLocaleString("en-US", {
   weekday: "long",
   day: "numeric",
   month: "short"
});

var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

prevButton.onclick = function changeMonthPrev() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
   createCalendar(currentDate, "left");
}
nextButton.onclick = function changeMonthNext() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
   createCalendar(currentDate, "right");
}

function addEvent(title, desc) {
   if (!globalEventObj[selectedDate.toDateString()]) {
      globalEventObj[selectedDate.toDateString()] = {};
   }
   globalEventObj[selectedDate.toDateString()][title] = desc;
}

function showEvents() {
   let sidebarEvents = document.getElementById("sidebarEvents");
   let objWithDate = globalEventObj[selectedDate.toDateString()];

   sidebarEvents.innerHTML = "";

   if (objWithDate) {
      let eventsCount = 0;
      for (key in globalEventObj[selectedDate.toDateString()]) {
         let eventContainer = document.createElement("div");
         eventContainer.className = "eventCard";

         let eventHeader = document.createElement("div");
         eventHeader.className = "eventCard-header";

         let eventDescription = document.createElement("div");
         eventDescription.className = "eventCard-description";

         eventHeader.appendChild(document.createTextNode(key));
         eventContainer.appendChild(eventHeader);

         eventDescription.appendChild(document.createTextNode(objWithDate[key]));
         eventContainer.appendChild(eventDescription);

         let markWrapper = document.createElement("div");
         markWrapper.className = "eventCard-mark-wrapper";
         let mark = document.createElement("div");
         mark.classList = "eventCard-mark";
         markWrapper.appendChild(mark);
         eventContainer.appendChild(markWrapper);

         sidebarEvents.appendChild(eventContainer);

         eventsCount++;
      }
      let emptyFormMessage = document.getElementById("emptyFormTitle");
      emptyFormMessage.innerHTML = `${eventsCount} events now`;
   } else {
      let emptyMessage = document.createElement("div");
      emptyMessage.className = "empty-message mt-3 bg-danger p-3";
      emptyMessage.innerHTML = "Sorry, no events to selected date";
      sidebarEvents.appendChild(emptyMessage);
      let emptyFormMessage = document.getElementById("emptyFormTitle  mb-3 bg-danger p-3");
      emptyFormMessage.innerHTML = "No events now";
   }
}

gridTable.onclick = function (e) {

   if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
      return;
   }

   if (selectedDayBlock) {
      if (selectedDayBlock.classList.contains("blue") && selectedDayBlock.classList.contains("lighten-3")) {
         selectedDayBlock.classList.remove("blue");
         selectedDayBlock.classList.remove("lighten-3");
      }
   }
   selectedDayBlock = e.target;
   selectedDayBlock.classList.add("blue");
   selectedDayBlock.classList.add("lighten-3");

   selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));

   showEvents();

   document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
   });

}

var changeFormButton = document.getElementById("changeFormButton");
var addForm = document.getElementById("addForm");
changeFormButton.onclick = function (e) {
   addForm.style.top = 0;
}

var cancelAdd = document.getElementById("cancelAdd");
cancelAdd.onclick = function (e) {
   addForm.style.top = "100%";
   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }
}

var addEventButton = document.getElementById("addEventButton");
addEventButton.onclick = function (e) {
   let title = document.getElementById("eventTitleInput").value.trim();
   let desc = document.getElementById("eventDescInput").value.trim();

   if (!title || !desc) {
      document.getElementById("eventTitleInput").value = "";
      document.getElementById("eventDescInput").value = "";
      let labels = addForm.getElementsByTagName("label");
      for (let i = 0; i < labels.length; i++) {
         labels[i].className = "";
      }
      return;
   }

   addEvent(title, desc);
   showEvents();

   if (!selectedDayBlock.querySelector(".day-mark")) {
      selectedDayBlock.appendChild(document.createElement("div")).className = "day-mark";
   }

   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }

}