import { format } from "date-fns";

const getAvatarFallbackText = (name: string | undefined, count = 1) => {
    if (!name) return '';
    const names = name.trim().split(' ').filter(Boolean);
    const initials = names.slice(0, count).map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
}

const formatTime = (timeStr: string) => {
  const date = new Date(`2000-01-01T${timeStr}`);
  return format(date, 'hh:mm a'); // "09:00 PM"
};

const getDoctorPrefixText = (value: number)=> {
  switch (value) {
    case 1:
      return "Dr.";
    case 2:
      return "Prof.";
    case 3:
      return "Prof. Dr.";
    case 4:
      return "Mr. Dr.";
    case 5:
      return "Ms. Dr.";
    case 6:
      return "Mrs. Dr.";
    case 7:
      return "Mx. Dr.";
    case 8:
      return "Assoc. Prof.";
    case 9:
      return "Asst. Prof.";
    case 10:
      return "Assoc. Prof. Dr.";
    case 11:
      return "Asst. Prof. Dr.";
    case 12:
      return "Rev. Dr.";
    case 13:
      return "Consultant";
    case 14:
      return "Surgeon";
  }
}

const getDoctorServiceTypeText = (value: number) => {
  switch (value) {
    case 1:
      return "In-Person";
    case 2:
      return "Audio Call";
    case 3:
      return "Video Call";
  }
}

const getDoctorServiceDurationText = (value: number) => {
  switch (value) {
    case 1:
      return "30 Minutes";
    case 2:
      return "45 Minutes";
    case 3:
      return "60 Minutes";
  }
}

const getDayText = (day: number)=>{
  switch(day){
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

const getApplicationStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "In Progress";
    case 2:
      return "Completed";
    case 3:
      return "Error";
  }
}

export {
    getAvatarFallbackText,
    formatTime,
    getDoctorPrefixText,
    getDoctorServiceTypeText,
    getDoctorServiceDurationText,
    getDayText,
    getApplicationStatusText
}