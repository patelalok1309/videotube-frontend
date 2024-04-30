export const humanReadableDateTime = (date) => {
    const timestamp = new Date(date)

    const now = new Date();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years === 1 ? 'a year' : years + ' years'} ago`;
    } else if (months > 0) {
        return `${months === 1 ? 'a month' : months + ' months'} ago`;
    } else if (days > 0) {
        return `${days === 1 ? 'a day' : days + ' days'} ago`;
    } else if (hours > 0) {
        return `${hours === 1 ? 'an hour' : hours + ' hours'} ago`;
    } else if (minutes > 0) {
        return `${minutes === 1 ? 'a minute' : minutes + ' minutes'} ago`;
    } else {
        return 'just now';
    }
}