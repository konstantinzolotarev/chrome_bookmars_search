jQuery(function($) {
	//Add handler to input.
	$("#searchField").keyup(function() {
		proceed();
	});

	//Add search button handler
	$("#search").click(function() {
		proceed();
	});

	/**
	 * Run search logic
	 */
	function proceed() {
		var str = $("#searchField").val();
		if (str == "") {
			clear();
		} else {
			search(str);
		}
	}

	/** 
	 * Clear result area
	 */
	function clear() {
		$("#results").html("<span></span>");
	}

	/**
	 * Proceed with searching
	 */
	function search(text) {
		clear();
		chrome.bookmarks.search(text, function(bookmarks) {
			if (bookmarks.length < 1) {
				$("#results").html('<div class="alert">No bookmarks found.</div>');
				return;
			}
			var html = "";
			for(var i = 0; i < bookmarks.length; i++) {
				html += "<div class='item'><a href='"+bookmarks[i].url+"' target='_blank'>";
				html += bookmarks[i].title+"</a></div>";
			}
			$("#results").html(html);
		});
	}
});