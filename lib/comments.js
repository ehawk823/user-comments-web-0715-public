'use-strict';

$(document).ready(function(){
  // functions are called inside the document ready
  hideErrors();
  hideForm();
  addCommentListener();
  cancelListener();
  submitCommentListener();
});

// write your functions out here

function hideErrors() {
  $('#com-name-error').hide();
  $('#com-email-error').hide();
  $('#comment-error').hide();
}

function hideForm() {
  $('form#add-comment').hide();

}

function addCommentListener(){
  $('#show-comment-form').click(function(){
    $('form#add-comment').show();
  });
}

function cancelListener(){
  $('#cancel').click(function(){
    $('form#add-comment').hide();
  });
}

function submitCommentListener(){
  $('input[type="submit"]').last().click(function(){
    // var name = $('#comment-name').val();
    // var email = $('#com-email').val();
    // var comment = $('#com-email').val();
    if (nameValidator($('#comment-name').val()) && emailValidator($('#com-email').val()) && commentValidator($('#comment').val())) {
      $('#posts').append("<div class='newcomment'>" +
      "<span class='name'>" + $('#comment-name').val() + "</span>" +
      "<span class='email'>" + $('#com-email').val() + "</span>" +
      "<span class='date'>" + Date.now + "</span>" +
      "<p class='comment'>" +
        $('#comment').val() +
      "</p>" +
    "</div>");
    }
  });
}

function emailValidator(emailAddress) {
    var pattern = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+.([a-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
    if (pattern.test(emailAddress)){
      return true;
    }else{
      $('#com-email-error').show();
    }
}

function commentValidator(comment) {
  if (comment.length === 0 ){
    $('#comment-error').show();
  }else{
    return true;
  }
}

function nameValidator(name) {
  if (name.length < 3){
    $('#com-name-error').show();
  } else {
    return true;
  }
}
