const currentDateElement = document.getElementById("currentDate");
const currentDay = document.getElementById("currentDay");
const timetableContainer = document.getElementById("timetableContainer");
const timeTableDay = document.getElementById("timeTableDay");
const timeDay = document.querySelector(".timeDay");


// const blazerDay = document.getElementById('blazerDay');

const subjectsPerDay = {
  day1: [
    { time: "9:00-9:55", subject: "NoSQL" },
    { time: "9:55-10:50", subject: "IoT" },
    { time: "11:10-12:05", subject: "Societal presentation(AK)" },
    { time: "12:05-1:00", subject: "DAP" },
    { time: "2:00-4:45", subject: "Project presentation" },
  ],
  day2: [
    { time: "9:00-9:55", subject: "IoT" },
    { time: "9:55-10:50", subject: "DAP" },
    { time: "11:10-12:05", subject: "KE" },
    { time: "12:05-1:00", subject: "PLACEMENT(NH)" },
    { time: "2:00-3:50", subject: "DAP(RK-NH)/IoT(VBS+RM)" },
  ],
  day3: [
    { time: "9:00-9:55", subject: "IoT" },
    { time: "9:55-10:50", subject: "NoSQL" },
    { time: "11:10-1:00", subject: "SOCIETAL LAB(AK)" },
    { time: "2:00-3:50", subject: "DAP(RK+AK)/IoT(VBS+RM)" },
  ],
  day4: [
    { time: "9:00-9:55", subject: "KE" },
    { time: "9:55-10:50", subject: "IoT+" },
    { time: "11:10-1:00", subject: "Association(RK+RM)" },
    { time: "2:00-2:55", subject: "NoSQL" },
  ],
  day5: [
    { time: "9:00-9:55", subject: "NoSQL" },
    { time: "9:55-10:50", subject: "KE" },
    { time: "11:10-12:05", subject: "DAP" },
    { time: "12:05-1:00", subject: "PLACEMENT(NH)" },
    { time: "2:00-4:45", subject: "PROJECT LAB(NH) RK)" },
  ],
  day6: [
    { time: "9:00-9:55", subject: "KE" },
    { time: "9:55-10:50", subject: "DAP+" },
    { time: "11:10-1:00", subject: "Internship presentation" },
    { time: "2:00-3:50", subject: "Mini Project IoT(RM)/DAP(RK)" },
  ],
};


const datesToDaysMapping = {
  "day1": ["09-01-2024", "18-01-2024", "29-01-2024", "06-02-2024", "13-02-2024", "21-02-2024", "28-02-2024", "07-03-2024", "15-03-2024", "23-03-2024", "01-04-2024", "10-04-2024"],
  "day2": ["10-01-2024", "19-01-2024", "30-01-2024", "07-02-2024", "14-02-2024", "22-02-2024", "29-02-2024", "09-03-2024", "18-03-2024", "25-03-2024", "02-04-2024", "11-04-2024"],
  "day3": ["11-01-2024", "23-01-2024", "31-01-2024", "08-02-2024", "15-02-2024", "23-02-2024", "01-03-2024", "11-03-2024", "19-03-2024", "26-03-2024", "03-04-2024", "12-04-2024"],
  "day4": ["13-01-2024", "24-01-2024", "01-02-2024", "09-02-2024", "16-02-2024", "24-02-2024", "04-03-2024", "12-03-2024", "20-03-2024", "27-03-2024", "04-04-2024", "13-04-2024"],
  "day5": ["16-01-2024", "25-01-2024", "02-02-2024", "10-02-2024", "19-02-2024", "26-02-2024", "05-03-2024", "13-03-2024", "21-03-2024", "28-03-2024", "05-04-2024", "15-04-2024"],
  "day6": ["17-01-2024", "27-01-2024", "05-02-2024", "12-02-2024", "20-02-2024", "27-02-2024", "06-03-2024", "14-03-2024", "22-03-2024", "30-03-2024", "08-04-2024", "16-04-2024"]
};

const holidays = [
  {"26-01-2024": "Republic Day" }, 
  {"08-03-2024":"Mahashivaratri"},
  {"29-03-2024": "Good Friday"}, 
  {"09-04-2024": "Chandrama Ugadi"}
];

function getDateObject(date) {
  const dateParts = date.split("-");
  const year = parseInt(dateParts[2]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-based
  const day = parseInt(dateParts[0]);

  return new Date(year, month, day);
}

function isSaturday(date) {
  const dateObj = getDateObject(date);
  const dayOfWeek = dateObj.getDay();

  const isSaturday = dayOfWeek === 6;

  const isFirstOrThirdSaturday =
    dateObj.getDate() <= 7 ||
    (dateObj.getDate() > 14 && dateObj.getDate() <= 21);

  return isSaturday && isFirstOrThirdSaturday;
}

function isSunday(date) {
  const dateObj = getDateObject(date);
  const dayOfWeek = dateObj.getDay();
  return dayOfWeek === 0;
}

function isHoliday(date) {
  if (isSaturday(date)) {
    return "Saturday";
  }

  if (isSunday(date)) {
    return "Sunday";
  }

  const matchingHoliday = holidays.find((holiday) => date in holiday);
  return matchingHoliday ? matchingHoliday[date] : null;
}

function getDayFromDate(date) {
  for (const [day, dates] of Object.entries(datesToDaysMapping)) {
    if (dates.includes(date)) {
      return day;
    }
  }
  return null;
}

function getDay(date) {
  const dateObj = getDateObject(date);
  const dayOfWeek = dateObj.getDay();
  let day = 'Monday'

  switch (dayOfWeek) {
    case 0:
        day = "Sunday";
        break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;

    case 4:
      day = "Thursday";
      break;

    case 5:
      day = "Friday";
      break;

    case 6:
      day = "Saturday";
      break;

  }

  return day;
}

function isBlazerDay(date) {
  const dateObj = getDateObject(date);
  const dayOfWeek = dateObj.getDay();
  console.log();
  return dayOfWeek === 2 || dayOfWeek === 4;

}



function displayTimetable(date) {

  currentDateElement.innerText = `Date: ${date}`;
  currentDay.innerText = getDay(date);

  const isHolidayToday = isHoliday(date);
  if (isHolidayToday) {
    timetableContainer.textContent = `Holiday: ${isHolidayToday}`;
    timeDay.style = 'display: none';  
    return;
  }
  else{
    timeDay.style = 'display: block';
  }

  // if(isBlazerDay(date)) {
  //   blazerDay.style = 'display: block';
  // }
  // else{
  //   blazerDay.style = 'display: none';
  // }

  const todayDay = getDayFromDate(date);
  const todaySubjects = subjectsPerDay[todayDay];

  timeTableDay.innerText = todayDay;
  timetableContainer.textContent = "";

  if (todaySubjects) {
    const timetableTable = document.createElement("table");
    timetableTable.innerHTML = `
      <tr>
        <th>Time</th>
        <th>Subject</th>
      </tr>
    `;

    timetableTable.classList.add("table");

    todaySubjects.forEach((item) => {
      const row = timetableTable.insertRow();
      row.insertCell(0).textContent = item.time;
      row.insertCell(1).textContent = item.subject;
    });
    timetableContainer.appendChild(timetableTable);
  } else {
    timetableContainer.textContent += "No timetable for today.";
  }
}




function openDatePicker() {
  const datePicker = document.getElementById("datePicker");
  const date = new Date().toISOString().split('T')[0];
  datePicker.value = date;
  const today = new Date().toLocaleDateString("en-GB").replace(/\//g, '-');
  displayTimetable(today);


  datePicker.addEventListener("input", function() {
      const selectedDate = datePicker.value;
      let formattedDate = new Date(selectedDate).toLocaleDateString("en-GB").replace(/\//g, '-')
      formattedDate = selectedDate == "" ? new Date().toLocaleDateString("en-GB").replace(/\//g, '-') : formattedDate;
      displayTimetable(formattedDate);
  });
}

openDatePicker()
