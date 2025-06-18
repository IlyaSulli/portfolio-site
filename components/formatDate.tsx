export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  const getOrdinal = (n: number) => {
    if (n >= 11 && n <= 13) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  // If the day is 1 (default for dates like "2024-06"), check if the input string includes a day
  const hasDay = /^\d{4}-\d{2}-\d{2}/.test(dateString);

  if (hasDay) {
    return `${getOrdinal(day)} ${month} ${year}`;
  } else {
    return `${month} ${year}`;
  }
}
