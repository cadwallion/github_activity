var PusherConfig = {
  app_id: '32',
  key:    '68539979797b164a734e',
  secret:  '1cbad9d32b7a7efdd032' 
}

var pusher = new Pusher(PusherConfig.key);
var channel = pusher.subscribe('github_channel'); 

channel.bind('test_event', function(data){
  alert(data);
});

