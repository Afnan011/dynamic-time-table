const currentDateElement = document.getElementById("currentDate");
const currentDay = document.getElementById("currentDay");
const timetableContainer = document.getElementById("timetableContainer");

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
  day1: ["09-01-2024", "18-01-2024", "29-01-2024"],
  day2: ["10-01-2024", "19-01-2024", "30-01-2024"],
  day3: ["11-01-2024", "23-01-2024", "31-01-2024"],
  day4: ["13-01-2024", "24-01-2024", "01-02-2024"],
  day5: ["16-01-2024", "25-01-2024", "02-02-2024"],
  day6: ["17-01-2024", "27-01-2024", "05-02-2024"],
};

const holidays = [{ "26-01-2024": "Republic Day" }];

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

function displayTimetable() {
  const today = new Date().toLocaleDateString("en-GB").replace(/\//g, '-');
//   const today = "-01-2024";

  currentDateElement.innerText = `Today's Date: ${today}`;
  currentDay.innerText = `Today is: ${getDay(today)}`;

  const isHolidayToday = isHoliday(today);
  if (isHolidayToday) {
    timetableContainer.textContent = `Today is a holiday: ${isHolidayToday}`;
    return;
  }

  const todayDay = getDayFromDate(today);
  const todaySubjects = subjectsPerDay[todayDay];

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

displayTimetable();
