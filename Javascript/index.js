window.onload = new function ()
{
    newCourse();
}

function newCourse()
{
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
            }
            display.innerHTML = content;
        },
        function (value) 
        {
            console.log(value)
        }
    );
}

let course;
let teeNum;

function loadCard(id)
{
    document.getElementById("display").innerHTML = ``;
    let promise = new Promise(
        function (resolve, reject)
        {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function ()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    resolve(JSON.parse(this.responseText).data);
                }
                else if (this.readyState == 4)
                {
                    reject(`Something went wrong: ${this.responseText}`);
                }
            }
            xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${id}`);
            xhttp.send();
        }
    );
    promise.then(
        function (obj) 
        {
            console.log(obj);
            course = obj;
            let display = document.getElementById("display");
            let content = `<div class="inputs"><select name="teeType" id="teeType"><option value="-1">Select Tee Type</option><option value="4">Auto change location</option><option value="3">Women</option><option value="2">Men</option><option value="1">Champion</option><option value="0">Pro</option>
  
</select><button onclick="chooseTee();">Go</button></div>`;
            display.innerHTML = content;
        },
        function (value) 
        {
            console.log(value)
        }
    );
}

function chooseTee()
{
    teeNum = document.getElementById("teeType").value;
    if (teeNum != -1)
    {
        displayTable();
    }
}

function displayTable()
{
    let content = "<table><tr><th>Hole</th>";
    for (let i = 1; i <= course.holes.length; i++)
    {
        content += `<td>${i}</td>`;
    }
    content += "</tr><tr><th>Yardage</th>";
    for (let i = 0; i < course.holes.length; i++)
    {
        content += `<td>${course.holes[i].teeBoxes[teeNum].yards}</td>`
    }
    content += "</tr><tr><th>Par</th>";
    for (let i = 0; i < course.holes.length; i++)
    {
        content += `<td>${course.holes[i].teeBoxes[teeNum].par}</td>`
    }
    display.innerHTML = content;
}