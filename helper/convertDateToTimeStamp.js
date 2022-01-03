const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//hh:mm, MMMM DD YYYY
const convert = (datetime) => {
    const myDatetime = datetime.split(',');
    const myDate = myDatetime[1].split(' ');
    const myTime = myDatetime[0].split(':');
    const date = new Date(myDate[3], months.findIndex(month => { return month == myDate[1]}), myDate[2], myTime[0], myTime[1])

    return date.getTime();
}

module.exports = {
    convert
}