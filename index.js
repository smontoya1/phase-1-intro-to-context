function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords (arrays) {
    return arrays.map(createEmployeeRecord)
};

function createTimeInEvent(employee, dateTime) {
    const [date, time] = dateTime.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10)
    })

    return employee;
};

function createTimeOutEvent(employee, dateTime) {
    const [date, time] = dateTime.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10)
    })

    return employee;
};

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(element => element.date === date)
    const timeOut = employee.timeOutEvents.find(element => element.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(element => element.date === date)
    const timeOut = employee.timeOutEvents.find(element => element.date === date)

    return (timeOut.hour - timeIn.hour) * employee.payPerHour / 100
} 

function allWagesFor (employee) {
    const dates = employee.timeInEvents.map(element => element.date)

    const allWages = dates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);

    return allWages;
}

function calculatePayroll (employees) {
    return employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0)
}