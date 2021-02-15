export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => (a.lastModifiedTime > b.lastModifiedTime) ? -1 : 1);
}