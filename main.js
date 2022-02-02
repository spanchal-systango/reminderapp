
// Primary clock logic

let mainClock = document.getElementById("main-clock");
let reminders = []
let currentDate;
let currentTimeInMinutes;

setInterval(function () {
	currentDate = new Date();
	mainClock.innerText = currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
	currentTimeInMinutes = (currentDate.getHours()*60)+currentDate.getMinutes();

}, 1000);

setInterval(function () {
	//check for any reminder
	console.log("intervval chala");

	for(let itr=0; itr<reminders.length; itr++){
		if( currentTimeInMinutes ===  reminders[itr]["nextReminderAt"] ){
			console.log(reminders[itr]["message"]+" "+reminders[itr]["nextReminderAt"]);

			reminders[itr]["nextReminderAt"] = currentTimeInMinutes + reminders[itr]["intervalTime"];
			console.log(reminders[itr]["nextReminderAt"]);

			// show notification logic
			notifiactionListBox = document.getElementById("notifiactionListBox");
			notifiactionListBox.innerHTML = `<div class="alert alert-warning" role="alert"><b>${reminders[itr]["message"]}<b>
			<br>
			<i>reminded at:</i> ${Math.floor(reminders[itr]["nextReminderAt"]/60)}hr${reminders[itr]["nextReminderAt"]%60}min
			</div>
			`+notifiactionListBox.innerHTML;

			var audio = new Audio('./asset/bell.mp3');
			audio.play();
			// show notification logic ends
		}
	}

	showAllReminder();
}, 60000);

// Primary clock logic ends






// set Reminder logic

let SetReminderTimeHours = document.getElementById("SetReminderTimeHours");
let SetReminderTimeHoursInnerStuff = "";

let SetReminderTimeMinutes = document.getElementById("SetReminderTimeMinutes");
let SetReminderTimeMinutesInnerStuff = "";

for(let i=0; i<=24; i++){
	SetReminderTimeHoursInnerStuff = SetReminderTimeHoursInnerStuff+`<option value="${i}">${i}</option>`;
}

for(let i=1; i<=60; i++){
	SetReminderTimeMinutesInnerStuff = SetReminderTimeMinutesInnerStuff+`<option value="${i}">${i}</option>`;
}

SetReminderTimeHours.innerHTML = SetReminderTimeHoursInnerStuff;
SetReminderTimeMinutes.innerHTML = SetReminderTimeMinutesInnerStuff;

function AddReminder(){
	let reminderToSet = {
		"timeWhenReminderSet": currentTimeInMinutes,
		"intervalTime": parseInt((document.getElementById("SetReminderTimeHours").value)*60)+parseInt(document.getElementById("SetReminderTimeMinutes").value),
		"nextReminderAt": currentTimeInMinutes + parseInt((document.getElementById("SetReminderTimeHours").value)*60)+parseInt(document.getElementById("SetReminderTimeMinutes").value),
		"message": document.getElementById("reminderMessage").value,
		"isCancle": 0,
	}

	// console.log(reminderToSet);
	reminders.push(reminderToSet);
	// console.log(reminders);

	showAllReminder();

}

// set Reminder logic ends


// show Reminder logic

function showAllReminder(){
	allReminderDisplayBox = document.getElementById("reminderListBox");
	allReminderDisplayBox.innerHTML = "";

	for(let i = 0; i<reminders.length; i++)
	{
		

		allReminderDisplayBox.innerHTML = allReminderDisplayBox.innerHTML +`<div class="addedRemainderListItem rounded-border col-12 mx-0 my-2 p-2">
          ${reminders[i]["message"]}<br>
          reminder set on: ${Math.floor(reminders[i]["timeWhenReminderSet"]/60)}hr${reminders[i]["timeWhenReminderSet"]%60}min
          <br>
          time interval :${Math.floor(reminders[i]["intervalTime"]/60)}hr${reminders[i]["intervalTime"]%60}min
          <br>
          next reminder on :${Math.floor(reminders[i]["nextReminderAt"]/60)}hr${reminders[i]["nextReminderAt"]%60}min 
          <br><br>
          <button class="btn btn-success py-1 px-2" onclick="editReminder(${i})">edit</button> 
        </div>`;
	}

	//console.log(reminders.length);

}

// show Reminder logic ends


//edit reminder logic

let editReminderTimeHours = document.getElementById("editReminderTimeHours");
let editReminderTimeHoursInnerStuff = "";

let editReminderTimeMinutes = document.getElementById("editReminderTimeMinutes");
let editReminderTimeMinutesInnerStuff = "";

for(let i=0; i<=24; i++){
	editReminderTimeHoursInnerStuff = editReminderTimeHoursInnerStuff+`<option value="${i}">${i}</option>`;
}

for(let i=1; i<=60; i++){
	editReminderTimeMinutesInnerStuff = editReminderTimeMinutesInnerStuff+`<option value="${i}">${i}</option>`;
}

editReminderTimeHours.innerHTML = SetReminderTimeHoursInnerStuff;
editReminderTimeMinutes.innerHTML = SetReminderTimeMinutesInnerStuff;


function editReminder( reminderToEditIndex  ){

	// alert("edit reminder chala");
	console.log("edit pressed");
	console.log(reminderToEditIndex);//reminders
	console.log(typeof(reminderToEditIndex));//reminders


	let editReminderTimeHours = document.getElementById("editReminderTimeHours");
	let editReminderTimeMinutes = document.getElementById("editReminderTimeMinutes");
	let editReminderMessage = document.getElementById("editReminderMessage");
	let editReminderConfirmButton = document.getElementById("editReminderConfirmButton");

 	editReminderTimeHours.disabled = false;
 	editReminderTimeMinutes .disabled = false;
 	editReminderMessage.disabled = false;
	editReminderConfirmButton.disabled = false;

	editReminderTimeHours.value = Math.floor(reminders[reminderToEditIndex]["intervalTime"]/60);
	editReminderTimeMinutes.value = reminders[reminderToEditIndex]["intervalTime"]%60;
	editReminderMessage.value = reminders[reminderToEditIndex]["message"];

	document.getElementById("editReminderConfirmButton").addEventListener("click", 
		function(){confirmEdit(reminderToEditIndex)});

}


function confirmEdit( rmindex ){

	// alert("confirm edit chala");
	
	reminders[rmindex]["message"] = document.getElementById("editReminderMessage").value;
	reminders[rmindex]["intervalTime"] = parseInt((document.getElementById("editReminderTimeHours").value)*60)+parseInt(document.getElementById("editReminderTimeMinutes").value);


	showAllReminder();
}

//edit reminder logic ends



/*
total seconds in a day - 86400
*/

