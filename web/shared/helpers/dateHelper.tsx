export const formatToFrenchLongDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const extractDateAndTimeFromDateString = (dateString: string) => {
  const date = new Date(dateString);
  const datePart = date.toISOString().split("T")[0]; // YYYY-MM-DD
  const timePart = date.toTimeString().split(" ")[0].slice(0, 5); // HH:MM
  return { date: datePart, time: timePart };
};
