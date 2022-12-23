var PlaylistID = 0;
$(document).ready(function(){
	$('#iframe_body').html('');
	chrome.storage.sync.get('userid', function(items) {
	    var userid = items.userid;
	    if (userid) {
	        useToken(userid);
	    } else {
	        userid = getRandomToken();
	        chrome.storage.sync.set({userid: userid}, function() {
	            useToken(userid);
	        });
	    }
	});

	//loadPageData();
	$("#userID").click(function() {
		  chrome.storage.sync.get('userid', function(items) {
		    var userid = items.userid;    
	        useToken(userid);    
		});
	});

	$("#updateSecret").click(function() {
		var secret = $('#secret_Field').val();
		chrome.storage.sync.set({secret: secret}, function() {
	        //useToken(userid);
	    });
	    $('.update_secret_div').hide();
	});

	$("#deviceSecret").click(function() {
		chrome.storage.sync.get('secret', function(items) {
	    var secret = items.secret;
		    $('#secret_Field').val(secret);
		});
	    $('.update_secret_div').show();
	});
	$("#hideSecret").click(function() {
		$('.update_secret_div').hide();
	});


	$("#loadPage").click(function() {
		loadPageAgain();
	});
	setTimeout('loadPageAgain()',5000);
	setTimeout('test()',5000);
});

function test(){
	console.log('I am called.');
}
function loadPageAgain(){
	chrome.storage.sync.get('secret', function(items) {
    var secret = items.secret;
	    $('#secret_Field').val(secret);
	});
	chrome.storage.sync.get('userid', function(items) {
		var d = new Date(); // for now
		var hors = d.getHours(); // => 9
		var mins = d.getMinutes(); // =>  30
		var time = hors+':'+mins;
	    var userid = items.userid;   
	    var secret = $('#secret_Field').val(); 
       	
        $.ajax({
		url: "https://signlauncher.com/getPageNumber",
          type: "get",
          data: {token:userid,secret:secret,time:time},
          success: function(res){
          	resp = JSON.parse(res);
          	if(resp.status == "success"){
          		if(PlaylistID != resp.play_list){
          			$('#controls').hide();
          			var htmlUrl = 'https://signlauncher.com/getPage?time='+time+'&token='+userid+'&type=html&secret='+secret;
          			$('#webview').attr('src',htmlUrl);
          			$('#webview').width($(window).width());
          			$('#webview').height($(window).height());
          			$('#webview').show();
          		}
          	}else{
          		
          	}
          },
          error: function(data){
          	$('#iframe_body').html('Issue in loading');
          }	
       });
	});
}
function loadHtml(uri,layout,index){
	$.ajax({
		url: "https://signlauncher.com/loadurl",
          type: "get",
          data: {url:uri},
          success: function(htm){
          		var html = JSON.parse(htm);
	  			$('#layout_'+layout+' .f_'+index).html(html['html']);
          }	
    });
}

function getRandomToken() {
	// E.g. 8 * 32 = 256 bits token
	var randomPool = new Uint8Array(5);
	crypto.getRandomValues(randomPool);
	var hex = '';
	for (var i = 0; i < randomPool.length; ++i) {
	    hex += randomPool[i].toString(16);
	}
// E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
return hex+'-'+Date.now();
}


function useToken(userid){
	$('#iframe_body').text(userid);
}