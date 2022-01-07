function processTime(classTime){
    if (classTime.includes('PM')&&!classTime.includes('12:')){
        classTime = +classTime.slice(0,2)+12+classTime.slice(3,5)
    }
    else{
        classTime = classTime.slice(0,2)+classTime.slice(3,5)
    }
    return classTime
}

function timeList(time,endtype){
    //input: time'..T.R.. 01:20PM-02:40PM; .....F. 01:00PM-03:00PM;'
    //return: [['TH,TU','132000','144000'], ['FR','130000','150000']]
    let btnList = []
    //btnList ['..T.R.. 01:20PM-02:40PM;','.....F. 01:00PM-03:00PM;']
    while (time.includes(';')){
        btnList.push(time.slice(0,time.indexOf(';')))
        time = time.slice(time.indexOf(';')+2)
    }
    tempList = []
    dayDict = {'M':',MO', 'T':',TU', 'W':',WE', 'R':',TH', 'F':',FR'}
    for (const btn of btnList){
        let day = btn.slice(4,7)+btn.slice(0,4)
        if (endtype==2){
            day = btn.slice(0,7)
        }
        let daystring = ''
        for (const i of day){
            if (i in dayDict){
                daystring += dayDict[i]
            }
        }
        daystring = daystring.slice(1)
        let classStart = processTime(btn.slice(8,15))
        let classEnd = processTime(btn.slice(16))
        tempList.push([daystring,classStart,classEnd])
    }
    return tempList
}

function getLink(text, endtype){
    let title = document.querySelector(".title").innerText.replaceAll(' ','%20').normalize('NFKD')
    let re = /Instructor\(s\):(.*)Times:(.*;).*Location:(.*)/
    let t = text.match(re)
    let instructor = t[1].trim().replaceAll(',',', ').replaceAll(' ','%20').normalize('NFKD')
    let time = t[2].trim()
    let location = t[3].trim()
    lastDay = {0:'20220504', 1:'20220304', 2:'20220504'}
    firstDay = {0:{'MO':'20220131', 'TU':'20220201', 'WE':'20220202', 'TH':'20220127', 'FR':'20220128'}, 
                1:{'MO':'20220131', 'TU':'20220201', 'WE':'20220202', 'TH':'20220127', 'FR':'20220128'},
                2:{'MO':'20220321', 'TU':'20220322', 'WE':'20220323', 'TH':'20220324', 'FR':'20220325'}}
    let urlList = []
    for (let btn of timeList(time,endtype)){
        let startDay = btn[0].slice(0,2)
        let url = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${firstDay[endtype][startDay]}T${btn[1]}00/${firstDay[endtype][startDay]}T${btn[2]}00&ctz=America/New_York&recur=RRULE:FREQ=WEEKLY;UNTIL=${lastDay[endtype]}T235900;WKST=SU;BYDAY=${btn[0]}&text=${title}&details=Instructor:%20${instructor}<br/>Classroom:%20${location}`;
        urlList.push(url)
    }
    return urlList
}

function main(){
    let all = document.querySelectorAll("#print_sect_info table tbody");
    for (const section of all){
        let head =  section.querySelector("tr:nth-of-type(1) td b")
        let endtype = head.innerText
        if (endtype.includes("- 3rd Quarter")){
            endtype = 1
        }
        else if (endtype.includes("- 4th Quarter")){
            endtype = 2
        }
        else{
            endtype = 0
        }
        
        for (const info of section.querySelectorAll("tr td")){
            if (info.innerText.includes("Location:") && info.innerText.includes("Times:")){
                
                let text = info.innerText;
                let urlList = getLink(text,endtype)
                if (urlList.length>1){
                    let i = 1;
                    for (let url of urlList){
                        //console.log(url)
                        let btn = document.createElement("button");
                        btn.setAttribute("onclick", `window.open("${url}",'_blank')`)
                        btn.innerHTML = `+Calendar ${i}`;
                        btn.style.marginLeft = "1em"
                        head.append(btn);
                        i+=1;
                    }
                }
                else{
                    //console.log(url)
                    let btn = document.createElement("button");
                    btn.setAttribute("onclick", `window.open("${urlList[0]}",'_blank')`)
                    btn.innerHTML = `+Calendar`;
                    btn.style.marginLeft = "1em"
                    head.append(btn);
                }


            }
        }
    }
}

main()