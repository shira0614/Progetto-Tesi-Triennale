export function dateArrFormatter(trees) {
    trees.forEach(tree => {
        let date = new Date(tree.timestamp);
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        tree.timestamp = `${day}/${month}/${year}`;
    });
    return trees;
}

export function dateFormatter(date) {
    let newDate = new Date(date);
    let day = ("0" + newDate.getDate()).slice(-2);
    let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    let year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
}