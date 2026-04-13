function validateForm() {
    var firstname = document.getElementById("firstname").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    if (firstname === "" || email === "" || message === "") {
        alert("Please fill in all required fields!");
        return false;
    }

    if (message.length > 500) {
        alert("Your message must be 500 characters or less.");
        return false;
    }

    sessionStorage.setItem("firstname", firstname);
    return true;
}

function openLightbox(img) {
    document.getElementById("lightbox-img").src = img.src;
    document.getElementById("lightbox").style.display = "block";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $("#back_to_top").fadeIn();
        } else {
            $("#back_to_top").fadeOut();
        }
    });

    $("#back_to_top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });

    $("#message").on("input", function () {
        var currentLength = $(this).val().length;
        $("#char_count").text(currentLength + " / 500 characters");

        if (currentLength > 500) {
            $("#char_count").css("color", "red");
        } else {
            $("#char_count").css("color", "#5f1c29");
        }
    });

    if ($("#rssFeed").length) {
        var feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://coffeegeek.com/feed/";

        $.getJSON(feedUrl, function (data) {
            var html = "";

            data.items.slice(0, 3).forEach(function (item) {
                html += `
                    <div class="feed-item">
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    </div>
                `;
            });

            $("#rssFeed").html(html);
        }).fail(function () {
            $("#rssFeed").html("<p>Unable to load coffee news at the moment.</p>");
        });
    }

});

document.addEventListener("DOMContentLoaded", function () {
    var savedName = sessionStorage.getItem("firstname");
    var userName = document.getElementById("user_name");

    if (savedName && userName) {
        userName.textContent = savedName;
    }
});