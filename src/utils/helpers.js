export const convertDuration = (timeInSeconds) => {

    timeInSeconds = timeInSeconds?.toFixed(0)

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    // Add pading if necessary
    const paddedHours = String(hours);
    const paddedMins = String(minutes).padStart(2, "0");
    const paddedSecs = String(seconds).padStart(2, "0");

    if (hours > 0) {
        return `${paddedHours}:${paddedMins}:${paddedSecs}`;
    } 
    else {
        return `${minutes}:${paddedSecs}`;
    }
};
