


	if(typeof(Storage) !== "undefined") {
		    // Code for localStorage/sessionStorage.

		    if (localStorage.counter != undefined)
		    		$("#token").html(localStorage.counter);
		    	
		    $("#plus_button").on('click',plus_action)
		  //  bind 
		} else {
		   $("#token").html("HTML5 LOCAL STORAGE not available ")
		}
	

	function plus_action()
		{
			//check if key its allready stored
			if (localStorage.counter) {
			    localStorage.counter = Number(localStorage.counter) + 1;
			} else {
			    localStorage.counter = 1;

			}
	  		$("#token").html(localStorage.counter);
		}


