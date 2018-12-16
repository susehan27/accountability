$(document).ready(function() {
    
    var prayerContainer = $(".prayerCards");
    $(document).on("click", "button.delete", handlePostDelete);
    
    var prayers;

    function getPrayers() {
        $.get("/api/prayers", function(data) {
            console.log("prayers", data);
            prayers = data;
            if (!prayers || !postMessage.length) {
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });
    }

    function deletePrayer(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/prayers/" + id
        }).then(function() {
            getPrayers();
        });
    }

    getPrayers();

    function initializeRows() {
        prayerContainer.empty();
        var prayersToAdd = [];
        for (var i = 0; i < prayers.length; i++) {
            prayersToAdd.push(createNewRow(prayers[i]));
        }
        prayerContainer.append(prayersToAdd);
    }

    function createNewRow(prayer) {
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-dark");
        //var editBtn = $("<button>");
        // editBtn.text("edit");
        // editBtn.addClass("edit btn btn-light");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        var newPostBodyDate = $("<p>");
        newPostTitle.text(prayer.title + " ");
        newPostBody.text(prayer.body);
        var formattedDate = new Date(prayer.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        newPostDate.text(formattedDate);
        newPostBodyDate.append(newPostDate);
        newPostCardHeading.append(deleteBtn);
        //newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        newPostCardBody.append(newPostBodyDate);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("prayer", prayer);
        newPostCard.css({
            float: "left",
            "max-width" : "18rem",
            "background-color": "#ff7082",
            "color": "white",
            "font-family": "'Lato', sans-serif"
        });
        return newPostCard;
    }

    function handlePostDelete() {
        var currentPrayer = $(this)
          .parent()
          .parent()
          .data("prayer");
        deletePrayer(currentPrayer.id);
    };

    // function displayEmpty() {
    //     prayerContainer.empty();
    //     var messageH2 = $("<h2>");
    //     messageH2.css({ "text-align": "center", "margin-top": "50px" });
    //     messageH2.html("No posts? Click <a href='/cms'>here</a> to start!");
    //     prayerContainer.append(messageH2);
    // };

    var url = window.location.search;
    var prayerId;
    var updating = false;

    if (url.indexOf("?prayer_id=") !== -1) {
        prayerId = url.split("=")[1];
        getPrayerData(prayerId);
    };

    var titleInput = $(".prayerName");
    var textInput = $(".prayerText");
    var prayerForm = $(".newPrayerCard");

    $(prayerForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();

        if (!titleInput.val().trim() || !textInput.val().trim()) {
            return;
        }
        var newPrayer = {
            title: titleInput.val().trim(),
            body: textInput.val().trim()
        };

        console.log(newPrayer);

        if (updating) {
            newPrayer.id = prayerId;
            updatePrayer(newPrayer);
        }
        else {
            submitPrayer(newPrayer);
        }
    });

    function submitPrayer(Prayer) {
        $.post("/api/prayers/", Prayer, function() {
            window.location.href = "/pray";
        });
    }

    function getPrayerData(id) {
        $.get("/api/prayers/" + id, function(data) {
            if (data) {
                titleInput.val(data.title);
                textInput.val(data.body);
                
                updating = true;
            }
        });
    }

    function updatePrayer(prayer) {
        $.ajax({
            method: "PUT",
            url: "/api/prayers",
            data: prayer
        }).then(function() {
            window.location.href = "/pray"
        });
    }

});