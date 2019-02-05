
function getSuffix() {
    const magic_max_simple_number = 30;//@todo class const
    const first_suffix_year = 1953;
    const cur_year = (new Date()).getFullYear();
    let suffixes = [
        '123', '1234', '12345', '123456', '111', '777', '222', '333', '666', '999', '4321', '321', '987', '098',
        '_', '__', '_123', '_1234', '1488', '007', '07', '360', '0101', '911', '69',
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '3d', '3D', 'a', '!', 'abc', 'asd', 'qwe',
        '00', '33', '44', '55', '66', '77', '88', '99',
        '40', '50',  '60',  '70',  '80',  '90', 
        '100', '200', '3000', '2112',
    ];
    for(let i = 0; i <= magic_max_simple_number; i++) {
        suffixes.push(i);
    }
    for(let i = first_suffix_year; i < cur_year; i++) {
        suffixes.push(i);
    }
    return suffixes;
}

function applyMappings(password) {
    const passwords = [password];
    const mapping = new Map([
        ['too', '2'], ['to', '2'], ['for', '4'], ['ait', '8'], ['you', 'u'], ['ch', '4'],
        ['a', '@'], ['a', '4'], ['e', '3'], ['s', '5'],  ['s', '$'], ['o', '0'], ['l', '1'], ['i', '1'], ['t', '7'], ['b', '8'],  ['z', '2'],
        ['A', '@'], ['A', '4'], ['E', '3'], ['S', '5'],  ['S', '$'], ['O', '0'], ['L', '1'], ['I', '1'], ['T', '7'], ['B', '8'],  ['Z', '2'],
    ]);

    function inc(x, r, index) {
        index = index || 0;
        if(x[index] + 1 >= r[index]) {
            x[index] = 0;
            return inc(x, r, index + 1);
        }
        x[index] = index >= x.length ? 0 : (x[index] || 0) + 1;
        return x;
    }

//console.log(inc([1, 0, 0], [2, 2, 2], 1));
//console.log(inc([1, 1, 0], [2, 2, 2], 1));
//console.log(inc([1, 1, 1], [2, 2, 2], 1));

    const positions = [];
    for(let i = 0; i < password.length; i++) {
        if(mapping.has(password[i])) {
            positions.push(i);
        }
    }
    if(positions.length === 0) {
        return passwords;
    }

    //'look-up table' of all possible changes
    const all_changes = [];
    const cur_change = new Array(positions.length).fill(0);
    const possible_changes_numbers = new Array(positions.length).fill(2);
    //the first value has inited
    let len = possible_changes_numbers.reduce((a, b) => a * b) - 1;
    for(let i = 0; i < len; i++) {
        all_changes.push(inc(cur_change, possible_changes_numbers).slice());
    }

    for(let change of all_changes) {
        let cur_pass = password;
        for(let i = 0; i < change.length; i++) {
            if(change[i]) {
                let password_letter_index = positions[i];
                let mapped_value = mapping.get(password[password_letter_index]);
                cur_pass = cur_pass.substr(0, password_letter_index)
                 + mapped_value
                 + cur_pass.substr(password_letter_index + 1, cur_pass.length);
            }
        }
        passwords.push(cur_pass);
    }

    return passwords;
}

function generateList(password, with_mapping, cross_obfuscation) {
    with_mapping = with_mapping || false;
    cross_obfuscation = cross_obfuscation || false;
    const prefixes = ['!', '_', '-', '__', '.', ',', '1', '123', '1234', '12345', '123456', 'q', 'd', 'm', 'n', 'Q', '4321', '321', '007', '69', 'abc', 'asd',];
    const suffixes = getSuffix();
    let result = [];
    if(with_mapping) {
        result = applyMappings(password);
    }
    else {
        result = [password];
    }

    let pref_pass = [];
    for(let prefix of prefixes) {
        if(cross_obfuscation) {
            for(let pass of result) {
                pref_pass.push(prefix + pass);
            }
        }
        else {
            pref_pass.push(prefix + password);
        }
    }
    result = result.concat(pref_pass);

    let suf_pass = [];
    for(let suffix of suffixes) {
        if(cross_obfuscation) {
            for(let pass of result) {
                suf_pass.push(pass + suffix);
            }
        }
        else {
            suf_pass.push(password + suffix);
        }
    }
    result = result.concat(suf_pass);

    return result;
}

module.exports = generateList;
