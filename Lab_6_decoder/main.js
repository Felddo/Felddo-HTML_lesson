function del_double_letter(elem, i, word) {
    if (i == word.indexOf(elem)) return elem;
    else return '';
}

function decoder(word, text_to_decode) {
    let n_cols = 8;
    let matrix = [];
    let decoded_text = '';

    word = word.split('');
    word = (`${word.map(del_double_letter).join('')}абвгдежзийклмнопрстуфхцчшщъыьэюя`).split('');
    let chars = word.map(del_double_letter).join('').split('');
    for (let i = 0; i < 32; i += n_cols) {
        matrix.push(chars.slice(i, i + n_cols));
    }

    for (char_to_decode of text_to_decode) {
        let matrix_ind = [];
        matrix.forEach(function(row, i) {
            if (row.indexOf(char_to_decode) != -1) matrix_ind = [i, row.indexOf(char_to_decode)];
        })

        let row = (matrix_ind[0]-1 == -1) ? ((32 / n_cols) - 1) : matrix_ind[0] - 1;
        decoded_text += matrix[row][matrix_ind[1]];
    }
    return decoded_text
}

function main() {
    let words = [ 'подготовка', 'сеть', 'метро', 'исследование', 'облако', 'комета', 'зачет', 'аудитория', 'публикация', 'галактика', 'анализ', 'фреймворк'];
    let text_to_decode = 'ЦАДХГЦРЦШОЧШЫЩЪЙЛХГЗИРЩШЗШЦЫМХЙЛЧШЖНЖХШДШЛЖЪЕЖЧДЗЛШЛЙЧРГЪЙКШЗЙЗИЧЙНЦАДХГЦ'.toLowerCase();
    for (word of words) {
        let decoded_text = decoder(word, text_to_decode);
        document.writeln(decoded_text);
    }
}

main();
