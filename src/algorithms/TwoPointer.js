export const opposite_directional = (array, target, steps, colors) => {
    let left = 0;
    let right = array.length - 1;
    let colorKey = colors[colors.length - 1].slice();
    while (left < right) {
        colorKey[left] = 3;
        colorKey[right] = 3;
        if (array[left] + array[right] == target) {
            colorKey[left] = 2;
            colorKey[right] = 2;
            steps.push(array.slice());
            colors.push(colorKey.slice());
            return;
        }
        else if (array[left] + array[right] < target) {
            colorKey[left] = 1;
            steps.push(array.slice());
            colors.push(colorKey.slice());
            left++;
        }
        else {
            colorKey[right] = 1;
            steps.push(array.slice());
            colors.push(colorKey.slice());
            right--;
        }
    }
    return;
}
export const equ_directional = (array, target, steps, colors) => {
    let left = 0;
    let right = 0;
    let n = array.length;
    let colorKey = colors[colors.length - 1].slice();
    while (right < n) {
        colorKey[left] = 3;
        colorKey[right] = 3;
        steps.push(array.slice());
        colors.push(colorKey.slice());
        if (array[right] == 0) {
            right++;
            colorKey[left] = 3;
            colorKey[right] = 3;
            steps.push(array.slice());
            colors.push(colorKey.slice());
        }
        else {
            let temp = array[left];
            array[left] = array[right]
            array[right] = temp;
            colorKey[left] = 1;
            left++;
            right++;
            steps.push(array.slice());
            colors.push(colorKey.slice());
        }

    }
    return;
}






