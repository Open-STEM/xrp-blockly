/** 
 * File Format:
 * L[1-(n-2)]:  Generated Python code
 * L[(n-2)]:    Datetime
 * L[(n-1)]:    Hash
 * L[n]:        Blocks JSON
 */

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

/**
 * Return the timestamp in fixed format
 * @returns {String}    Timestamp in format [YYYY-MM-DD HH:MM:SS]
 * @see https://stackoverflow.com/a/67705873
 */
function getTimestamp() {
    const pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();

    return `[${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}]`;
}

/**
 * Generate FP file contents
 * @param {String} code String of generated python code
 * @param {JSON} blks Current workspace blocks, including vars, as JSON
 * @returns {String} fpfile to be written with information
 */
function makefp_content(code, blks) {
    var fpstring = '';
    dtime = getTimestamp();
    hash = hashCode(code);
    strblks = JSON.stringify(blks);
    fpstring = code + '\n\n\n## ' + dtime + '\n## ' + hash + '\n## ' + strblks;
    return fpstring;
}

/**
 * Read in fp file
 * @param {String} file fp file as string object
 */
function readfp(file) {
    // const re = /##\s(?<info>.*)$/g;
    // matches = file.matchAll(re);
    // console.log({ matches })
    const dummyval = '{"blocks":{"languageVersion":0,"blocks":[{"type":"procedures_defnoreturn","id":"IsxZeLy(~T83p5;F]|/z","x":63,"y":38,"extraState":{"params":[{"name":"sides","id":"sV[YiybSVpx-~;1;D:vv"}]},"icons":{"comment":{"text":"Draw a polygon with any given sides","pinned":false,"height":80,"width":160}},"fields":{"NAME":"polygon"},"inputs":{"STACK":{"block":{"type":"controls_repeat_ext","id":"BrMKqWjxOkTv)Nb0:19X","inputs":{"TIMES":{"block":{"type":"variables_get","id":"FXg,ZI8c]uXY5M**o,4o","fields":{"VAR":{"id":"sV[YiybSVpx-~;1;D:vv"}}}},"DO":{"block":{"type":"fp_straight_val","id":"{LmoLT:Ok841t}OJ.KK}","inputs":{"dist":{"block":{"type":"math_number","id":"gW#L*x3VXJ8}B_n#qI77","fields":{"NUM":150}}}},"next":{"block":{"type":"fp_turn_val","id":"E,,A#fLe0lZMJc+N.Hf?","inputs":{"angle":{"block":{"type":"math_arithmetic","id":"j;O(Fx/%;`NtZNs(qL6=","fields":{"OP":"DIVIDE"},"inputs":{"A":{"shadow":{"type":"math_number","id":"{/Drmz[VsPo89q%PwaVZ","fields":{"NUM":1}},"block":{"type":"math_number","id":"el_J8yGp-ywNqRw~22Jc","fields":{"NUM":360}}},"B":{"shadow":{"type":"math_number","id":"n!g~4v1Nsv3xP$n_tL[@","fields":{"NUM":1}},"block":{"type":"variables_get","id":"v1y!,?e!$9Fq*%J`t|4T","fields":{"VAR":{"id":"sV[YiybSVpx-~;1;D:vv"}}}}}}}}}}}}}}}}},{"type":"variables_set","id":"^Xb)r_-gQSVXA^+!@Kdt","x":79,"y":268,"fields":{"VAR":{"id":"sV[YiybSVpx-~;1;D:vv"}},"inputs":{"VALUE":{"block":{"type":"fp_getsonardist","id":"}Fzzyvn=v,tly7ZH8wJW"}}}}]},"variables":[{"name":"sides","id":"sV[YiybSVpx-~;1;D:vv"}]}';
    const dummyjson = JSON.parse(dummyval);
    return dummyjson;
}