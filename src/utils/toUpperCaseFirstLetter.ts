export const toUpperCaseFirstLetter = (str: string) => {
    const whiteSpaceSplitted = str.split(' ');
    whiteSpaceSplitted.forEach((word, i) => {
        whiteSpaceSplitted[i] = word.charAt(0).toUpperCase() + word.slice(1);
    });
    return whiteSpaceSplitted.join(' ');
};

// console.log(toUpperCaseFirstLetter('test')); // Test
// console.log(toUpperCaseFirstLetter('test title')); // Test Title
