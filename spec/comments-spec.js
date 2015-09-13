'use-strict';
describe('Validating User Input', function() {
  beforeEach(function() {
    setFixtures('<section id="comments"><h1>User Comments</h1><div id="posts"><div class="newcomment"><span class="name">Lisa Gould</span><span class="email">lisa.gould7684@ymail.com</span><span class="date">09/03/2012</span><p class="comment">Great reading! Thank you Econ News... I would like to see more articles from Chef Boullion. I\'m enjoying the keylime pie recipe with friends.</p></div></div><button id="show-comment-form" onclick="#add-comment">add comment</button><form id="add-comment" action="#" method="post"><label for="comment-name">Name</label><br><input type="text" id="comment-name" name="comment-name"><br><span id="com-name-error">Name must be more than 3 characters!</span><br><label for="com-email">Email</label><br><input type="text" id="com-email" name="com-email"><br><span id="com-email-error">Must be a valid email!</span><br><label for="comment-name">Comment</label><br><textarea id="comment" name="comment" rows="5"></textarea><br><span id="comment-error">Comment text required!</span><br><input type="submit" value="submit"><input id="cancel" type="reset" value="cancel"></form></section>');
    $('form').submit(function(e){ e.preventDefault(); });
  });

  it('#hideErrors should hide all errors when the page loads', function() {
    hideErrors();
    expect($('#com-name-error').css('display')).toBe('none');
    expect($('#com-email-error').css('display')).toBe('none');
    expect($('#comment-error').css('display')).toBe('none');
  });

  it('#hideForm should also hide the form until you click add comment', function() {
    hideForm();
    expect($('form#add-comment').css('display')).toBe('none');
  });

  it('#addCommentListener should display the form when you click add comment', function() {
    hideForm();
    addCommentListener();
    try {
      $('#show-comment-form').click();
    }
    catch(err) {
      // stops error from blowing up test
    }
    expect($('form#add-comment').css('display')).not.toBe('none');
  });

  it('#cancelListener should hide form when cancel is pressed', function() {
    hideForm();
    addCommentListener();
    cancelListener();
    $('#cancel').click();
    expect($('form#add-comment').css('display')).toBe('none');
  });

  describe('#submitCommentListener', function() {
    beforeEach(function(){
      hideErrors();
      hideForm();
      addCommentListener();
      cancelListener();
      submitCommentListener();
    });

    describe('Displays errors with invalid inputs', function() {
      it('#nameValidator should display the name error with a name less than 3 characters', function() {
        $('#comment-name').val('t');
        $('input[type="submit"]').last().click();
        expect($('#com-name-error').css('display')).not.toBe('none');
      });

      it('#emailValidator should display the email error with an invalid email', function() {
        $('#comment-name').val('taco');
        $('#com-email').val('email');
        $('input[type="submit"]').last().click();
        expect($('#com-email-error').css('display')).not.toBe('none');
      });

      it('#commentValidator should display the comment error when no comment is given', function() {
        $('#comment-name').val('taco');
        $('#com-email').val('taco@email.com');
        $('input[type="submit"]').last().click();
        expect($('#comment-error').css('display')).not.toBe('none');
      });
    });

    it('#addComment should display the user post when properly submitted', function() {
      $('#comment-name').val('el taco');
      $('#com-email').val('taco@email.com');
      $('#comment').val('I\'m trizzolllllllin!');
      $('input[type="submit"]').last().click();
      expect($('.newcomment').length).toBe(2);
    });
  });
});
