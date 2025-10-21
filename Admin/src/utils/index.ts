const getAvatarFallbackText = (name: string | undefined, count = 1) => {
  if (!name) return '';
  const names = name.trim().split(' ').filter(Boolean);
  const initials = names.slice(0, count).map(n => n.charAt(0).toUpperCase()).join('');
  return initials;
}

const getGenderText = (gender: number) => {
  switch (gender) {
    case 1:
      return "Male";
    case 2:
      return "Female";
  }
}

const getAccountStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Active";
    case 2:
      return "Suspended";
    case 3:
      return "Banned";

  }
}

const getVerificationDocumentTypeText = (type: number) => {
  switch (type) {
    case 1:
      return "National ID Card";
    case 2:
      return "Passport";
    case 3:
      return "Other Govt ID";
  }
}


const getMedicalDegreeText = (degree: number) => {
  switch (degree) {
    case 1:
      return "MBBS";
    case 2:
      return "BDS";
    case 3:
      return "DVM";
    case 4:
      return "Pharm-D";
    case 5:
      return "DPT";
    case 6:
      return "BEMS";
    case 7:
      return "BUMS";
    case 8:
      return "DHMS";
  }
}

const getPostGraduateDegreeText = (degree: number) => {
  switch (degree) {
    case 0:
      return "None";
    case 1:
      return "FCPS";  
    case 2:
      return "MCPS";
    case 3:
      return "MD";
    case 4:
      return "MS";
    case 5:
      return "MDS";
    case 6:
      return "MPhil";
    case 7:
      return "MPH";
    case 8:
      return "PhD";
  }
}

const getSpecializationText = (value: number) => {
  switch (value) {
    // --- General & Family Practice ---
    case 1:
      return "General Physician";
    case 2:
      return "Family Medicine";
    case 3:
      return "Internal Medicine";
    case 4:
      return "General Surgeon";

    // --- Internal Medicine Subspecialties ---
    case 5:
      return "Cardiologist";
    case 6:
      return "Dermatologist";
    case 7:
      return "Endocrinologist";
    case 8:
      return "Gastroenterologist";
    case 9:
      return "Hematologist";
    case 10:
      return "Nephrologist";
    case 11:
      return "Neurologist";
    case 12:
      return "Oncologist";
    case 13:
      return "Pulmonologist";
    case 14:
      return "Rheumatologist";
    case 15:
      return "Infectious Disease Specialist";

    // --- Surgical Specialties ---
    case 16:
      return "Orthopedic Surgeon";
    case 17:
      return "Neurosurgeon";
    case 18:
      return "Cardiothoracic Surgeon";
    case 19:
      return "Plastic Surgeon";
    case 20:
      return "Pediatric Surgeon";
    case 21:
      return "Urologist";
    case 22:
      return "Vascular Surgeon";
    case 23:
      return "Laparoscopic Surgeon";

    // --- Women & Child Health ---
    case 24:
      return "Gynecologist";
    case 25:
      return "Obstetrician";
    case 26:
      return "Pediatrician";
    case 27:
      return "Neonatologist";

    // --- Eye, ENT, Dental ---
    case 28:
      return "Ophthalmologist";
    case 29:
      return "ENT Specialist";
    case 30:
      return "Dentist";
    case 31:
      return "Orthodontist";
    case 32:
      return "Oral Surgeon";
    case 33:
      return "Periodontist";
    case 34:
      return "Prosthodontist";
    case 35:
      return "Endodontist";

    // --- Mental Health ---
    case 36:
      return "Psychiatrist";
    case 37:
      return "Psychologist";
    case 38:
      return "Clinical Psychologist";

    // --- Diagnostic & Lab ---
    case 39:
      return "Radiologist";
    case 40:
      return "Pathologist";
    case 41:
      return "Nuclear Medicine Specialist";

    // --- Emergency & Intensive Care ---
    case 42:
      return "Anesthesiologist";
    case 43:
      return "Emergency Medicine";
    case 44:
      return "Critical Care Specialist";
    case 45:
      return "Pain Management Specialist";

    // --- Public & Preventive Health ---
    case 46:
      return "Public Health Specialist";
    case 47:
      return "Epidemiologist";
    case 48:
      return "Community Medicine";
    case 49:
      return "Occupational Health";

    // --- Rehab & Allied Medicine ---
    case 50:
      return "Physiotherapist";
    case 51:
      return "Nutritionist";
    case 52:
      return "Dietitian";
    case 53:
      return "Speech Therapist";
    case 54:
      return "Chiropractor";

    // --- Cosmetic & Misc ---
    case 55:
      return "Cosmetic Surgeon";
    case 56:
      return "Sports Medicine";
    case 57:
      return "Sleep Medicine Specialist";
    case 58:
      return "Sexual Health Specialist";
  }
};

const getDoctorPrefixText = (value: number) => {
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
  getAccountStatusText,
  getGenderText,
  getVerificationDocumentTypeText,
  getMedicalDegreeText,
  getPostGraduateDegreeText,
  getSpecializationText,
  getDoctorPrefixText
}