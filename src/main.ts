

//TODO: Задание 1 START
console.log("//=============================//");
console.log("Задание 1");

const firstAsyncFunc = async(): Promise<string> => {
    console.log("Задание 1: firstAsyncFunc");
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("Задание 1: firstPromise");
        }, 1000);
    });
}

const secondAsyncFunc = async(): Promise<string> => {
    console.log("Задание 1: secondAsyncFunc");
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("Задание 1: secondPromise");
        }, 2000);
    });
}

const thirdAsyncFunc = async(): Promise<string> => {
    console.log("Задание 1: thirdAsyncFunc");
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve("Задание 1: thirdPromise");
        }, 3000);
    });
}

const asyncFunc = async(): Promise<void> => {
    try {
        const result1 = await firstAsyncFunc();
        console.log("[asyncFunc] result1: ", result1);

        const result2 = await secondAsyncFunc();
        console.log("[asyncFunc] result2: ", result2);

        const result3 = await thirdAsyncFunc();
        console.log("[asyncFunc] result3: ", result3);

    } catch (error) {
        console.error("[asyncFunc] Ошибка при обработке промисов в задании 1: ", error);
    }
}

asyncFunc()

console.log("//=============================//");
//TODO: Задание 1 END


//TODO: Задание 2 START
console.log("//=============================//");
console.log("Задание 2");

const asyncFunc2 = async(arr: string[]): Promise<void> => {
    try {
        const result = await Promise.all(arr.map(capitalizeString));
        console.log("[asyncFunc2] Result: ", result);
    } catch (error) {
        console.error("[asyncFunc2] Error: ", error);
    }
}

const capitalizeString = (str: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve(str.toUpperCase());
        }, 1000);
    })
}


const arr = ["one", "two", "three"];
asyncFunc2(arr);

console.log("//=============================//");
//TODO: Задание 2 END


//TODO: Задание 3 START
console.log("//=============================//");
console.log("Задание 3");

const asyncFunc3 = async(): Promise<void> => {
    try {
        const firstPromise = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Задание 3: firstPromise");
            }, 1000);
        });

        const secondPromise = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve("Задание 3: secondPromise");
            }, 2000);
        });

        const thirdPromise = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                reject("Задание 3: thirdPromise");
            }, 3000);
        });

       const results = await Promise.all([firstPromise, secondPromise, thirdPromise]);
       console.log("[asyncFunc3] Results: ", results);
    } catch (error) {
        console.error("[asyncFunc3] Ошибка при обработке промисов в задании 3: ", error);
    }

}

asyncFunc3();

console.log("//=============================//");
//TODO: Задание 3 END


//TODO: Задание 4 START
console.log("//=============================//");
console.log("Задание 4");

const asyncFunc4 = async(arr: number[]): Promise<void> => {
    const promisesArr: Promise<number>[] = [];
    for (const item of arr) {
        const result = await new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                resolve(item);
            }, item);
        });
        console.log(result);
        promisesArr.push(Promise.resolve(result));
    }

    const results = await Promise.all(promisesArr);
    console.log("[asyncFunc4] Results: ", results);
};

const arr4 = [1000, 2000, 3000];


asyncFunc4(arr4)

console.log("//=============================//");
//TODO: Задание 4 END
