const getAvatarFallbackText = (name: string | undefined, count = 1) => {
    if (!name) return '';
    const names = name.trim().split(' ').filter(Boolean);
    const initials = names.slice(0, count).map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
}

export {
    getAvatarFallbackText
}