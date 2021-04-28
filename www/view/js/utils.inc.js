function friendlyURL(url) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'http://' + window.location.hostname + '/paths.php?op=get',
            type: 'POST',
            dataType: 'JSON'
        }).done(function(data) {
            let link = "";
            if (data === true) {
                url = url.replace("?", "");
                url = url.split("&");
                for (let i = 0; i < url.length; i++) {
                    let aux = url[i].split("=");
                    link +=  "/" + aux[1];
                }// end_for
            }else {
                link = '/' + url;
            }// end_else
            resolve ("http://" + window.location.hostname + "" + link);
        }).fail(function(error) {
            reject (error);
        });
    }); 
}// end_friendlyURL