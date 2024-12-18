

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

const asyncFunc = async() => {
    try {
        const result1 = await firstAsyncFunc();
        console.log("result1: ", result1);

        const result2 = await secondAsyncFunc();
        console.log("result2: ", result2);

        const result3 = await thirdAsyncFunc();
        console.log("result3: ", result3);

    } catch (error) {
        console.error("Ошибка при обработке промисов в задании 1: ", error);
    }
}

const resultAsyncFunc = asyncFunc().then(() => {
    console.log("Задание 1 выполнено успешно");
}).catch((error) => {
    console.error("Ошибка при выполнении задания 1: ", error);
}).finally(() => {
    console.log("Задание 1 завершено");
});
console.log("asyncFunc(): ", resultAsyncFunc);

console.log("//=============================//");
//TODO: Задание 1 END


//TODO: Задание 2 START
console.log("//=============================//");
console.log("Задание 2");

const asyncFunc2 = async(arr: string[]) => {
    const promisesArr: Promise<string>[] = [];
    for (const item of arr) {
        const result = await new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve(item.toUpperCase());
            }, 1000);
        });
        console.log(result);
        promisesArr.push(Promise.resolve(result));
    }

    const results = await Promise.all(promisesArr);
    console.log("Results: ", results);
    return results;
}

const arr = ["one", "two", "three"];

const resultAsyncFunc2 = asyncFunc2(arr).then(() => {
    console.log("Задание 2 выполнено успешно");
}).catch((error) => {
    console.error("Ошибка при выполнении задания 2: ", error);
}).finally(() => {
    console.log("Задание 3 завершено");
});
console.log("asyncFunc2(): ", resultAsyncFunc2);

console.log("//=============================//");
//TODO: Задание 2 END


//TODO: Задание 3 START
console.log("//=============================//");
console.log("Задание 3");

const asyncFunc3 = async() => {
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
       console.log("Results: ", results);
    } catch (error) {
        console.error("Ошибка при обработке промисов в задании 3: ", error);
    }

}

const resultAsyncFunc3 = asyncFunc3().then(() => {
    console.log("Задание 3 выполнено успешно");
}).catch((error) => {
    console.error("Ошибка при выполнении задания 3: ", error);
}).finally(() => {
    console.log("Задание 3 завершено");
});
console.log("asyncFunc3(): ", resultAsyncFunc3);

console.log("//=============================//");
//TODO: Задание 3 END


//TODO: Задание 4 START
console.log("//=============================//");
console.log("Задание 4");

const asyncFunc4 = async(arr: number[]) => {
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
    console.log("Results: ", results);
    return results;
};

const arr4 = [1000, 2000, 3000];


const resultAsyncFunc4 = asyncFunc4(arr4).then(() => {
    console.log("Задание 4 выполнено успешно");
}).catch((error) => {
    console.error("Ошибка при выполнении задания 4: ", error);
}).finally(() => {
    console.log("Задание 4 завершено");
});
console.log("asyncFunc4(arr4): ", resultAsyncFunc4);

console.log("//=============================//");
//TODO: Задание 4 END
