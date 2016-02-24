var toDoList = [];

var templates = {
  post: [
    "<article data-idx='<%= idx %>'>",
       "<h2><%= content %></h2>",
       "<button class='delete'>delete</button>",
       "<button class='editposts'>edit post</button>",
       "<button class='toggle'>toggle complete</button>",

  ].join("")
}

function getPosts() {
  return toDoList;
}
function addPost(newPost) {
  toDoList.push(newPost);
}
function deletePost(idx) {
  toDoList.splice(idx, 1);
}
function editPost(idx,newPost) {
  return toDoList.splice(idx, 1, newPost);
}


function addPostToDom(postData, templateStr, $target) {
    var tmpl = _.template(templateStr);
    $target.append(tmpl(postData));
}



function addAllPosts(arr) {
  $('section').html('');
  _.each(arr, function (el, idx) {
    el.idx = idx;
    addPostToDom(el, templates.post, $('section'));
  })
}

function getPostFromDom() {

  var content = $('input[name="content"]').val();
  return {
    content: content,
    complete: false

  }
}

  $('form').on('submit', function (event) {
    event.preventDefault();
    var newPost = getPostFromDom();
    console.log(newPost);
      addPost(newPost);
      addAllPosts(getPosts());
      $('input').val('');
  });




  $('section').on('click', '.delete', function (event) {
     var idx = $(this).closest('article').data('idx');
     deletePost(idx);
     addAllPosts(getPosts());
   });

   $('section').on('dblclick', '.editposts', function (event) {
     console.log("Hello, i was clicked", this);

     var editedPost =  $(this).parent().data('idx')
      editPost(editedPost,{idx: editedPost, content: $('input[name="content"]').val()})
      addAllPosts(getPosts());
  });

  $('section').on('click', '.toggle', function(event){
    window.glob = $(this);
    console.log("clicked");
    var toggle = $(this).parent().data('idx');
    toDoList[toggle].complete = !toDoList[toggle].complete
  })
