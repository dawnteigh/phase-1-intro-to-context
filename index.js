// Your code here
function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord)
}
function createTimeInEvent(record, timeStamp) {
    const [date, hour] = timeStamp.split(" ")
    const inArray = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    record.timeInEvents.push(inArray)
    return record
}

function createTimeOutEvent(record, timeStamp) {
    const [date, hour] = timeStamp.split(" ")
    const outArray = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    record.timeOutEvents.push(outArray)
    return record
}
function hoursWorkedOnDate(record, targetDate) {
    let timeOut = record.timeOutEvents.find(obj => obj.date === targetDate)
    let timeIn = record.timeInEvents.find(obj => obj.date === targetDate)
    return (timeOut.hour - timeIn.hour) / 100
}
function wagesEarnedOnDate(record, date) {
    let hoursWorked = hoursWorkedOnDate(record, date)
    return (record.payPerHour * hoursWorked)

}
function allWagesFor(record) {
    let total = 0;
    for (let i = 0; i < record.timeInEvents.length; i++) {
        let wages = wagesEarnedOnDate(record, record.timeInEvents[i].date);
        total += wages;
    }
    return total;
}
function calculatePayroll(employees) {
    return employees.reduce((total, record) => {
        return total + allWagesFor(record)
    }, 0)
}