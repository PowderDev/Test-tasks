let courses = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

function courseFilter(range: (number | null)[]) {
  const [rangeStart, rangeEnd] = normalizeRange(range);

  return courses.filter(({ prices }) => {
    const [priceStart, priceEnd] = normalizeRange(prices);
    return priceEnd > rangeStart && priceStart <= rangeEnd;
  });
}

function courseSort(courses: { name: string; prices: number[] }[]) {
  return courses.sort((a, b) => (a.prices[0] > b.prices[0] ? 0 : -1));
}

//Converts "null" in ranges to actual amount of money
function normalizeRange(range: (number | null)[]) {
  return [range[0] ?? 0, range[1] ?? Infinity];
}

console.log(courseSort(courseFilter(requiredRange1)));
console.log(courseSort(courseFilter(requiredRange2)));
console.log(courseSort(courseFilter(requiredRange3)));
