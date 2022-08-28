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
    const re = /##\s(?<info>.*)$/g;
    matches = file.matchAll(re);
    console.log({ matches })
}