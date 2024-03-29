google.load("jquery", "1.6.2");
google.load("jqueryui", "1.8.16");
var ActiveFilters = [];

function update_filter_results() {
  $('#activity_container .welcome strong').hide();
  $('#activity').empty();
  var load = $('#activity_container .welcome .load');
  load.show();
  $.ajax({
    type: "POST", 
    url:  "/activities",
    data: { projects: JSON.stringify(ActiveFilters) }, 
    success: function(res){
      load.fadeOut('slow', function(){
        $('#activity').html(res);
        $('.activity-item').accordion();
      });
    }
  });
}

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
          console.log(repo);
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

function saveFilterSet(){
  var win = $('<div><p>Enter your filter name</p></div>');
  var userInput = $('<input type="text" style="width:100%"></input>');
  userInput.appendTo(win);

  win.dialog({
    'buttons' : {
      'Ok' : function() {
        $(this).dialog('close');
        $.ajax({
          type: "POST", 
          url:  "/filtersets",
          data: { 
            'filter_name' : $(userInput).val(), 
            'projects'    : JSON.stringify(ActiveFilters) 
          },
          success: function(res){ 
            console.log(res)
          }
        });
      },
      'Cancel' : function(){
        $(this).dialog('close');
      }
    }
  });

}

function init() {
  $(document).ready(function(){
    //loggedIn = false; // TODO Replace this mock with https://github.com/visionmedia/express-expose

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

    // Save button for filter sets
    $('#button-filter-save').button();
    $('#button-filter-save').click(saveFilterSet); 
    
    // Update button applies changes to filter sets and grabs
    // the new data
    $('#button-filter-update').button();
    $('#button-filter-update').live('click', function(){
      update_filter_results();
    }); 

    // Disable personal tabs unless loggedIn
    if(auth.loggedIn) {
      //load_filters( $('#my-people-filters'), '/trending_repos.json', 5, 'all' );
      load_filters( $('#my-repos-filters'), '/projects/filters', 5, 'all' );
    } else {
      $('#filters').tabs('disable', 1);
      $('#filters').tabs('disable', 2);
      $('#button-filter-save').button({disabled: true});
    }

    // Manage an array of active filters
    $('.filter').live('change', function(){
      if(this.value) {
        if ($.inArray(this.name, ActiveFilters) == -1) ActiveFilters.push(this.name);
      } else {
        var i = $.inArray(this.name, ActiveFilters)
        if (i != -1) ActiveFilters.splice(i, 1);
      }
      // Using manual update for now
      // update_filter_results();
    });

    // Quickest Hack to getting Accordion functionality working (cheat)
    $('#activity .activity-item h3 a.expand').live('click', function(){
      $(this).closest('h3').siblings('.activity-item-details').first().toggle('fast');
    });
}

google.setOnLoadCallback(init);
