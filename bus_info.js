var startID   = "";
var startName = "";
var endID     = "";
var endName   = "";
var goalID    = "";
var goalName  = "";

function getBusRealTime(routeID, direction) {
    let accesstokenStr = access_data;
    let accesstoken = JSON.parse(accesstokenStr);

    if (accesstoken != undefined) {
        $.ajax({
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeNearStop/City/Taichung/' + routeID,
            headers: {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function (data) {
                $.each(data, function (index, value) {
                    if (
                        value.RouteID   == routeID &&
                        value.Direction == direction &&
                        ((parseInt(goalID) - parseInt(value.StopSequence)) >= 0)
                    ) {
                        $("#schedule").append(
                            "<tr><td>"  + (index + 1) +
                            "</td><td>" + value.StopName.Zh_tw +
                            "</td><td>" + value.PlateNumb +
                            "</td><td>" + (parseInt(goalID) - parseInt(value.StopSequence)) +
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

function getRouteInfo(routeID, direction) {
    let accesstokenStr = access_data;
    let accesstoken    = JSON.parse(accesstokenStr);

    if (accesstoken != undefined) {
        $.ajax({
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic//v2/Bus/DisplayStopOfRoute/City/Taichung/' + routeID,
            headers: {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function (data) {
                console.log(data);
                $.each(data, function (index, value) {
                    if (value.RouteID == routeID && value.Direction == direction) {
                        $.each(value.Stops, function (index, value) {
                            if (index == 0) {
                                startName = value.StopName.Zh_tw;
                                startID   = index;
                            }

                            if (value.StopName.Zh_tw.includes("嶺東科技大學")) {
                                goalName = value.StopName.Zh_tw;
                                goalID   = index;
                            }

                            endName = value.StopName.Zh_tw;
                            endID   = index;

                            $("#stop-list").append(
                                "<tr><td>"  + (index + 1) +
                                "</td><td>" + value.StopName.Zh_tw +
                                "</td></tr>"
                            );
                        });
                    }
                });
                $("#busTitle").append("[" + routeID + "]" + " " + startName + " -> " + endName);

                

                if (direction == 0) {
                    let newUrl = "bus_info.html?routeID=" + routeID + "&direction=" + 1;
                    $("#switchButton").attr("href", newUrl);
                } else {
                    let newUrl = "bus_info.html?routeID=" + routeID + "&direction=" + 0;
                    $("#switchButton").attr("href", newUrl);
                }

            },
            error: function (xhr, textStatus, thrownError) {
                console.log('url:', this.url);
                console.log('errorStatus:', textStatus);
                console.log('Error:', thrownError);
            }
        });
    }
}