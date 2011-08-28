google.load("jquery", "1.6.2");
google.load("jqueryui", "1.8.16");

function load_trending_repos(){
  $.getJSON('/trending_repos.json', function(repos){
    console.log('repos loaded');
    $.each(repos, function(k,repo){
      // TODO Create the button
    });
  });
}

function init() {
  $(document).ready(function(){
    
    // Toggle display of filters and activity
    $('#filters-accordion').accordion({
        collapsible: true
    });
    $('#activity-accordion').accordion({
        collapsible: true
    });

    // Organize filters with a tabbed interface
    $('#filters').tabs();

    // Filters can be toggled on and off
    $('.filter').button();

    // Create filter buttons for trending repositories
    load_trending_repos();
  });
}

google.setOnLoadCallback(init);
