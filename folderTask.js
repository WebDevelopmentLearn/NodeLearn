import {promises as fsp} from 'fs';

// fs.mkdir("myFolder", (err) => {
//     if (err) {
//         console.error("Ошибка при создании папки 'myFolder': ", err);
//     }
//     console.log("Папка 'myFolder' успешно создана");
// });
//
// fs.rmdir("myFolder", (err) => {
//     if (err) {
//         console.error("Ошибка при удалении папки 'myFolder': ", err);
//     }
//     console.log("Папка 'myFolder' успешно удалена");
// });

//fsp.mkdir("myFolder").then(r => console.log("Папка 'myFolder' успешно создана")).catch(err => console.error("Ошибка при создании папки 'myFolder': ", err));

async function createFolder() {
    try {
        await fsp.mkdir("myFolder");
        console.log("Папка 'myFolder' успешно создана");
    } catch (err) {
        console.error("Ошибка при создании папки 'myFolder': ", err);
    }
}

async function deleteFolder() {
    try {
        await fsp.rmdir("myFolder");
        console.log("Папка 'myFolder' успешно удалена");
    } catch (err) {
        console.error("Ошибка при удалении папки 'myFolder': ", err);
    }
}


async function runTask1() {
    //Создание папки
    await createFolder();

    //Удаление папки через 5 секунд
    await setTimeout(deleteFolder, 5000);
}

runTask1();

