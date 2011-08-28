google.load("jquery", "1.6.2");
google.load("jqueryui", "1.8.16");
var ActiveFilters = [];

/* Fetch a list of 'filters' (people or repositories)
   and render the filter buttonsets for a given tab.

   tab(jQuery): DOM object to render the object to
   url(String): A JSON url that responds with an array of people or repos
   buttons_per_set(Integer): How many buttons to display on a row
   activationStrategy(String|false): One of 'all', 'random', or false
*/
function load_filters(tab, url, buttons_per_set, activationStrategy){
  tab.empty();
  $.getJSON(url, function(result){
    var repo_chunks = arrayChunk(result, buttons_per_set);
    tab.fadeOut('slow', function(){
      tab.children('.load').hide();
    
      $.each(repo_chunks, function(k, repos){
        tab.append('<div class=".set"></div>');
        var current_set = tab.children().last();

        $.each(repos, function(k,repo){
          // Generate the markup
          var repo_slug = repo.replace(/\/|\./, '_');

          var active = '';
          if (activationStrategy == 'random') {
            if (shuffleArray([true, false])[0]) active = 'checked="true"';
          } else if (activationStrategy == 'all') {
            active = 'checked="true"';
          }

          // Add to the ActiveFilters array
          if (active == 'checked="true"') ActiveFilters.push(repo_slug);

          var input = '<input class="filter" id="' + repo_slug + '" name="' + repo_slug + '" type="checkbox" ' + active + ' />';
          var label = '<label for="' + repo_slug + '">' + repo + '</label>';

          current_set.append(input + label);
        });
        current_set.buttonset();
      });

    });

    tab.fadeIn('slow');

  }).error(function(){
    tab.children('.load').hide();
    console.log('Failed to load filters list');
  });
}

function init() {
  $(document).ready(function(){
    loggedIn = false; // TODO Replace this mock with https://github.com/visionmedia/express-expose

      // Glow logo on hover
      $('.logo').addGlow({
        radius: 5,
        textColor: '#a7c2db',
        haloColor: '#fffaaa',
        duration: 300
      })
    });

    // Organize filters with a tabbed interface
    $('#filters').tabs();

    load_filters( $('#trending-repos-filters'), '/trending_repos.json', 5, 'random' );

    // Disable personal tabs unless loggedIn
    if(loggedIn) {
      load_filters( $('#my-people-filters'), '/trending_repos.json', 5, 'all' );
      load_filters( $('#my-projects-filters'), '/trending_repos.json', 5, 'all' );
    } else {
      $('#filters').tabs('disable', 1);
      $('#filters').tabs('disable', 2);
    }

    // Filters can be toggled on and off
    $('.filter').button();

    // Manage an array of active filters
    $('.filter').live('change', function(){
      if(this.value) {
        if ($.inArray(this.name, ActiveFilters) == -1) ActiveFilters.push(this.name);
      } else {
        var i = $.inArray(this.name, ActiveFilters)
        if (i != -1) ActiveFilters.splice(i, 1);
      }

      $.ajax({
        type: "POST", 
        url:  "/activities",
        data: ActiveFilters, 
        success: function(res){ 
          console.log(res)
        }

      });
      console.log(ActiveFilters);
    });
}

google.setOnLoadCallback(init);
