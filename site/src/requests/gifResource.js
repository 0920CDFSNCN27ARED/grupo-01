const axios = require("axios");
const defaults = require("./default");
const url = "gifs/";
const apiKey = "sybHIXDeHemUeGwFRgT6HjyG67MeM9Sh";

let gifResource = {
    random: function () {
        return axios({
            ...defaults,
            method: "GET",
            url: url + "random",
            params: {
                api_key: apiKey,
            },
        });
    },
    trending: () => {
        return axios({
            ...defaults,
            method: "GET",
            url: url + "trending",
            params: {
                api_key: apiKey,
            },
        });
    },
};

module.exports = gifResource