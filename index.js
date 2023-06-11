
var LT_bus = [
    '26', '27', '29', '30', '40', '48', '56', '70',
    '72', '74', '89', '99', '290', '357', '358', '617'
];

function getBusList() {
    let accesstokenStr = access_data;
    let accesstoken    = JSON.parse(accesstokenStr);
    
    if (accesstoken != undefined) {
        $.ajax({
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic/v2/Bus/Schedule/City/Taichung',
            headers: {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function (data) {
                data = data.sort(function (a, b) {
                    var nameA = parseInt(a.RouteID);
                    var nameB = parseInt(b.RouteID);
                    return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
                });

                $.each(data, function (index, value) {
                    if (LT_bus.includes(value.RouteID)) {
                        var date          = new Date(value.UpdateTime);
                        var formattedDate = formateDate(date);
                        
                        $("#bus_list").append("<tr><td>" + value.RouteName.Zh_tw +
                            "</td><td>" + value.Timetables[0].StopTimes[0].ArrivalTime +
                            "</td><td>" + formattedDate +
                            "</td><td>" + value.Timetables[0].StopTimes[0].StopName.Zh_tw +
                            "</td><td><a href=\"bus_info.html?routeID=" + value.RouteID + "&direction=" + value.Direction + "\" >詳細</a>" +
                            "</td></tr>"
                        );
                    }
                });
            },
            error: function (xhr, textStatus, thrownError) {
                console.log('erroStatus:', textStatus);
                console.log('Error:', thrownError);
            }
        });
    }
}

function getBusRealTime(routeID, direction) {
    let accesstokenStr = access_data;
    let accesstoken    = JSON.parse(accesstokenStr);

    if (accesstoken != undefined) {
        $.ajax({
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeNearStop/City/Taichung/',
            headers: {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function (data) {
                console.log(data);
                $.each(data, function (index, value) {
                    if(LT_bus.includes(value.routeID)){
                        console.log(value.routeID);
                    }
                    if (value.RouteID == routeID && value.Direction == direction) {
                        console.log(value);
                        date = formateDate(value.UpdateTime);
                        $("#schedule").append("<tr><td>" + value.RouteName.Zh_tw +
                            "</td><td>" + value.StopName.Zh_tw +
                            "</td><td>" + date +
                            "</td><td>" + value.PlateNumb +
                            "</td></tr>"
                        );
                    }
                });
            },
            error: function (xhr, textStatus, thrownError) {
                console.log('errorStatus:', textStatus);
                console.log('Error:', thrownError);
            }
        });
    }
}