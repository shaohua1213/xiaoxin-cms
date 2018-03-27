function clearCookie() {
    // var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    var keys = document.cookie.match(/[^ =;]+(?=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

class User {

    static STORE_SESSION_KEY = "XIAOXIN_MODEL_USER_SESSION";
    static user = new User();

    constructor() {
        this.name = "";
        this.info = {};
    }

    _resetData() {
        this.name = "";
        this.info = {};
    }

    _loadData() {
        //console.log("333");
        let str = window.localStorage.getItem(User.STORE_SESSION_KEY);
        // console.log(str)

        if (str == null || str === "") {

            this._resetData();
            return;
        }
        try {
            var data = JSON.parse(str);
            this.name = data.name === null ? "" : data.name;
            this.info = data.info === null ? {} : data.info;
        } catch (err) {
            this._resetData();
        }
    }

    _saveData() {
        window.localStorage.setItem(User.STORE_SESSION_KEY, JSON.stringify(this));

    }

    _removeData() {
        window.localStorage.removeItem(User.STORE_SESSION_KEY);
    }

    static isLogin() {
        this.user._loadData();
        return true;
        // return this.user.name.length > 0 && this.user.info.hasOwnProperty('mobile'); || !info.hasOwnProperty('mobile')
    }

    static save(name, info) {

        if (name === null || info === null || typeof info !== 'object') {
            return false;
        }
        this.user.name = name;
        this.user.info = info;
        this.user._saveData();
        return true;
    }

    static info() {
        this.user._loadData();
        return this.user.info;
    }

    static clear() {
        this.user._removeData();
        clearCookie();
    }

}
;

export default User;

