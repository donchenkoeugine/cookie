if (location.protocol=="http:") {
    let removeDate=new Date().toUTCString();
    let cookiesList=document.cookie?document.cookie.split(";"):[];
    let cookies=cookiesList.map(item=>{ let arrItem=item.split("="); 
                                        return {name: arrItem[0].trim(),
                                                value: arrItem[1].trim()}
                                      }
                                );
    let table=document.getElementById("cookiesArr");

    function createTr(name, value) {
        let tr = document.createElement("tr");
        tr.innerHTML=`<td>${name}</td><td>${value}</td><td><button class="del" data-name="${name}">Delete</button></td>`;
        return tr;
    }


    for (let i=0; i<cookies.length; i++) {
        table.appendChild(createTr(cookies[i].name, cookies[i].value));
    }

    table.addEventListener("click", e=>{
        if (e.target.tagName=="BUTTON") {
            let cookie = `${e.target.dataset.name}=""; expires=${removeDate}`;
            document.cookie=cookie;
            e.target.closest("tr").remove();
        }
    })

    addCookie.addEventListener("click", e=>{
        let inputs=document.querySelectorAll("[name='inputField']");
        let fullField=0;
        for (let i=0; i<inputs.length; i++) {
            if (inputs[i].value.trim()=="") {
                alert('Should fill all field!');
                break;
            }
            fullField++;
        }
        if (fullField==inputs.length) {
            let t=new Date();
            t.setDate(t.getDate()+parseInt(inputs[2].value));
            let expireTime=t.toUTCString();
            let cookie=`${inputs[0].value}=${inputs[1].value}; expires=${expireTime}`;
            document.cookie=cookie;
            table.appendChild(createTr(inputs[0].value,inputs[1].value));
            inputs.forEach(item=>item.value="");
        }
    })
} else {
    alert("Need HTTP-protocol!")
}