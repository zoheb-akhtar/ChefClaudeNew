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
     if (status === "in-progress") {
        return {
            backgroundColor: "#D0E8F2",
            color: "#0A4D6E",
            secondaryColor: "#1565C0"
        };
    } else if (status === "completed") {
        return {
            backgroundColor: "#A3D9A5",
            color: "#1B5E20",
            secondaryColor: "#2E7D32"
        };
    }
}