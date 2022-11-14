export const resetForm = (form) => {
  Object.keys(form).forEach((key) => (form[key] = ""));
};

export const formatDate = (date) => {
  var formattedDate =
    pad(date.getUTCDate()) +
    "/" +
    pad(date.getUTCMonth() + 1) +
    "/" +
    pad(date.getUTCFullYear());

  return formattedDate;
};

function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

export const defaultInputDate = (date) =>
  date ? new Date(date).toISOString().slice(0, 10) : undefined;
