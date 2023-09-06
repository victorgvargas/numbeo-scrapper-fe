export function transformString(city: string) {
    for (let i = 0; i < city.length; i++) {
        if (i === 0) city[i].toUpperCase();
        else if(city[i - 1] === ' ') {
            city[i].toUpperCase();
        }
    }

    return city.replace(' ', '-');
}