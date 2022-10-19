const morning = require("./morning")
const evening = require("./evening")

// В модуле определен объект, который имеет две функции для вывода приветствий
module.exports = {
    getMorningMessage : function () { console.log(morning) },
    getEveningMessage : function () { console.log(evening) }
}