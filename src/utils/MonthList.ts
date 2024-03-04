export const monthList = [
  { value: 1, display: "มกราคม" },
  { value: 2, display: "กุมพาพันธ์" },
  { value: 3, display: "มีนาคม" },
  { value: 4, display: "เมษายน" },
  { value: 5, display: "พฤษภาคม" },
  { value: 6, display: "มิถุนายน" },
  { value: 7, display: "กรกฎาคม" },
  { value: 8, display: "สิงหาคม" },
  { value: 9, display: "กันยายน" },
  { value: 10, display: "ตุลาคม" },
  { value: 11, display: "พฤศจิกายน" },
  { value: 12, display: "ธันวาคม" },
];

export const yearList = [
  { value: 2024, display: "2567" },
  { value: 2025, display: "2568" },
];

export const currentMonth = (startDateNote?: string) => {
  const d = new Date();
  const m = d.getMonth() + 1;
  if (startDateNote) {
    const dNow = new Date().getDate();
    let day = parseInt(startDateNote);
    if (dNow < day) {
      return m;
    } else {
      return m + 1 === 13 ? 1 : m;
    }
  }
  return m;
};

export const currentYear = (startDateNote?: string) => {
  const d = new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  if (startDateNote) {
    const dNow = new Date().getDate();
    let day = parseInt(startDateNote);
    if (dNow < day) {
      return y;
    } else {
      return m + 1 === 13 ? y + 1 : y;
    }
  }
  return y;
};
