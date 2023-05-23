csv = $.ajax({ type: "GET", url: "fellowships.csv", async: false }).responseText
data = $.csv.toArrays(csv)
data = data.slice(1) // Remove header
console.log(data)
for (i = 0; i < data.length; i++) {
    data[i][1] = data[i][1] // link
    data[i][2] = data[i][2] // country
    data[i][3] = Number(data[i][3]) // fellowship amount
    data[i][4] = Date(data[i][4]) // deadline
    data[i][5] = data[i][5] // organization name
    data[i][6] = data[i][6] // category
    data[i][7] = data[i][7] // citizenship
   }

function get_fellowship(arr) {
    return arr[0]
}

function get_link(arr) {
  return arr[1]
}

function get_country(arr) {
  return arr[2]
}

function get_amount(arr) {
  return arr[3]
}

function get_deadline(arr) {
  return arr[4]
}

function get_org(arr) {
  return arr[5]
}

function get_fellowship_type(arr) {
    return arr[6]
}

function get_citizenship(arr) {
  return arr[7]
}

function get_col(arr, col) {
    switch (col) {
        case "Link":
            return get_link(arr)
        case "country":
            return get_country(arr)
        case "amount":
            return get_amount(arr)
        case "deadline":
            return get_deadline(arr)
        case "organization":
            return get_org(arr)
        case "type":
            return get_fellowship_type(arr)
        case "citizenship":
            return get_citizenship(arr)
    }
}

function get_column() {
    $("#ranking").find("tbody").html("")

    temp_data_pre_filter = [];
    for (var i = 0; i < data.length; i++) {
        temp_data_pre_filter.push(data[i]);
    }
    
    console.log(temp_data_pre_filter)

    temp_data = []
    for (var i = 0; i < temp_data_pre_filter.length; i++) {
        if (!isNaN(get_col(temp_data_pre_filter[i], col))) {
            temp_data.push(temp_data_pre_filter[i]);
        }
    }

    local_rank = 0

    for (i = 0; i < temp_data.length; i++) {
        namefix2 = $("<span>").append("&nbsp;&nbsp;")
        $("#ranking").find("tbody").append(
            $("<tr>")
            .append($("<td>").text(local_rank + 1))
            .append($("<td>").text(get_fellowship(temp_data[i])).append(namefix2))
            .append($("<td>").text(get_link(temp_data[i]).toLocaleString("en-US")))
            .append($("<td>").text(get_country(temp_data[i]).toLocaleString("en-US")))
            .append($("<td>").text(get_amount(temp_data[i]).toLocaleString("en-US")))
            .append($("<td>").text(get_deadline(temp_data[i]).toLocaleString("en-US")))
            .append($("<td>").text(get_org(temp_data[i]).toLocaleString("en-US")))
            .append($("<td>").text(get_fellowship_type(temp_data[i]).toLocaleString("en-US")))
            .append($("<td>").text(get_citizenship(temp_data[i]).toLocaleString("en-US")))
            )
        local_rank = local_rank + 1
    }
}

$("#overlay-loading").hide()

$("#rankform").ready(function() {
    get_column();
})
