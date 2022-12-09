async function ping(ip) {
    let result = PingState.Failed;
    await $.get('https://steakovercooked.com/api/ping/?host=' + ip, function (data) {
        if (data.includes('0% packet loss')) {
            result =  PingState.Success;
        }
    });
    return result;
}

