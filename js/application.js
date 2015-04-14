$( document ).ready(function() {

    $.ajax({
      type: 'GET',
      url: 'http://harry-quotes-69-216771.apse1.nitrousbox.com:8080/quotes',
      success: function(response) {
        for (var i = 0; i < response.length; i++) {
        	$('#list-all tbody').append("<tr><td contentEditable=\"true\" class=\"quote-field\">" + response[i].quote + "</td><td contentEditable=\"true\" class=\"author-field\">" + response[i].author + "</td><td><button id=\"" + response[i]._id + "\" class=\"delete\">Delete</button></td><td><button class=\"update\">Update</button></td></tr>");
        };
        
        $('.delete').on('click', function() {
					var objectId = $(this).attr('id');
					console.log(objectId);

					$.ajax({
						type: 'DELETE',
						url: 'http://harry-quotes-69-216771.apse1.nitrousbox.com:8080/quotes/' + objectId,
						success: function(response) {
							console.log(response);
							$('#' + objectId).parent().parent().remove();
						}
					});
				});

				$('.update').on('click', function() {
					var quoteUpdate = $(this).parent().parent().find('.quote-field').html();
					var authorUpdate = $(this).parent().parent().find('.author-field').html();
					var objectId = $(this).parent().parent().find('.delete').attr('id');

					$.ajax({
						type: 'PUT',
						url: 'http://harry-quotes-69-216771.apse1.nitrousbox.com:8080/quotes/' + objectId + '/edit',
						data: {
			        quote: {
			        	quote: quoteUpdate,
			        	author: authorUpdate
			        }
				    },
						success: function(response) {
							console.log(response);
						}
					});
				});
      }
		});

		$('#submit').on('click', function() {
			var quoteInput = $('#quote').val();
			var authorInput = $('#author').val();
			// console.log(quoteInput);
			// console.log(authorInput);
			$.ajax({
		    type: 'POST',
		    url: 'http://harry-quotes-69-216771.apse1.nitrousbox.com:8080/quotes',
		    data: {
		        quote: {
		        	quote: quoteInput,
		        	author: authorInput
		        }
		    },
		    dataType: 'json',
		    success: function(response){
	        console.log(response);
	        if (response.ok == true) {
	        	$('#list-all tbody').append("<tr><td>"+ quoteInput +"</td><td>" + authorInput + "</td></tr>");
	        } else {
	        	console.log("error");
	        }
		    }
			});
		});

		$('#search').on('click', function() {
			var searchInput = $('#search-input').val();
			console.log(searchInput);
			$.ajax({
		    type: 'GET',
		    url: 'http://harry-quotes-69-216771.apse1.nitrousbox.com:8080/quotes/search/' + searchInput,
		    dataType: 'json',
		    success: function(response){
		    	console.log(response);
		      for (var i = 0; i < response.length; i++) {
        		$('#search-results tbody').append("<tr><td>" + response[i].quote + "</td><td>" + response[i].author + "</td><td><button class=\"delete\">Delete</button></td><td><button class=\"update\">Update</button></td></tr>");
        	}
		    }
			});
		});



});