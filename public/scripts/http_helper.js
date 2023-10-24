async function fetchInfo(url)
{
    var info;
    await fetch(url, {
        method: "get",
        headers: {"Content-type" : "application/json"},
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        info = data;
    });
    return info;
}

async function postData(url, method, data)
{
    var info;
    await fetch(url, {
        method: method,
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(data)
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        info = data;
    });
    return info;
}