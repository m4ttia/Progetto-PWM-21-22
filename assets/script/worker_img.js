self.addEventListener('message', event => {
  const imageURL = event.data;
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    const response = this.response;
    //const blob = await response.blob();

    // Send the image data to the UI thread!
    self.postMessage({
      imageURL: imageURL,
      blob: response,
    });
  }
  xhr.onerror = function(err) {
    console.log('An error: '+err);
    close();
  }

  xhr.responseType = 'blob';
  xhr.open('GET',imageURL);
  xhr.send();
});
