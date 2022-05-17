function generateReport(reportType, authUser){// accept two parameters reportType and authUser

    const reports = [ 'Monthly Expense', 'Pending Invoices', 'Yearly Expenses']//List of type of reports

    if(reports.includes(reportType) && authUser == true){ 

        return true
    }

    return false


}

module.exports = generateReport