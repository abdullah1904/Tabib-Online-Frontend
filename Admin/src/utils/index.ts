const getAvatarFallbackText = (name: string | undefined) => {
    if (!name) return '';
    const names = name.trim().split(' ').filter(Boolean);
    const initials = names.slice(0, 2).map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
}

export {
    getAvatarFallbackText
}