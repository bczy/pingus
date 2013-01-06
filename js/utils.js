function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}
Array.max = function( array ){
    return Math.max.apply( Math, array );
};
