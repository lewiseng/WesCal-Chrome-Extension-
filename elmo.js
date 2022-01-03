let x = document.getElementsByClassName("portrait")[0];
let y = x.getElementsByTagName("img")[0]
y.src = "https://pngimg.com/uploads/elmo/elmo_PNG90517.png"
y.style.maxWidth = "90%"

let z = document.getElementsByClassName("president-menu")[0].closest("blockquote")
z.innerHTML =`\n  "Muppets should find what they love to do, get better at it, and learn to share what they love with others."\n    
    <div class="president-menu">\n          
        President Elmo S. Sesame '78<br>\n          
        Wesleyan University\n <br>          
        <div class="president-links" style="margin-top: 0.5em;">\n \n  \n       
            <a class="btn president-1" href="https://www.wesleyan.edu/president/index.html">President's Page</a>\n \n \n      
            <a class="btn president-2" href="https://muppet.fandom.com/wiki/Elmo">Sesame Blog</a>\n \n \n     
            <a class="btn president-3" href="https://twitter.com/elmo?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">Elmo on Twitter</a>\n
        </div>\n        
    </div>\n\n`
