export function progressLabel(status) {
    if (status === "cook-later") {
        return "Cook Later"
    } else if (status === "in-progress") {
        return "In Progress"
    } else if (status === "completed") {
        return "Completed"
    }
}

export function progressLabelColor(status) {
    let backgroundColor;
    let color;

    if (status === "in-progress") {
        backgroundColor = "#D0E8F2";
        color = "#0A4D6E";     
    } else if (status === "completed") {
        backgroundColor = "#A3D9A5"
        color = "#1B5E20";
    }

    return {
        backgroundColor: backgroundColor,
        color: color
    }
}

