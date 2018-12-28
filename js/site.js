var currPage = 1;
var showMenu = false;
var showProjectsDropDown = false;

//var URL = "192.168.2.187:8000"
var URL = "127.0.0.1:8000"

function toggleNight() {
    $.ajax({
        url: "http://" + URL + "/ajax-toggle-night"
      }).done(function(response) {
        console.log(response);
        location.reload(true);
        //alert('test1');
      })
      .fail(function (e) {
        console.log(e);
        //alert('test2');
      })
      ;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$(document).ready(function(){

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", document.getElementsByName('csrfmiddlewaretoken')[0].value);  
            }
        }
    });

    $("#morePosts").click(function() {
        // $.get("localhost:8000/posts/ajax/" + currPage) , function(response) {
        //     //No more posts
        //     console.log(response);
        //     if (response == 400) {
        //         $("#morePosts").css("display", "none");
        //     }
        //     else {
        //         $("#posts").html = $("#posts").html + response;
        //     }
        // }
        $.ajax({
            url: "http://" + URL + "/ajax/" + (currPage + 1)
          }).done(function(response) {
            console.log(response);
            if (response["more_posts"] || !response["no_posts"]){
                $("#posts").append(response["html"]);
                var moreposts = document.getElementById('morePosts');
                moreposts.parentNode.appendChild(moreposts);
                currPage++;
            }
            
            if (!response["more_posts"]) {
                $("#morePosts").css("display", "none");
            }

          })
          .fail(function (e) {
              console.log(e);
          })
          ;
    });
    $("#toggle-night").click(function() {
        toggleNight();
    });
    $("#toggle-night-small").click(function() {
        toggleNight();
    });
    $("#small-menu-button").click(function() {
        showMenu = !showMenu;
        if (showMenu) {
            $("#small-menu").css("display", "block");
        }
        else {
            $("#small-menu").css("display", "none");
        }
        
    });
    $("#projects").click(function() {
        showProjectsDropDown = !showProjectsDropDown;
        if (showProjectsDropDown) {
            $("#projects-dropdown").css("display", "inline-block");
        }
        else {
            $("#projects-dropdown").css("display", "none");
        }
    });
    $("#comment-button").click(function() {
        //alert('test');
        data = {};
        data.content = document.getElementById('comment-text').value;
        data.author = "Anon";
        post_id = document.getElementById('post').getAttribute('data-value');
        console.log(post_id);
        $.post(
            "http://" + URL + "/ajax-comment/" + post_id,
            JSON.stringify(data)
          ).done(function(response) {
            console.log(response);
            location.reload(true);
            //alert('test1');
          })
          .fail(function (e) {
            console.log(e);
            //alert('test2');
          })
          ;
    });
});
