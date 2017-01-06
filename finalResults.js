/**
 * Created by Macr0s on 06/01/17.
 */

var manEvaluatedParser = require("./parsers/ManEvaluatedParser");

manEvaluatedParser.statManEvaluated("./input/man_evaluated.tsv", function (status, data) {
    console.log(status, data);
});