let course;
let teeNum;
let playerCount;
let playerScores = [];

window.onload = new function ()
{
    newCourse();
}

function newCourse()
{
    playerCount = undefined;
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
  <input type="number" id="playerCount" placeholder="Amount of Players">
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
    playerCount = parseInt(document.getElementById("playerCount").value);
    if (teeNum != -1 && playerCount > 0)
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
    content += "<th>Total</th></tr><tr><th>Yardage</th>";
    let total = 0;
    for (let i = 0; i < course.holes.length; i++)
    {
        total += course.holes[i].teeBoxes[teeNum].yards;
        content += `<td>${course.holes[i].teeBoxes[teeNum].yards}</td>`
    }
    content += `<td>${total}</td></tr><tr><th>Par</th>`;
    total = 0;
    for (let i = 0; i < course.holes.length; i++)
    {
        total += course.holes[i].teeBoxes[teeNum].par;
        content += `<td>${course.holes[i].teeBoxes[teeNum].par}</td>`
    }
    content += `<td>${total}</td></tr>`;
    for (let i = 0; i < playerCount; i++)
    {
        content += `<tr><th contenteditable="true">Player${i + 1}</th>`;
        for (let j = 0; j < course.holes.length; j++)
        {
            content += `<td contenteditable="true"></td>`;
        }
        content += `<td></td></tr>`;
    }

    display.innerHTML = content;
}
document.addEventListener('keyup', logKey);

function logKey(e)
{
    if (playerCount != undefined)
    {
        renderTotals();
    }
}

function renderTotals()
{
    for (let i = 3; i < document.getElementsByTagName("tr").length; i++)
    {
        document.getElementsByTagName("tr").item(i).lastChild.textContent = "";
        let total = 0;
        for (let j = 1; j < document.getElementsByTagName("tr").item(i).cells.length - 1; j++)
        {
            if (document.getElementsByTagName("tr").item(i).cells.item(j).textContent != "")
            {
                total += parseInt(document.getElementsByTagName("tr").item(i).cells.item(j).textContent);
            }

        }
        document.getElementsByTagName("tr").item(i).lastChild.textContent = total;
    }
}