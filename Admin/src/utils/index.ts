const getAvatarFallbackText = (name: string | undefined, count = 1) => {
    if (!name) return '';
    const names = name.trim().split(' ').filter(Boolean);
    const initials = names.slice(0, count).map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
}

const getGenderText = (gender: number)=>{
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

export {
    getAvatarFallbackText,
    getAccountStatusText,
    getGenderText,
    getVerificationDocumentTypeText
}