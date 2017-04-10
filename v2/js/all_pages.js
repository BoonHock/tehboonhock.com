$(document).ready(function(){
  var myNavbar = $('#myNavbar');
  var iconBars = $('[data-target="#myNavbar"]');
  
  // when browser less than 768px wide, navbar will collapse. use default bootstrap events then.
  $('.mainNav .dropdown').on('mouseenter show.bs.dropdown', function(e){
    var dropdown = $(this);
    if (window.innerWidth > 768){
      dropdown.find('.dropdown-menu').first().stop(true, true).slideDown('fast', function(){ dropdown.addClass('open') });
    }
  }).on('mouseleave hide.bs.dropdown', function(e){
    var dropdown = $(this);
    if (window.innerWidth > 768){
      dropdown.find('.dropdown-menu').first().stop(true, true).slideUp('fast', function(){
        dropdown.removeClass('open');
      });
    }
  });
  myNavbar.on('show.bs.collapse', function(){
    iconBars.addClass('crossed');
  }).on('hide.bs.collapse', function(){
    iconBars.removeClass('crossed');
  });
  // top nav .dropdown-toggle will only open/close dropdown due to bootstrap settings. when user click on it, go to the page instead of just triggering the dropdown.
  $('#myNavbar .dropdown-toggle').on('click', function(){
    window.location.assign($(this).attr('href'));
  });
  
  // Add smooth scrolling to all links in navbar + footer link
  $("#pageSection a").on('click', function(event) {
    $(this).parents('li').addClass('active').siblings('li').removeClass('active');
    // Prevent default anchor click behavior
    event.preventDefault();
    
    // Store hash
    var hash = this.hash;
    
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top - 70
    }, 500, function(){
      
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });
});