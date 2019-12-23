// from data.js
var tableData = data;

// first we transform from an array of dicts to an array of arrays, for easier insertion

let tableDataArr = []

tableData.forEach(d => {
    let tempArr = []
    for (var key in d) { tempArr.push(d[key]) }
    tableDataArr.push(tempArr)
})

// now we draw the table

tbody = d3.select("table").select("tbody")

rows = tbody.selectAll("tr")
    .data(tableDataArr)
    .enter()
    .append("tr");

cells = rows.selectAll("td")
    .data((d, i) => {
        return d;
    })
    .enter()
    .append("td")
    .text(d => {
        return d;
    });

// now we listen for changes and filter the data
d3.select("#filter-btn").on("click",() => {
    let val = d3.select("#datetime").property("value")
    change(val)});

//function to filter the data
function change(val){

    var newDataArr = []

    // if you don't input a date, return whole table
    if(val === ""){
        tableData.forEach(d => {
            let tempArr = []
            for (var key in d) { tempArr.push(d[key]) }
            newDataArr.push(tempArr)
        })
    } else {

        // filter by date
        tableData.forEach(d => {
            let tempArr = []
            if (d["datetime"] == val){
                for (var key in d) { 
                    tempArr.push(d[key])
                }
                newDataArr.push(tempArr)
        }})
    }

    // erase existing table
    d3.selectAll("tr").remove()
    
    // create new table with filtered data
    tbody = d3.select("table").select("tbody")

    rows = tbody.selectAll("tr")
        .data(newDataArr)
        .enter()
        .append("tr");

    rows.selectAll("td")
        .data((d, i) => {
            return d;
        })
        .enter()
        .append("td")
        .text(d => {
            return d;
        });
    
}
