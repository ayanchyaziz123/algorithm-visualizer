export const bubble_sort = (array, position, steps, colors) => {


    let colorKey = colors[colors.length - 1].slice();


    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                array = swap(array, j, j + 1)
            }
            steps.push(array.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            colors.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }
        colorKey[array.length - 1 - i] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());
    }
    colors[colors.length - 1] = new Array(array.length).fill(2);
    return;
};

const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

export const selection_sort = (array, position, steps, colors) => {


    let colorKey = colors[colors.length - 1].slice();

    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; ++j) {
            if (array[j] < array[min]) {
                min = j;
            }
            steps.push(array.slice());
            colorKey[min] = 1;
            colorKey[j] = 1;
            colors.push(colorKey.slice());
            colorKey[min] = 0;
            colorKey[j] = 0;
        }
        if (min != i) {
            // Swapping the elements
            let tmp = array[i];
            array[i] = array[min];
            array[min] = tmp;
        }
        colorKey[i] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());
    }
    colors[colors.length - 1] = new Array(array.length).fill(2);
    return;
};

export const insertion_sort = (array, position, steps, colors) =>{
    let colorKey = colors[colors.length - 1].slice();
    let n = array.length;
    let key;
    for(let i = 1; i < n; i++)
    {
        key = array[i];
        let j = i - 1;
        colorKey[j] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());
        while (j >= 0 && array[j] > key)
        { 
            array[j + 1] = array[j]; 
            colorKey[j + 1] = 1;
            steps.push(array.slice());
            colors.push(colorKey.slice());
            colorKey[j + 1] = 0;
            j = j - 1; 
        } 
        array[j + 1] = key;
        colorKey[j + 1] = 2;
        steps.push(array.slice());
        colors.push(colorKey.slice());
    }
    colors[colors.length - 1] = new Array(array.length).fill(2);
    return;
}
