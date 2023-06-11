var access_data = "";
function getAuthorizationHeader() {
    const parameter = {
        grant_type: "client_credentials",
        client_id: "scaft91008-e88ceef9-b29c-425f",
        client_secret: "13590cdc-c059-4ec6-ba67-95bb20d14a40"
    };

    let auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

    $.ajax({
        type: "POST",
        url: auth_url,
        crossDomain: true,
        dataType: 'JSON',
        data: parameter,
        async: false,
        success: function (data) {
            $("#accesstoken").text(JSON.stringify(data));
            access_data = JSON.stringify(data);
        },
        error: function (xhr, textStatus, thrownError) {

        }
    });
}