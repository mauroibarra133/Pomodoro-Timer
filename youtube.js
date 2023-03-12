let youtubeUrl = 'https://youtu.be/tstCJt507aY?t=4'
let videoId = youtubeUrl.match(/v=([a-zA-Z0-9_-]+)/);
let apiUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&part=contentDetails&key=[AIzaSyBFyaJAjZHH12V6BNb6c1BnTHhXnZJaxbM]';
console.log(apiUrl);