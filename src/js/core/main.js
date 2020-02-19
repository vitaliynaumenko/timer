window.onload = function () {

    const requestUrl = new Request('http://my-json-server.typicode.com/moviedb-tech/movies/list');

    function sendRequest(url) {
        return fetch(url)
            .then(response => response.json())
    }

    sendRequest(requestUrl)
        .then(data => {

            for (let i = 0; i < data.length; i++){
                console.log(data[i].id)

            }


        })

}


