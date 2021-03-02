var appClass = function () {
	// Application Constructor
	function initialize () {
		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			document.addEventListener("deviceready", onDeviceReady, false);
		}
		else {
			onDeviceReady();
		}
	};
	function onDeviceReady () {
		document.querySelectorAll(".gameButton").forEach(function(eNode) {
			eNode.addEventListener("click", gameButtonClick);
		});
		document.getElementById("buttonReStart").addEventListener("click", restartGame);
		document.getElementById("buttonAbout").addEventListener("click", aboutShow);
		document.getElementById("aboutOK").addEventListener("click", aboutHide);
		initNewGame();
	};
	
	function aboutShow() {
		document.getElementById("about").style.display = "";
	}

	function aboutHide() {
		document.getElementById("about").style.display = "none";
	}

	function restartGame() {
		navigator.notification.confirm(
			"Start new game?",
			function (num) {
				if (num == 1) {
					initNewGame();
				}
			},
			"Are you sure?",
			["Yes", "No"]
		);
		return false;
	}
	
	function initNewGame() {
		for (let i = 0; i < 32; i++) {
			let pos1 = Math.round(0.5+Math.random()*15);
			let pos2 = Math.round(0.5+Math.random()*15);
			swapCeils(pos1, pos2);
		}
	}
	
	function gameButtonClick (e) {
		let curr_val = parseInt(e.srcElement.textContent);
		let curr_pos = parseInt(e.srcElement.id.replace(/^cell/, ''));
		if (curr_pos <= 11 && document.getElementById("cell" + (curr_pos+4)).textContent == 16) {
			swapCeils(curr_pos, curr_pos+4);
		}
		else if (curr_pos >= 4 && document.getElementById("cell" + (curr_pos-4)).textContent == 16) {
			swapCeils(curr_pos, curr_pos-4);
		}
		else if (curr_pos % 4 > 0 && document.getElementById("cell" + (curr_pos-1)).textContent == 16) {
			swapCeils(curr_pos, curr_pos-1);
		}
		else if (curr_pos+1 % 4 > 0 && document.getElementById("cell" + (curr_pos+1)).textContent == 16) {
			swapCeils(curr_pos, curr_pos+1);
		}
		if (checkWin()) {
			navigator.notification.alert(
				"Congratulations! You win!",
				initNewGame,
				"You win!",
				"OK"
			);
		}
	};
	function swapCeils (pos1, pos2) {
		let tmp1 = document.getElementById("cell" + pos1).textContent;
		let tmp2 = document.getElementById("cell" + pos2).textContent;
		document.getElementById("cell" + pos1).textContent = tmp2;
		document.getElementById("cell" + pos1).classList.toggle("redButton", tmp2 == 16);
		document.getElementById("cell" + pos2).textContent = tmp1;
		document.getElementById("cell" + pos2).classList.toggle("redButton", tmp1 == 16);
	};
	
	function checkWin() {
		let rv = true;
		for (let i = 0; i < 16; i++) {
			if (document.getElementById("cell" + i).textContent != (i+1)) {
				return false;
			}
		}
		return rv;
	}
	
	return {initialize: initialize};
};

var app = new appClass();
app.initialize();
