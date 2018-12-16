$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    // blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.prepend(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-title staatliches");
    var deleteBtn = $("<button>");
    deleteBtn.text("delete");
    deleteBtn.addClass("delete btn btn-light");
    var editBtn = $("<button>");
    editBtn.text("edit");
    editBtn.addClass("edit btn btn-dark");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<span>");
    newPostCategory.addClass("badge badge-dark lato");
    newPostCategory.text(post.category);
    var newPostAuthor = $("<span>");
    newPostAuthor.addClass("badge badge-light lato");
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostBody.addClass("card-text");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostAuthor.text(post.author);
    var newPostFooter = $("<div>");
    newPostFooter.addClass("card-text");
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostCardHeading.append(newPostDate);
    newPostFooter.append(deleteBtn);
    newPostFooter.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.append(newPostFooter);
    newPostCard.data("post", post);
    newPostCard.css({
      "max-width": "500px",
      "max-height": "500px",
      "padding": "15px",
      "overflow": "auto"
    });
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h4>");
    messageH2.css({ "text-align": "left", "font-family": "'Staatliches', cursive" });
    messageH2.html("No posts? Click <a href='/cms'>here</a> to start!");
    blogContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }

});
