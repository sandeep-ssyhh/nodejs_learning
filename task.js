var postList = [], fullResult = [], tempResult = [], halfResult = [];
var tempId;
fetch('https://jsonplaceholder.typicode.com/photos').then(response => response.json())
    .then(json => {
        postList = json;
        myfunction();
    })

function myfunction() {
    postList.forEach((element) => {
        if (postList.filter((e) => e.albumId == element.albumId).length == 0) {
            postList.filter((ele) => {
                ele.albumId == element.albumId ? tempResult.push({'Id': ele.id,'title' : ele.title,
            'url' : ele.url,'thumbnailUrl' : ele.thumbnailUrl}) : false
            });
            console.log(tempResult);

        }
        fullResult.push({' albumId' :element.albumId,'Photos' : tempResult });
    }); 
}   