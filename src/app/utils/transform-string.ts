export function transformString(city: string): string {
    const lcsCity = city.toLowerCase();
    const cityArr = Array.from(lcsCity);

    for (let i = 0; i < cityArr.length; i++) {
        if (i === 0 || cityArr[i - 1] === ' ') {
            cityArr[i] = cityArr[i].toUpperCase();
        }
    }

    return cityArr.join('').replace(/ /g, '-');
}
