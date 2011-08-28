function arrayChunk(array, size) {
    var start = 0, result = [], chunk = [];
    while((chunk = array.slice(start, start += size)).length) {
        result.push(chunk);
    }
    return result;
}

function shuffleArray(oldArray) {
	var newArray = oldArray.slice();
 	var len = newArray.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = newArray[i];
  		newArray[i] = newArray[p];
	  	newArray[p] = t;
 	}
	return newArray; 
};

