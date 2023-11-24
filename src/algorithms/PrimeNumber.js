export const sieve_ofEratosthenes = (array, position, steps, colors) => {
    let colorKey = colors[colors.length - 1].slice();
    let hash = colors[colors.length - 1].slice();
    for (let i = 2; i < array.length; i++) {
        if (hash[i] == 1) continue;
        for (let j = 2 * i; j <= array.length; j = j + i) {
            colorKey[j - 1] = 1
            hash[j] = 1;
            steps.push(array.slice());
            colors.push(colorKey.slice());
        }
    }

    for (let i = 1; i <= 3; i++) {
        colorKey[i - 1] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());
    }

    for (let i = 4; i <= array.length; i++) {
        if (hash[i] == 1)
            continue;
        colorKey[i - 1] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());
    }

    return;
}
