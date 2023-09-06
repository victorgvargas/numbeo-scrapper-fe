export function transformString(city: string): string {
    const cityArr = Array.from(city);

    for (let i = 0; i < cityArr.length; i++) {
        if (i === 0 || cityArr[i - 1] === ' ') {
            cityArr[i] = cityArr[i].toUpperCase();
        }
    }

    return cityArr.join('').replace(/ /g, '-');
}
