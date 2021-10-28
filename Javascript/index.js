let promise = new Promise(
    function (resolve, reject)
    {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                resolve(JSON.parse(this.responseText).courses);
            }
            else if (this.readyState == 4)
            {
                reject(`Something went wrong: ${this.responseText}`);
            }
        }
        xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses");
        xhttp.send();
    }
);
promise.then(
    function (arr) 
    {
        let display = document.getElementById("display");
        let content = "";
        for (let i = 0; i < arr.length; i++)
        {
            content += `<div class="card" onclick="loadCard(${arr[i].id})">
                <div class="mask"><img src="${arr[i].image}"></div>
                <div>
                    <p>${arr[i].name}</p>
                </div>
            </div>`
            console.log(arr[i]);
        }
        display.innerHTML += content;
    },
    function (value) 
    {
        console.log(value)
    }
);

function loadCard(id)
{

}
