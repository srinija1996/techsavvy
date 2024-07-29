const addZero = (number: number) => number.toString().padStart(2, "0");

const todayDate = new Date();

const sevenDaysAgoDate = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  todayDate.getDate() - 6
).toDateString();

export const sevenDaysAgo = sevenDaysAgoDate.slice(
  4,
  sevenDaysAgoDate.length - 5
);

const todaysDate = todayDate.toDateString();
export const today = todaysDate.slice(4, todaysDate.length);

const fourteenDaysAgo = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  todayDate.getDate() - 13
).toDateString();

export const fourteenDays = fourteenDaysAgo.slice(
  4,
  sevenDaysAgoDate.length - 5
);

const eightDaysAgoDate = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth(),
  todayDate.getDate() - 7
).toDateString();

export const eightDaysAgo = eightDaysAgoDate.slice(4, eightDaysAgoDate.length);

const oneMonthAgoDate = new Date(
  todayDate.getFullYear(),
  todayDate.getMonth() - 1,
  todayDate.getDate()
);

export const oneMonthAgo = `${oneMonthAgoDate.getFullYear()}-${addZero(
  oneMonthAgoDate.getMonth()
)}-${addZero(oneMonthAgoDate.getDate())}`;

export const todayString = `${todayDate.getFullYear()}-${addZero(
  todayDate.getMonth()
)}-${addZero(todayDate.getDate())}`;

export const getTodaysTime = (time: string) => {
  return new Date(`${todayDate.toISOString().split("T")[0]}T${time}Z`);
};
export const timeFormatter = (date: Date) => {
  const hours = Number(date.toISOString().split("T")[1].split(":")[0]);
  return hours.toString() + "Hr";
};

export const timeInAMPM = (time: string) => {
  const date = getTodaysTime(time);
  const hours = Number(date.toISOString().split("T")[1].split(":")[0]);
  const inAmPm =
    hours === 0
      ? "12am"
      : hours <= 12
      ? `${hours.toString()}am`
      : `${(hours - 12).toString()}pm`;
  return inAmPm;
};
