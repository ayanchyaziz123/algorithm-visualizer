export const binary_search = (array, key, steps, colors) => {
    let colorKey = colors[colors.length - 1].slice();
    let n = array.length - 1;
    let start = 0;
    let end = n;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        colorKey[mid] = 3
        steps.push(array.slice());
        colors.push(colorKey.slice())

        if (array[mid] == key) {
            colorKey[mid] = 2; // element finding success
            steps.push(array.slice());
            colors.push(colorKey.slice())
            return;
        }
        else if (array[mid] < key) {
            for (let i = start; i <= mid; i++) {
                colorKey[i] = 1; // not found in this subarray
            }
            colorKey[mid] = 3
            steps.push(array.slice());
            colors.push(colorKey.slice())
            start = mid + 1;
        }
        else {
            for (let i = mid; i <= end; i++) {
                colorKey[i] = 1; // not found in this subarray
            }
            colorKey[mid] = 3
            steps.push(array.slice());
            colors.push(colorKey.slice())
            end = mid - 1;
        }
    }
    return;
}

export const roted_arrayBinarySearch = (array, key, steps, colors) => {
    let colorKey = colors[colors.length - 1].slice();
    let n = array.length - 1;
    let start = 0;
    let end = n;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        colorKey[mid] = 3
        steps.push(array.slice());
        colors.push(colorKey.slice())
        if (array[mid] == key) {
            colorKey[mid] = 2; // 2 symbol element finding success
            steps.push(array.slice());
            colors.push(colorKey.slice())
            return;
        }
        // check is left side sorted
        if (array[start] < array[mid]) {
            if (array[start] <= key && key < array[mid]) {
                for (let i = mid; i <= end; i++) {
                    colorKey[i] = 1; // 1 not found in this subarray 
                }
                colorKey[mid] = 3
                steps.push(array.slice());
                colors.push(colorKey.slice())
                end = mid - 1;
            }
            else {
                for (let i = start; i <= mid; i++) {
                    colorKey[i] = 1; // 1 not found in this subarray
                }
                colorKey[mid] = 3
                steps.push(array.slice());
                colors.push(colorKey.slice())
                start = mid + 1;
            }
        }
        else {
            // is right side sorted
            if (array[mid] < key && array[end] >= key) {
                for (let i = start; i <= mid; i++) {
                    colorKey[i] = 1; // not found in this subarray
                }
                colorKey[mid] = 3
                steps.push(array.slice());
                colors.push(colorKey.slice())
                start = mid + 1;
            }
            else {
                for (let i = mid; i <= end; i++) {
                    colorKey[i] = 1; // not found in this subarray
                }
                colorKey[mid] = 3
                steps.push(array.slice());
                colors.push(colorKey.slice())
                end = mid - 1;
            }
        }
    }
    return;

}

