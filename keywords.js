// preparing PI Keyrods for cluster analysis

(async function(){
    let url = 'keywords vision statements 2020.csv'
    let txt = await (await fetch(url)).text()
    txt = txt.replace(/"/g,'').replace(/[\(\)]/g,' ').replace(/cancer/gi,'')
    let rows = txt.split(/[\n\r]+/).map(x=>x.split(/[,; ]+/g))
    // extract header
    let parms = rows[0]
    rows=rows.slice(1)
    // extract keywords
    let kk=[]
    rows.forEach(r=>{kk=kk.concat(r.slice(1))})
    kk=kk.map(k=>k.toLowerCase())
    kk=[...new Set(kk)]
    // build kewyword array object
    ko={}
    kk.forEach(k=>{
        let obj={}
        rows.forEach(r=>{
            obj[r[0]]=r.slice(1).map(x=>x.toLowerCase()).indexOf(k)>0
            if(obj[r[0]]){
                obj[r[0]]=0.5
            }else{
                obj[r[0]]=Math.random()
            }
        })
        ko[k]=obj
    })
    // array = Object.entries(aa).map(x=x[1])
    console.log(ko)
    //debugger
    // saving back to json file
    function saveFile(x,fileName) { // x is the content of the file
        var bb = new Blob([x]);
        var url = URL.createObjectURL(bb);
        var a = document.createElement('a');
        a.href=url;
        if (fileName){
            if(typeof(fileName)=="string"){ // otherwise this is just a boolean toggle or something of the sort
                a.download=fileName;
            }
            a.click() // then download it automatically 
        } 
        return a
    }
    saveFile(JSON.stringify(Object.entries(ko).map(x=>x[1])),url.slice(0,-4)+'.json')

})()