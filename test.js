
// function func_recursive(x, y) {
//     if (x === 0) {
//         return y;
//     } else {
//         //                           3 - 1 = 2, 3 + 2 = 5
//         const res = func_recursive(x - 1, x + y);//2, 5 | 1, 7 | 0, 7
//
//         //                          2        5
//         console.log(`res=${res}; x=${x}; y=${y}`);
//         return res;
//     }
// }

function func_recursive(x, y) {
    while(x > 0) {
        y = x + y;
        x--;
    };
    console.log("x: ", x, "y ", y);
    return y;
};

func_recursive(3, 2)