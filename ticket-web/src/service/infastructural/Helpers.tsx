
function convertTime(time: Date): string {
    const date = new Date(time);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let dt: string | number = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + dt
}

export {
    convertTime
}