// for each row
$('li.commits-list-item').each(function(i, el) {
  var $el = $(el);
  var commitId = $el.find('.commit-links-group .sha').attr('href');
  var commentCount = (parseInt($el.find('.commit-links-cell > a:first-child').text()) || 'reviewed') + '';
  var previous = localStorage.getItem(commitId);

  // add .reviewd and .comments if it has been reviewed or there are new comments
  if (previous) {
    $el.addClass('reviewed');
    if (previous !== commentCount) {
      $el.addClass('comments');
    }
  }

  // create the button
  var button = $('<div></div>')
    .addClass('post_github_button')
    .on('click', function() {
      $el.removeClass('comments');
      if (localStorage.getItem(commitId) === commentCount) {
        localStorage.removeItem(commitId);
        $el.removeClass('reviewed');
      } else {
        localStorage.setItem(commitId, commentCount);
        $el.addClass('reviewed');
      }
    });
    
  $el.find('.commit-links-cell').append(button);
});
