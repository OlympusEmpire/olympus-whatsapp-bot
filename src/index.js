
exports.core = async (sock, context) => { 

    let now = Date.now();

    try {

    }
    catch (ex) {
        if (ex.toString().includes('this.isZero')) return
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + '|' + time;
        console.log(`${dateTime}>>>>`, e, '<<<<')
    }
}