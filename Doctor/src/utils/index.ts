const getAvatarFallbackText = (name: string | undefined, count = 1) => {
    if (!name) return '';
    const names = name.trim().split(' ').filter(Boolean);
    const initials = names.slice(0, count).map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
}

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

export {
    getAvatarFallbackText,
    getDoctorPrefixText
}