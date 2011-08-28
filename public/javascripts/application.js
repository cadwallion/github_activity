google.load("jquery", "1.6.2");
google.load("jqueryui", "1.8.16");

function arrayChunk(array, size) {
    var start = 0, result = [], chunk = [];
    while((chunk = array.slice(start, start += size)).length) {
        result.push(chunk);
    }
    return result;
}

function shuffleArray(oldArray) {
	var newArray = oldArray.slice();
 	var len = newArray.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = newArray[i];
  		newArray[i] = newArray[p];
	  	newArray[p] = t;
 	}
	return newArray; 
};

function load_trending_repos(){
  $.getJSON('/trending_repos.json', function(result){
    var buttons_per_set = 5;
    var repo_chunks = arrayChunk(result, buttons_per_set);

    $.each(repo_chunks, function(k, repos){
      $('#featured-repos-filters').append('<div class=".set"></div>');
      var current_set = $('#featured-repos-filters :last');

      $.each(repos, function(k,repo){
        // Generate the markup
        var repo_slug = repo.replace(/\/|\./, '_');

        // Randomize which trending repos are active
        var active = '';
        if (shuffleArray([true, false])[0]) active = 'checked="true"';

        var input = '<input class="filter" id="' + repo_slug + '" name="' + repo_slug + '" type="checkbox" ' + active + ' />';
        var label = '<label for="' + repo_slug + '">' + repo + '</label>';

        current_set.append(input);
        current_set.append(label);
      });
      current_set.buttonset();
    });

  });
}

function init() {
  $(document).ready(function(){

    // Organize filters with a tabbed interface
    $('#filters').tabs();

    // Filters can be toggled on and off
    $('.filter').button();

    // Create filter buttons for trending repositories
    load_trending_repos();

    $('.logo').addGlow({
      radius: 10,
      textColor: '#ffffff',
      haloColor: '#fffaaa',
      duration: 300
    });
  });
}

google.setOnLoadCallback(init);
