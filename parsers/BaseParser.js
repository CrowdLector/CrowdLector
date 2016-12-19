/**
 * Created by Macr0s on 18/12/16.
 */


module.exports = {
    simplify_name: function (name) {
        var parts = name.trim().split(".");
        return parts[parts.length - 1];
    }
};