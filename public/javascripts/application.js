google.load("jquery", "1.6.2");
google.load("jqueryui", "1.8.16");

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

  });
}

google.setOnLoadCallback(init);
