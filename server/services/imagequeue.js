const queue = []


function pop(){
    return queue.shift();
}

function push(image){
    queue.push(image);
}


module.exports = 
    {
        queue,
        pop,
        push,
}