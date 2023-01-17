function createEmployeeRecord(employeePropsAraay) {
    return {
        firstName: employeePropsAraay[0],
        familyName: employeePropsAraay[1],
        title: employeePropsAraay[2],
        payPerHour: employeePropsAraay[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrayOfEmployeePropsArray) {
    return arrayOfEmployeePropsArray.map(createEmployeeRecord)
};

function createTimeInEvent(employeeObj, date) {
    let timeInEventObj = {
        type: "TimeIn",
        date: date.split(" ")[0],
        hour: parseInt(date.split(" ")[1]),
    };

    employeeObj.timeInEvents.push(timeInEventObj);
    return employeeObj;
}

function createTimeOutEvent(employeeObj, date) {
    let timeOutEventObj = {
        type: "TimeOut",
        date: date.split(" ")[0],
        hour: parseInt(date.split(" ")[1]),
    };

    employeeObj.timeOutEvents.push(timeOutEventObj);
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date) {
    let timeInEventOnDate = employeeObj.timeInEvents.find(
        (timeInEvent) => timeInEvent.date === date
    );

    let timOutEventOnDate = employeeObj.timeOutEvents.find(
        (timeOutEvent) => timeOutEvent.date === date
    );

    return (timOutEventOnDate.hour - timeInEventOnDate.hour) / 100;
}

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour;
}


function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(
        (timeInEvent) => timeInEvent.date
    );

    return datesWorked
        .map((dateWorked) => wagesEarnedOnDate(employeeRecord, dateWorked))
        .reduce(
            (partialSumOfWages, currentWage) => partialSumOfWages + currentWage
        );
}

function calculatePayroll(employeeRecords) {
    return employeeRecords
        .map(allWagesFor)
        .reduce(
            (partialSumOfAllWages, currentEmployeeWage) =>
                partialSumOfAllWages + currentEmployeeWage
        );
}